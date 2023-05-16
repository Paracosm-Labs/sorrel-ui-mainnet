import { useEffect, useState } from "react";
import React  from 'react';
import NRGImg from "../img/nrg.jpg";

const NRGVaultItem = () => {
  const [display, setDisplay] = useState(true);
  const [nrgValue, setNRGValue] = useState(0);
  const [nrgBalance, setNRGBalance] = useState(30333.69);
  const [nrgMyDeposits, setNRGMyDeposits] = useState(0);
  const [showLock, setShowLock] = useState(false);
  
  const [nrgVaultDetails, setNRGVaultDetails] = useState({
    interval: "",
  });

  const [nrgVaultContract, setNRGVaultContract] = useState({});
  useEffect(() => {
    initNRGVaultContract();
    return () => {
      console.log("unmounting NRG Vault");
    };
  }, []);



  const initNRGVaultContract = async () => {

  };

    const clear = () => {
      setNRGValue("");
    }


    const updateNRGValue = (e) => {
      console.log("DepositNRGValue : ", e.target.value);
      setNRGValue(e.target.value);
    };

  const deposit = async () => {
     setShowLock(true);
     setNRGBalance(nrgBalance - nrgValue);
     setNRGMyDeposits(nrgMyDeposits + nrgValue);
     clear();
  };

  const withdraw = async () => {
     setShowLock(false);
     setNRGBalance(nrgBalance + nrgValue);
     setNRGMyDeposits(nrgMyDeposits - nrgValue);
     clear();
  };


  const callNRGVault = async () => {
    display ? await deposit() : await withdraw();
  };

  const active = "active";

  return (

    <>

      <div className="accordion-item vault-item mt-3">
        <h2 className="accordion-header" id="headingTwo">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={clear}>
            <div className="container row mx-1 pt-2">
              <div className="col-md-4 col-sm-12">
                <img
                  src={NRGImg}
                  alt="NRG"
                  width="42"
                  height="42"
                  className="flex-shrink-0 nrg"
                />
                <div className="currency-name">
                  <b>NRG</b>
                  <p className="small">Tron NRG</p>
                </div>
              </div>
              <div className="col text-center apr-info">
                <b className="d-lg-none">APR</b>
                <h6>---</h6>
              </div>

              <div className="col text-center">
                <b className="d-lg-none">My Deposit</b>
                <h6><b>{nrgMyDeposits} NRG</b></h6>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionVaults">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3">
              Support Sorrel Banq by Staking NRG to facilitate energy free transactions for fellow Sorrel members. Earn Vault rewards in a variety of stablecoins which are credited to your Sorrel account bi-monthly.<br/><br/>
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
                <p className="small">Balance: <b>{display ? <span>{nrgBalance}</span> : <span>{nrgMyDeposits}</span>} NRG</b></p>
                  <div className="input-group mb-2 mt-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=""
                        onChange={updateNRGValue}
                        value={nrgValue}
                      />
                      <label htmlFor="floatingInputGroup1">Enter Amount</label>
                    </div>
                  </div>
                    {display ? <>
                    <div className="row">
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setNRGValue(nrgBalance * 0.25)}>25%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setNRGValue(nrgBalance * 0.50)}>50%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setNRGValue(nrgBalance * 0.75)}>75%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setNRGValue(nrgBalance * 1)}>100%</button>
                      </div>
                    </div>
                      </> :
                      <></>
                    }

                  <button
                    className={`mt-5 btn w-100 ${display ? "btn-outline-info" : "btn-outline-vault-withdraw"}`}
                    type="button"
                    id="button-deposit"
                    onClick={callNRGVault}
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


export default NRGVaultItem;
