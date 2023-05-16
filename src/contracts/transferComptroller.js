import { TransferComptrollerAddress } from "../utils/contractAddress";
import sendParams from "../utils/sendParams";
import SmartContractBase from "./smartContractBase";

class TransferComptroller extends SmartContractBase {
  constructor() {
    super(TransferComptrollerAddress);
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

  cancel = async (from, to, id, value, nonce) => {
    try {
      this.check();
      if (window.tronWeb.ready) {
        let response  = await this.contract.cancelTransaction(from, to, id, this.web3.utils.toWei(String(value)), nonce).send(sendParams);
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
          let tx = {
            from : response[0][index],
            to : response[0][index + length],
            gStableId : this.web3.utils.hexToNumber(response[1][index]),
            value : this.web3.utils.fromWei(String(response[2][index]), "ether"),
            initiatedTime : this.web3.utils.hexToNumber(response[3][index]),
            executedTime : this.web3.utils.hexToNumber(response[3][index + length]),
            nonce : this.web3.utils.hexToNumber(response[4][index]),
            txHash : response[5][index],
            status : this.web3.utils.hexToNumber(response[6][index]),
          }
          allTxs.push(tx);
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

export default TransferComptroller;
