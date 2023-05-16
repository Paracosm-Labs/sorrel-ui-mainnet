import React, { useEffect, useState } from 'react';
import { readDepositoryGStableBalance } from '../publishers/depository';
import { readWalletGStableBalance } from '../publishers/wallet';
import TronLinkLogo from "../img/tronlink-logo.png";
import SorrelLogo from "../img/sorrel-logo.png";
import goStablesLogo from "../img/gostables-logo.png";

const CurrencyDeposit = ({currency, walletData, depositoryData}) => {
    let depositoryBalance = readDepositoryGStableBalance(depositoryData,currency);
    let walletBalance = readWalletGStableBalance(walletData, currency);
    const [isAnimated, setIsAnimated] = useState(false);

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
      if (depositoryBalance !== 0) {
        handleValueAnimate();
      }
    }, [depositoryBalance]);



    if(depositoryBalance == 0 && walletBalance == 0 ){
        return <></>
    }

    return (<div className="card currency m-3 col-md-3 p-0" id={currency.label}>
    <div className="card-body">
        <div className="row align-items-center">
            <div className="col-md-3 text-center">
                <img src={currency.icon}
                width="42"
                height="42"
                className="flex-shrink-0" />
            </div>
            <div className="col-md-9">
                <h4 className="card-title"><span className={isAnimated ? 'vibrate-1' : '' }><span className="text-xs">{currency.symbol}</span>{depositoryBalance}</span></h4>
            </div>
        </div>
        <div className="row align-items-center">
            <div className="col-md-3"></div>
            <div className="col-md-9">
                <span style={{fontSize : ".85rem"}}>
                  <img
                    width="14"
                    height="14"
                    alt="Tronlink"
                    src={TronLinkLogo}
                  />&nbsp;&nbsp;{walletBalance} {currency.label}
                </span>
            </div>
        </div>
    </div>

</div>)
}

export default CurrencyDeposit;