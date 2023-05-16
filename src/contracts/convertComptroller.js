import { ConvertComptrollerAddress } from "../utils/contractAddress";
import sendParams from "../utils/sendParams";
import SmartContractBase from "./smartContractBase";

class ConvertComptroller extends SmartContractBase {
  constructor() {
    super(ConvertComptrollerAddress);
  }
  init = async () => {
    try {
      if (!this.contract) {
        this.contract = await window.tronWeb.contract().at(this.address);
      }
      return this;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  cancel = async (hodler, fromId, fromTokens, toId, nonce) => {
    try {
      this.check();
      if (window.tronWeb.ready) {
        let response  = await this.contract.cancelTransaction(hodler, fromId, this.web3.utils.toWei(String(fromTokens), "ether"), toId, nonce).send(sendParams);
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getTransactions = async () => {
    try {
      this.check();
      let allTxs = [];
      if (window.tronWeb.ready) {
        let response  = await this.contract.getUserTransactions(window.tronWeb.defaultAddress.base58).call();
        let length = response[1].length;
        for (let index = 0; index < length; index++) {
          try {
            let tx = {
              hodler: window.tronWeb.defaultAddress.base58,
              fromId : this.web3.utils.hexToNumber(response[0][index]),
              toId : this.web3.utils.hexToNumber(response[0][index + length]),
              fromTokens : this.web3.utils.fromWei(String(response[1][index]), "ether"),
              initiatedTime : this.web3.utils.hexToNumber(response[2][index]),
              executedTime : this.web3.utils.hexToNumber(response[2][index + length]),
              nonce : this.web3.utils.hexToNumber(response[3][index]),
              txHash : response[4][index],
              status : this.web3.utils.hexToNumber(response[5][index]),
            }
            allTxs.push(tx);
          } catch (error) {
            // console.error(error);
          }
        }
        return allTxs;
      }
    } catch (error) {
      console.error(error);
    }

  };

  getTxHash = async (from, to, id, value, nonce ) => {
    try {
      this.check();
      if (window.tronWeb.ready) {
        let response  = await this.contract.getTxHash(from, to, id, value, nonce).call();
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }
  getTx = async (txHash) => {
    try {
      this.check();
      if (window.tronWeb.ready) {
        let response  = await this.contract.hashTxMapping(txHash).call();
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default ConvertComptroller;
