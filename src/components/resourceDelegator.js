import { useEffect, useState } from "react";
import React  from 'react';
import TRXImg from "../img/trx.png";
import walletPublisher from '../publishers/wallet';
import { DepositoryOwnerAddress } from "../utils/contractAddress";
import { getDate } from "../utils/date";
import { ThreeDots } from "react-loader-spinner";

const TronVaultItem = () => {
  const [display, setDisplay] = useState(true);
  const [trxValue, setTRXValue] = useState(0);
  const [trxBalance, setTRXBalance] = useState(0);
  const [trxMyDeposits, setTRXMyDeposits] = useState([]);
  const [showLock, setShowLock] = useState(false);
  const [freezeTxId, setFreezeTxId] = useState();
  const [delegateTxId, setDelegateTxId] = useState();
  const [unfreezeTxId, setUnfreezeTxId] = useState();
  const [undelegateTxId, setUndelegateTxId] = useState();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    updateWalletData();
    walletPublisher.attach(updateWalletData);
      return () => {
          console.log("Unmounting Resource Delegator");
          walletPublisher.detach(updateWalletData);
      }
  }, []);


  const updateWalletData = async () => {
      let trxBalance = await window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58);
      setTRXBalance(window.tronWeb.fromSun(trxBalance.balance));
      const delegationInfo = await window.tronWeb.trx.getDelegatedResourceV2(window.tronWeb.defaultAddress.base58, DepositoryOwnerAddress);
      if(delegationInfo && delegationInfo.delegatedResource && delegationInfo.delegatedResource.length > 0){
        let deposits = [];
        let locked = false;
        for (let index = 0; index < delegationInfo.delegatedResource.length; index++) {
          let balance = 1* window.tronWeb.fromSun(delegationInfo.delegatedResource[index].frozen_balance_for_energy);
          let till = delegationInfo.delegatedResource[index].expire_time_for_energy;
          if(balance > 0 && till ){
            deposits.push({balance, till})          
          }
          if(till > new Date()){
            locked = true;
          }
        }
        setTRXMyDeposits(deposits);
        setShowLock(locked);
      }
  }

  const getTotalDeposits = () => {
    let total = 0;
    for (let index = 0; index < trxMyDeposits.length; index++) {
      total += trxMyDeposits[index].balance;
    }
    return total;
  }
  const getLatestLock = () => {
    let latest = 0;
    for (let index = 0; index < trxMyDeposits.length; index++) {
      if(trxMyDeposits[index].till > latest){
        latest = trxMyDeposits[index].till;
      }
    }
    return getDate(latest/1000);
  }  
  const clear = () => {
    setTRXValue("");
  }


    const updateTRXValue = (e) => {
      console.log("DepositTRXValue : ", e.target.value);
      setTRXValue(e.target.value);
    };

    const depositSync = () => {
      setProcessing(true);
      deposit();
    }

    const deposit = async () => {
      // setTimeout(() => {
      //   setProcessing(false);
      // }, 10 * 1000);
      try {
        let freezeTx = await window.tronWeb.transactionBuilder.freezeBalanceV2(window.tronWeb.toSun(trxValue), "ENERGY", window.tronWeb.defaultAddress.base58);
        const signedFreezeTxn = await window.tronWeb.trx.sign(freezeTx);
        const freezereceipt = await window.tronWeb.trx.sendRawTransaction(signedFreezeTxn);
        setFreezeTxId(freezereceipt.txid);
    
        let delegateTx  = await window.tronWeb.transactionBuilder.delegateResource(window.tronWeb.toSun(trxValue), DepositoryOwnerAddress, "ENERGY", window.tronWeb.defaultAddress.base58, true);
        const signedDelegateTxn = await window.tronWeb.trx.sign(delegateTx);
        const delegatereceipt = await window.tronWeb.trx.sendRawTransaction(signedDelegateTxn);
        setDelegateTxId(delegatereceipt.txid);

        setProcessing(false);
      } catch (error) {
        console.error(error);
        setProcessing(false);
      }
    };

    const withdrawSync = () => {
      setProcessing(true);
      withdraw();
    }
  
    const withdraw = async () => {
      // setTimeout(() => {
      //   setProcessing(false);
      // }, 10 * 1000);
      try {
        let undelegateTx  = await window.tronWeb.transactionBuilder.undelegateResource(window.tronWeb.toSun(trxValue), DepositoryOwnerAddress, "ENERGY", window.tronWeb.defaultAddress.base58);
        const signedUndelegateTxn = await window.tronWeb.trx.sign(undelegateTx);
        const undelegatereceipt = await window.tronWeb.trx.sendRawTransaction(signedUndelegateTxn);
        setUndelegateTxId(undelegatereceipt.txid);
    
        let unfreezeTx = await window.tronWeb.transactionBuilder.unfreezeBalanceV2(window.tronWeb.toSun(trxValue), "ENERGY", window.tronWeb.defaultAddress.base58);
        const signedUnfreezeTxn = await window.tronWeb.trx.sign(unfreezeTx);
        const unfreezereceipt = await window.tronWeb.trx.sendRawTransaction(signedUnfreezeTxn);
        setFreezeTxId(unfreezereceipt.txid);

        setProcessing(false);
      } catch (error) {
        console.error(error);
        setProcessing(false);
      }
    };


    const getDepositsJSX = () => {
      if(showLock){
        return <></>
      }
      let jsx = trxMyDeposits.map(dep => {
        let date = getDate(dep.till/1000);
        return <p className="small" key={dep.till}>Deposit: <b> <span>{dep.balance}</span>TRX locked till {date}</b></p>
      })
      return jsx;
    }

    const getButtonJSX = () => {
      if(processing){
        return <div className="d-flex justify-content-center mt-3"> <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         /></div>
      }
      return (<button
        className={`mt-5 btn w-100 ${display ? "btn-outline-info" : "btn-outline-vault-withdraw"}`}
        type="button"
        id="button-deposit"
        onClick={callVault}
      >
        {display ? "Deposit" : "Withdraw"}
      </button>)
    }

    const getInputJSX = () => {
      return (<div className="input-group mb-2 mt-3">
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInputGroup1"
          placeholder=""
          onChange={updateTRXValue}
          value={trxValue}
        />
        <label htmlFor="floatingInputGroup1">Enter Amount</label>
      </div>
    </div>)
    }

  const callVault = async () => {
    // display ? await deposit() : await withdraw();
    display ? depositSync() : withdrawSync();
  };
  const active = "active";
  return (
   <>
      <div className="accordion-item vault-item mt-3">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={clear}>
            <div className="container row mx-1 pt-2">
              <div className="col-md-4 col-sm-12">
                <img
                  src={TRXImg}
                  alt="TRX"
                  width="42"
                  height="42"
                  className="flex-shrink-0"
                />
                <div className="currency-name">
                  <b>TRX</b>
                  <p className="small">Tron</p>
                </div>
              </div>
              <div className="col text-center apr-info">
                <b className="d-lg-none">APR</b>
                <h6>---</h6>
              </div>
              <div className="col text-center">
                <b className="d-lg-none">My Deposit</b>
                <h6><b>{getTotalDeposits()} TRX</b></h6>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionVaults">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3">
              Support Sorrel by staking TRX for Tron Resources to facilitate energy free transactions for fellow Sorrel members. Earn rewards in a variety of stablecoins, credited to your Sorrel account monthly.<br/><br/>
              <div className="text-center"><b>Deposits are locked for 3 days.</b></div>
            </div>
          </div>
    <div className="row">
        <div className="col"></div>
          <div className="col-md-10">
            <ul className="nav nav-tabs text-center">
              <li className="nav-item w-50">
                <a className={`nav-link ${display ? active : ""}`} href="#"
                onClick={() => setDisplay(true)}
                >Deposit</a>
              </li>
              <li className="nav-item w-50">
                <a className={`nav-link ${display ? "" : active}`} href="#"
                onClick={() => setDisplay(false)}
                >Withdraw</a>
              </li>
            </ul>
            <div className="row mb-4 mt-5">
                <div className="col"></div>
                <div className="col-md-8">
                  {display ? <p className="small">Balance: <b> <span>{trxBalance}</span>TRX</b></p> : getDepositsJSX()}
                    {display ? getInputJSX() : showLock ? <></> : getInputJSX()}
                    {display ? <>
                    <div className="row">
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setTRXValue(trxBalance * 0.25)}>25%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setTRXValue(trxBalance * 0.50)}>50%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setTRXValue(trxBalance * 0.75)}>75%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setTRXValue(trxBalance * 0.95)}>95%</button>
                      </div>
                    </div>
                      </> :
                      <></>
                    }
                    {display ? getButtonJSX() : showLock ? <></> : getButtonJSX()}
 
                </div>
                <div className="col"></div>
            </div>

              <p className="mt-5 mb-3 text-center">
                  {showLock ? 
                  <i className="fa-solid fa-lock"></i> : 
                  <><i className="fa-solid fa-unlock text-sorrel-green"></i><br/><br/><span className="text-sorrel-green">Unlocked</span></>} <br/>
                  {showLock && `Deposit Locked till ${getLatestLock()}.`}
              </p>


          </div>
          <div className="col"></div>
      </div>


          </div>
        </div>
      </div>


    </>
  );
};


export default TronVaultItem;
