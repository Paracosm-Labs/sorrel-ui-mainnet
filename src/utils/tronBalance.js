import Web3 from "web3";

class TronBalance {
  web3 = null;
  constructor(_address) {
    this.web3 = new Web3();
  }

  getBalance = () => {
    return this.web3.getBalance(window.tronWeb.defaultAddress.base58);    
  }
}

export default TronBalance;
