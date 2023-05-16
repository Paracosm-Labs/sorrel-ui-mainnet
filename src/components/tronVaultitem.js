import Web3 from "web3";
import { useEffect, useState } from "react";
import React  from 'react';
import TRXImg from "../img/trx.png";
import walletPublisher from '../publishers/wallet';
import { DepositoryContractAddress, DepositoryOwnerAddress } from "../utils/contractAddress";

const TronVaultItem = () => {
  const [display, setDisplay] = useState(true);
  const [trxValue, setTRXValue] = useState(0);
  const [trxBalance, setTRXBalance] = useState(0);
  const [trxMyDeposits, setTRXMyDeposits] = useState(0);
  const [showLock, setShowLock] = useState(false);
  
  let web3 = new Web3();

  useEffect(() => {
    walletPublisher.attach(updateWalletData);
      return () => {
          console.log("Unmounting Resource Delegator");
          walletPublisher.detach(updateWalletData);
      }
  }, []);


  const updateWalletData = async (walletData) => {
      let trxBalance = await window.tronWeb.trx.getAccount(window.tronWeb.defaultAddress.base58);
      setTRXBalance(window.tronWeb.fromSun(trxBalance.balance));
  }

    const clear = () => {
      setTRXValue("");
    }


    const updateTRXValue = (e) => {
      console.log("DepositTRXValue : ", e.target.value);
      setTRXValue(e.target.value);
    };

  const deposit = async () => {
    let transaction  = await window.tronWeb.transactionBuilder.delegateResource(window.tronWeb.toSun(trxValue), DepositoryOwnerAddress, "ENERGY", window.tronWeb.defaultAddress.base58, true);
    const signedtxn = await window.tronWeb.trx.sign(transaction);
    const receipt = await window.tronWeb.trx.sendRawTransaction(signedtxn);
    console.log(receipt.txid);
     setShowLock(true);
  };

  const withdraw = async () => {
     setShowLock(false);
     setTRXBalance(trxBalance + trxValue);
     setTRXMyDeposits(trxMyDeposits - trxValue);
     clear();
  };


  const callVault = async () => {
    display ? await deposit() : await withdraw();
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
                <h6><b>{trxMyDeposits} TRX</b></h6>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionVaults">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3">
              Support Sorrel Banq by adding TRX into this vault to facilitate energy free transactions for fellow Sorrel members. Earn Vault rewards in a variety of stablecoins which are credited to your Sorrel account monthly.<br/><br/>
              <div className="text-center"><b>New Deposits are locked for 30 days.</b></div>
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
                  <p className="small">Balance: <b>{display ? <span>{trxBalance}</span> : <span>{trxMyDeposits}</span>} TRX</b></p>
                    <div className="input-group mb-2 mt-3">
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
                    </div>
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
                    <button
                      className={`mt-5 btn w-100 ${display ? "btn-outline-info" : "btn-outline-vault-withdraw"}`}
                      type="button"
                      id="button-deposit"
                      onClick={callVault}
                    >
                      {display ? "Deposit" : "Withdraw"}
                    </button>
 
                </div>
                <div className="col"></div>
            </div>

              <p className="mt-5 mb-3 text-center">
                  {showLock ? <i className="fa-solid fa-lock"></i> : <><i className="fa-solid fa-unlock text-sorrel-green"></i><br/><br/><span className="text-sorrel-green">Unlocked</span></>} <br/>
                  {showLock && `Deposit Locked till XXXXX.`}
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
