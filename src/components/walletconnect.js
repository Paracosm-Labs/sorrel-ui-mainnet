import React from "react";
import { useEffect, useState } from "react";
import { getNetworkName } from "../utils/network";
import { getMaskedAddress } from "../utils/shorten";
import TronLinkLogo from "../img/tronlink-logo.png";

const WalletConnect = () => {
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [loginToTronlinkRequired, setLoginToTronlinkRequired] = useState(false);
  const [connectRequired, setConnectRequired] = useState(false);
  useEffect(() => {
    connect();
    window.addEventListener("message", (e) => {
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/account-change-message
      if (e.data.message && e.data.message.action === "accountsChanged") {
        console.log("got accountsChanged event", e.data);
        connect();
      }
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/network-change-message
      if (e.data.message && e.data.message.action == "setNode") {
        console.log("got setNode event", e.data);
        connect();
      }
      //docs.tronlink.org/tronlink-wallet-extension/receive-messages-from-tronlink/disconnect-website-message
      if (e.data.message && e.data.message.action == "disconnect") {
        console.log("got connect event", e.data);
        setAddress(null);
        setNetwork(null);
        setConnectRequired(true);
      }
    });
    return () => {
      console.log("unmounting Connect Wallet");
    };
  }, [address, network]);

  const connect = async () => {
    try {
      console.log("connecting");
      const res = await window.tronWeb.request({
        method: "tron_requestAccounts",
      });
      if (!res) {
        setLoginToTronlinkRequired(true);
      } else {
        setLoginToTronlinkRequired(false);
      }
      console.log(window.tronWeb);
      if (res.code == 200) {
        setAddress(window.tronWeb.defaultAddress.base58);
        setNetwork(window.tronWeb.solidityNode.host);
      }
      if (res.code == 4001) {
        setAddress(null);
        setNetwork(null);
        setConnectRequired(true);
      }
    } catch (e) {
      console.error(e);
      setTimeout(() => connect(), 3 * 1000);
    }
  };

  if (loginToTronlinkRequired) {
    return (
      <div className="btn-group float-end" role="group">
        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary btn-web3">
          <img
            width="16"
            height="16"
            alt="Tronlink"
            src={TronLinkLogo}
          />
          Please log in to TronLink
        </button>
      </div>
    );
  }

  if (address) {
    return (
      <div className="btn-group float-end" role="group">
        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary btn-web3">
          <img
            width="16"
            height="16"
            alt="Tronlink"
            src={TronLinkLogo}
          />
          <span className="text-sorrel-purple">{getMaskedAddress(address)}</span> | &nbsp;
          <span className="small">{getNetworkName(network)}</span>
        </button>
      </div>
    );
  }

  if (connectRequired) {
    return (
      <div className="btn-group float-end" role="group">
        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary btn-web3">
          <img
            width="16"
            height="16"
            alt="Tronlink"
            src={TronLinkLogo}
          />
          Connect Wallet
        </button>
      </div>
    );
  }
};

export default WalletConnect;
