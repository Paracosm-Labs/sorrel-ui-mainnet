import { useEffect, useState } from "react";
import React  from 'react';
import ERGImg from "../img/erg.png";

const ERGVaultItem = () => {
  const [display, setDisplay] = useState(true);
  const [ergValue, setERGValue] = useState(0);
  const [ergBalance, setERGBalance] = useState(30333.69);
  const [ergMyDeposits, setERGMyDeposits] = useState(0);
  const [showLock, setShowLock] = useState(false);
  
  const [ergVaultDetails, setERGVaultDetails] = useState({
    interval: "",
  });

  const [ergVaultContract, setERGVaultContract] = useState({});
  useEffect(() => {
    initERGVaultContract();
    return () => {
      console.log("unmounting ERG Vault");
    };
  }, []);



  const initERGVaultContract = async () => {

  };

    const clear = () => {
      setERGValue("");
    }


    const updateERGValue = (e) => {
      console.log("DepositERGValue : ", e.target.value);
      setERGValue(e.target.value);
    };

  const deposit = async () => {
     setShowLock(true);
     setERGBalance(ergBalance - ergValue);
     setERGMyDeposits(ergMyDeposits + ergValue);
     clear();
  };

  const withdraw = async () => {
     setShowLock(false);
     setERGBalance(ergBalance + ergValue);
     setERGMyDeposits(ergMyDeposits - ergValue);
     clear();
  };


  const callERGVault = async () => {
    display ? await deposit() : await withdraw();
  };

  const active = "active";

  return (

    <>

      <div className="accordion-item vault-item mt-3">
        <h2 className="accordion-header" id="headingThree">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={clear}>
            <div className="container row mx-1 pt-2">
              <div className="col-md-4 col-sm-12">
                <img
                  src={ERGImg}
                  alt="ERG"
                  width="42"
                  height="42"
                  className="flex-shrink-0 erg"
                />
                <div className="currency-name">
                  <b>ERG</b>
                  <p className="small">USTX ERG</p>
                </div>
              </div>
              <div className="col text-center apr-info">
                <b className="d-lg-none">APR</b>
                <h6>---</h6>
              </div>

              <div className="col text-center">
                <b className="d-lg-none">My Deposit</b>
                <h6><b>{ergMyDeposits} ERG</b></h6>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionVaults">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3">
              Support Sorrel Banq by Staking ERG to facilitate energy free transactions for fellow Sorrel members. Earn Vault rewards in a variety of stablecoins which are credited to your Sorrel account bi-monthly.<br/><br/>
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
                <p className="small">Balance: <b>{display ? <span>{ergBalance}</span> : <span>{ergMyDeposits}</span>} ERG</b></p>
                  <div className="input-group mb-2 mt-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=""
                        onChange={updateERGValue}
                        value={ergValue}
                      />
                      <label htmlFor="floatingInputGroup1">Enter Amount</label>
                    </div>
                  </div>
                    {display ? <>
                    <div className="row">
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setERGValue(ergBalance * 0.25)}>25%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm mr-2 w-100" onClick={() => setERGValue(ergBalance * 0.50)}>50%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setERGValue(ergBalance * 0.75)}>75%</button>
                      </div>
                      <div className="col text-center">
                        <button type="button" className="btn btn-outline-light btn-sm w-100" onClick={() => setERGValue(ergBalance * 1)}>100%</button>
                      </div>
                    </div>
                      </> :
                      <></>
                    }

                  <button
                    className={`mt-5 btn w-100 ${display ? "btn-outline-info" : "btn-outline-vault-withdraw"}`}
                    type="button"
                    id="button-deposit"
                    onClick={callERGVault}
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


export default ERGVaultItem;
