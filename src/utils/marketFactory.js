import MarketContract from "../contracts/marketContract";
import { USDDMarketContractAddress } from "./contractAddress";
import { USDTMarketContractAddress } from "./contractAddress";

let instance = null;

let init = async () =>  {
    console.log(`Creating the MarketContracts...`);
  let usddMarketContract  = new MarketContract(USDDMarketContractAddress);
  let usdtMarketContract  = new MarketContract(USDTMarketContractAddress);
  return await usddMarketContract.init();
  return await usdtMarketContract.init();
};

export default {
  getMarket: async () => {
    if (!instance) {
      instance = await init();
    }
    return instance;
  }
};

  