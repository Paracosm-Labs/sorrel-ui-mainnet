import React, { useEffect, useState } from 'react';
import depositoryPublisher from '../publishers/depository';
import walletPublisher from '../publishers/wallet';
import { getCurrencies, getCurrency } from '../utils/currencies';
import { formatM, formatUSD } from '../utils/currencyFormatter';
import SwapUSDDFactory from "../utils/swapUSDDFactory";
import Select from 'react-select';

const BalanceCardUSDD = () => {
    const [walletData, setWalletData] = useState({gStableBalances : []});
    const [depositoryData, setDepositoryData] = useState({gStableBalances : []});
    const [depositoryBalanceUSD, setDepositoryBalanceUSD] = useState(0);
    const [depositoryBalance, setDepositoryBalance] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);


    useEffect(() => {
        connectWallet();
        return () => {
            console.log("Unmounting BalanceCardUSDD");
            walletPublisher.detach(setWalletData);
            depositoryPublisher.detach(updateDepositoryData);
        }
    }, []);

    const connectWallet = async () => {
        walletPublisher.attach(setWalletData);
        depositoryPublisher.attach(updateDepositoryData);
    }

    const updateDepositoryData = (data)=> {
      setDepositoryData(data);
      read(data);
    }

    const read = async (data) => {
        let depositoryBalanceUSD = 0; 
      try {
        let swapContract = await SwapUSDDFactory.getSwapUSDD();
        for(let i = 0; i < data.gStableBalances.length; i++){
            let currency = getCurrency(data.gStableBalances[i].currencyKey);
            let conversionRatio = await swapContract.getConversion(currency.id);
            if(conversionRatio > 0){
              depositoryBalanceUSD += data.gStableBalances[i].balance/conversionRatio;
            }
        }
        setDepositoryBalanceUSD(depositoryBalanceUSD);
      } catch (error) {
        console.error(error);
      }
    };


    //function to handle the logic of making the value animate then back to normal.
    const handleValueAnimate = () => {
      // set the value to animation
      setIsAnimated(true);
      
      // after 1 second, set the value back to normal
      setTimeout(() => {
        setIsAnimated(false);
      }, 1500);
    }

    useEffect(() => {
      if (depositoryBalanceUSD !== 0) {
        handleValueAnimate();
      }
    }, [depositoryBalanceUSD]);


    //Currency dropdown related
    // debugger;
    let usddCurrency = getCurrency("USDD");
    let defaultOption = {value : usddCurrency.key, text : usddCurrency.symbol,  icon :<img src={usddCurrency.icon} width="20" height="20" className="flex-shrink-0" />}
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    useEffect(() => {
      updateBalancePerCurrency();      
      return () => {
        console.log("BalancesUSDD unmounted");
      };
    }, [depositoryBalanceUSD, selectedOption]);

    const updateBalancePerCurrency = async () => {
      // debugger;
      if(!selectedOption){
        setDepositoryBalance(formatM(depositoryBalanceUSD));
      }
      if (depositoryBalanceUSD !== 0 && selectedOption) {
        try {
          let swapContract = await SwapUSDDFactory.getSwapUSDD();
          let currency = getCurrency(selectedOption.value); 
          let conversionRatio = await swapContract.getConversion(currency.id);
          setDepositoryBalance(depositoryBalanceUSD * conversionRatio);
        } catch (error) {
          console.error(error);
        }        
      }
    }



    const data = getCurrencies().map(currency => {
      return {value : currency.key, text : currency.symbol, icon :<img src={currency.icon} width="20" height="20" className="flex-shrink-0" />}
    });
 
    // handle onChange event of the dropdown
    const handleChange = e => {
      setSelectedOption(e);
    }

    const getSymbol = () => {
      if(selectedOption) {
        let currency = getCurrency(selectedOption.value); 
        return currency.symbol;
      } 
      return "$";
    }
   //Currency dropdown related ends



    return(
    <div className="col-sm text-center">
        <h3>Sorrel Balance</h3>
        <div className='d-flex justify-content-center'>
            <div className='px-2 pt-1'><Select
            placeholder="Select"
            className="currency-selector"
            value={selectedOption}
            options={data}
            onChange={handleChange}
            getOptionLabel={e => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {e.icon}
                <span style={{ marginLeft: 10 }}>{e.text}</span>
              </div>
            )}
          /></div>
            <div className='px-1 h1'><div className={isAnimated ? 'vibrate-sorrel-balance' : '' }><span className='px-2'>{getSymbol()}</span>{formatM(depositoryBalance)}</div></div>
        </div>
    </div>
    )
}

export default BalanceCardUSDD;