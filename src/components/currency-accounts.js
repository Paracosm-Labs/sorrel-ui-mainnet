import React, { useEffect, useState } from 'react';
import depositoryPublisher from '../publishers/depository';
import walletPublisher from '../publishers/wallet';
import { getCurrencies } from '../utils/currencies';
import CurrencyDeposit from './currencyDeposit';
import Welcome from './welcome';


const CurrencyAccounts = () => {
    const [walletData, setWalletData] = useState({});
    const [depositoryData, setDepositoryData] = useState({gStableBalances : []});

    useEffect(() => {
        connectWallet();
        return () => {
            console.log("Unmounting CurrencyAccounts");
            walletPublisher.detach(setWalletData);
            depositoryPublisher.detach(setDepositoryData);
        }
    }, []);

    const connectWallet = async () => {
        walletPublisher.attach(setWalletData);
        depositoryPublisher.attach(setDepositoryData);
    }

    const checkDepositoryGStableBalances = (depositoryData) => {
          let result = depositoryData.gStableBalances.filter(gsb => gsb.balance > 0);
          if(result.length> 0){
            return true;
          } else return false;
    }
    const checkWalletGStableBalances = (walletData) => {
        let result = walletData.gStableBalances.filter(gsb => gsb.balance > 0);
        if(result.length> 0){
          return true;
        } else return false;
  }    
    if(depositoryData && depositoryData.gStableBalances && walletData && walletData.gStableBalances){
        if(!checkDepositoryGStableBalances(depositoryData) && !checkWalletGStableBalances(walletData)){
            return <Welcome></Welcome>
        }
    }


    return (<>
        <div className="row d-flex justify-content-center">
            {
                getCurrencies().map(currency => <CurrencyDeposit key={currency.id} currency={currency} walletData={walletData} depositoryData={depositoryData} />)
            }
        </div>
    </>)
}

export default CurrencyAccounts;