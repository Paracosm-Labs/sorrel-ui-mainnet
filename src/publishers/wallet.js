import { usddContract } from "../contracts/usdContract";
import { getCurrencies } from "../utils/currencies";
import getWalletDetails from "../utils/tronWeb";
import { formatM } from '../utils/currencyFormatter';

class WalletPublisher {
  observers = [];
  walletDetails = {};
  usdd = null;
  timer = null;
  constructor() {
    this.init();
  }

  get_gStableBalances = async (currencies) => {
    let gStableBalances = [];
    for(let i = 0; i  < currencies.length; i++){
      let currency = currencies[i];
      let gStableContract = await currency.gStableContract();
      let gStableBal = await gStableContract.balanceOf(
        this.walletDetails.address
      );
      gStableBalances.push({
        currencyKey: currency.key,
        balance: gStableBal,
      });
    }
   
    return gStableBalances;
  };
  getUSDDBalance = async () => {
    let usddBal;
    try {
      if (this.usdd) {
        usddBal = await this.usdd.balanceOf(this.walletDetails.address);
      }
    } catch (error) {
      console.error(error);
    }
    return usddBal;
  };
  getData = async () => {
      try {
        // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
        let walletDetails_ = await getWalletDetails();
        if(walletDetails_.status == 1){
          this.walletDetails = walletDetails_;
        }
      } catch (error) {
        console.error(error);
      }

      this.usdd = await usddContract();
      let usddBal = await this.getUSDDBalance();

      let currencies = getCurrencies();
      // reading gStable Balances
      let gStableBalances = await this.get_gStableBalances(currencies);

      this.walletDetails = {
        ...this.walletDetails,
        usddBalance: usddBal,
        gStableBalances: gStableBalances,
      };
      this.notify();
  };
  init = async () => {
    try {
      this.walletDetails = await getWalletDetails();
      this.usdd = await usddContract();
    } catch (error) {
      console.error(error);
    }
    this.timer = setInterval(() => this.getData(), 3 * 1000);
  };

  attach = (observer) => {
    this.observers.push(observer);
  };

  detach = (observer) => {
    this.observers = this.observers.filter((observed) => observed !== observer);
  };

  notify = () => {
    this.observers.forEach((observer) => observer(this.walletDetails));
  };



}

const walletPublisher = new WalletPublisher();

export default walletPublisher;


export const readWalletGStableBalance = (walletData, currency) => {
  if(walletData && walletData.gStableBalances){
    let result = walletData.gStableBalances.filter(c => currency.key.localeCompare(c.currencyKey) == 0);
    if(result.length> 0){
      return formatM(result[0].balance);
    }
}
  return formatM(0);
}
