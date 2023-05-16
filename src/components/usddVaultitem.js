import { useEffect, useState } from "react";
import React  from 'react';
import USDDImg from "../img/usdd.png";

const USDDVaultItem = () => {
  const [display, setDisplay] = useState(true);
  const [usddValue, setUSDDValue] = useState(0);
  const [usddBalance, setUSDDBalance] = useState(30333.69);
  const [usddMyDeposits, setUSDDMyDeposits] = useState(0);
  const [showLock, setShowLock] = useState(false);
  
  const [usddVaultDetails, setUSDDVaultDetails] = useState({
    interval: "",
  });

  const [usddVaultContract, setUSDDVaultContract] = useState({});
  useEffect(() => {
    initUSDDVaultContract();
    return () => {
      console.log("unmounting USDD Vault");
    };
  }, []);



  const initUSDDVaultContract = async () => {

  };

    const clear = () => {
      setUSDDValue("");
    }


    const updateUSDDValue = (e) => {
      console.log("DepositUSDDValue : ", e.target.value);
      setUSDDValue(e.target.value);
    };

  const deposit = async () => {
     setShowLock(true);
     setUSDDBalance(usddBalance - usddValue);
     setUSDDMyDeposits(usddMyDeposits + usddValue);
     clear();
  };

  const withdraw = async () => {
     setShowLock(false);
     setUSDDBalance(usddBalance + usddValue);
     setUSDDMyDeposits(usddMyDeposits - usddValue);
     clear();
  };


  const callUSDDVault = async () => {
    display ? await deposit() : await withdraw();
  };

  const active = "active";

  return (

    <>

      <div className="accordion-item vault-item mt-3">
        <h2 className="accordion-header" id="headingFour">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onClick={clear}>
            <div className="container row mx-1 pt-2">
              <div className="col-md-4 col-sm-12">
                <img
                  src={USDDImg}
                  alt="USDD"
                  width="42"
                  height="42"
                  className="flex-shrink-0"
                />
                <div className="currency-name">
                  <b>USDD</b>
                  <p className="small">Decentralized USD</p>
                </div>
              </div>
              <div className="col text-center apr-info">
                <b className="d-lg-none">APR</b>
                <h6>---</h6>
              </div>

              <div className="col text-center">
                <b className="d-lg-none">My Deposit</b>
                <h6><b>${usddMyDeposits}</b></h6>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionVaults">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3">
              Support goStables Protocol by Staking USDD to help increase the protocol's over-collateralization and stability for its gStables. Earn Vault rewards in a variety of stablecoins which are credited to your Sorrel account monthly.<br/><br/>
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
                <p className="small">Balance: <b>{display ? <span>{usddBalance}</span> : <span>{usddMyDeposits}</span>} USDD</b></p>
                  <div className="input-group mb-2 mt-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=""
                        onChange={updateUSDDValue}
                        value={usddValue}
                      />
                      <label htmlFor="floatingInputGroup1">Enter Amount</label>
                    </div>
                  </div>
                    {display ? <>
                    <div className="row">
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setUSDDValue(usddBalance * 0.25)}>25%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setUSDDValue(usddBalance * 0.50)}>50%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setUSDDValue(usddBalance * 0.75)}>75%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setUSDDValue(usddBalance * 1)}>100%</button>
                      </div>
                    </div>
                      </> :
                      <></>
                    }

                  <button
                    className={`mt-5 btn w-100 ${display ? "btn-outline-info" : "btn-outline-vault-withdraw"}`}
                    type="button"
                    id="button-deposit"
                    onClick={callUSDDVault}
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


export default USDDVaultItem;
