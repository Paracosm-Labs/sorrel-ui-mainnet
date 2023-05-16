import { getCurrencies } from "../utils/currencies";
import getWalletDetails from "../utils/tronWeb";
import { formatM } from '../utils/currencyFormatter';
import { depositoryContract } from "../contracts/depositoryContract";

class DepositoryPublisher {
  observers = [];
  walletDetails = {};
  depositoryContract_ = null;
  depositoryData = {gStableBalances : []}
  timer = null;
  constructor() {
    this.init();
  }

  get_gStableBalances = async (currencies) => {
    let gStableBalances = [];
    for(let i = 0; i  < currencies.length; i++){
      let currency = currencies[i];

      let gStableBal = await this.depositoryContract_.balanceOf(
        currency.id,
        this.walletDetails.address
      );
      gStableBalances.push({
        currencyKey: currency.key,
        balance: gStableBal,
      });
    }
   
    return gStableBalances;
  };
  getData = async () => {
      try {
        // Continuous polling as per https://github.com/ibnzUK/Tron-Wallet-React-Integration/blob/main/src/App.js
        let walletDetails_ = await getWalletDetails();
        if(walletDetails_.status == 1){
          this.walletDetails = walletDetails_;
        }
        if(this.depositoryContract_ == null){
          this.depositoryContract_ = await depositoryContract();
        }
      } catch (error) {
        console.error(error);
      }

      let currencies = getCurrencies();
      // reading gStable Balances
      this.depositoryData.gStableBalances = await this.get_gStableBalances(currencies);

      this.notify();
  };
  init = async () => {
    try {
      this.walletDetails = await getWalletDetails();
      this.depositoryContract_ = await depositoryContract();
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
    this.observers.forEach((observer) => observer(this.depositoryData));
  };



}

const depositoryPublisher = new DepositoryPublisher();

export default depositoryPublisher;


export const readDepositoryGStableBalance = (depositoryData, currency) => {
  if(depositoryData && depositoryData.gStableBalances){
    let result = depositoryData.gStableBalances.filter(c => currency.key.localeCompare(c.currencyKey) == 0);
    if(result.length> 0){
      return formatM(result[0].balance);
    }
}
  return formatM(0);
}
