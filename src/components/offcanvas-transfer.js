import React, { useEffect, useRef, useState }  from 'react';
import { getCurrencies, getCurrency } from '../utils/currencies';
import Select from "react-select";
import { depositoryContract } from '../contracts/depositoryContract';
import { DepositoryContractAddress } from '../utils/contractAddress';
import axios from 'axios';
import serverURL from '../utils/server';
import { formatM } from '../utils/currencyFormatter';
import TransactionHistory from "../components/txnhistory";

const OffcanvasTransfer = () => {
  const [gStableAmount, setGStableAmount] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [trxId, setTrxId] = useState("");
  const [executeTrxId, setExecuteTrxId] = useState("");
  const [sorrelBalance, setSorrelBalance] = useState(0);

  // Canvas related
  const offCanvasTransferRef = useRef(null);
  useEffect(() => {
    const offCanvasTransferElement = offCanvasTransferRef.current;
    offCanvasTransferElement.addEventListener('hidden.bs.offcanvas', () => {
      // Handle onHide event here
      console.log('Off-canvas menu has been hidden');
      clear();
    });

    // Remove the event listener when the component is unmounted
    return () => {
      offCanvasTransferElement.removeEventListener('hidden.bs.offcanvas', () => {
        console.log("OffcanvasTransfer event listener removed");
      });
    };
  }, []);
  // Canvas related ends

  const updateBalance = async (currencyKey) => {
    try {
      let currency = getCurrency(currencyKey);
      // Wallet Balance
      // let gStableContract = await currency.gStableContract();
      // let gStableBal = await gStableContract.balanceOf(window.tronWeb.defaultAddress.base58);
  
      // Sorrel Balance
      let dc = await depositoryContract();
      let gStableBal = await dc.balanceOf(currency.id, window.tronWeb.defaultAddress.base58);
      
      setSorrelBalance(gStableBal);      
    } catch (error) {
      console.error(error);
    }
  
  }

// Select Currency Dropdown related
  const options = getCurrencies().map(currency => {
    return {value : currency.key, label : currency.label}
  });

  let defaultCurrency = getCurrency("TTD");
  const selectDefault = {value : defaultCurrency.key, label : defaultCurrency.label}

  const [selected, setSelected] = useState(selectDefault);
  

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
    updateBalance(selectedOption.value);
  };
// Select Currency Dropdown related ends



  const updateAmount = (e) => {
    console.log("DepositValue : ", e.target.value);
    setGStableAmount(e.target.value);
  };

  const updateAddress = (e) => {
    console.log("Send To Address  : ", e.target.value);
    setToAddress(e.target.value);
  };

  const clear = () => {
    setGStableAmount(0);
    setTrxId("");
    setToAddress("");
  }

  const sendGL = async () => {
    try {
      if (window.tronWeb.ready && selected) {
        let currency = getCurrency(selected.value);
        console.log(`Sending ${gStableAmount} in ${selected.label} (${selected.value}) to ${toAddress}`);

        let tx = {
          from : window.tronWeb.defaultAddress.base58,
          to: toAddress,
          gStableId: currency.id,
          value: gStableAmount,
        };

        axios.post(`${serverURL}/txn/init`,tx)
        .then((response) => {
          console.log(response);
          setTrxId(response.data.trxId);
        })
        .catch((error) => {
          console.log(error);
        });        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const send = async () => {
    try {
      let dc = await depositoryContract();
      let currency = getCurrency(selected.value);
      console.log(`Sending ${gStableAmount} in ${selected.label} (${selected.value}) to ${toAddress}`);
      let trxId = await dc.transfer(currency.id, gStableAmount, toAddress);
      setTrxId(trxId);
    } catch (error) {
      console.error(error);
    }
  }; 
  
  const getSymbol = () => {
    if(selected){
      let currency = getCurrency(selected.value);
      return currency.symbol;
    } 
    return "";
  } 

  return (
    <>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasTransfer" ref={offCanvasTransferRef}>
        <div className="offcanvas-header bg-info">
          <h5 id="offcanvasRightLabel">
            <i className="fa-solid fa-arrow-right-from-bracket" data-toggle="tooltip" title="Transfer assets between Sorrel Members"></i>&nbsp;&nbsp;Transfer&nbsp;&nbsp;
            <i className="fa-solid fa-bolt fa-beat" data-toggle="tooltip" title="Enjoy Energy Free transactions when available!"></i>
          </h5>
          <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" onClick={clear}></button>
        </div>
        <div className="offcanvas-body mx-3">
        <div className="mt-3">
      <p className="text-left">Select Currency</p>
      <Select options={options} onChange={handleChange} autoFocus={true} defaultValue={selectDefault}/>
      </div>
      <div className="row mt-3">
        <div className="col">
            <div className="input-group mb-1 mt-0">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGroup1"
                  onChange={updateAmount}
                  value={gStableAmount}
                />
                <label htmlFor="floatingInputGroup1">{selected?selected.label:""}</label>
              </div>
            </div>
            <p className="text-left sorrel-bal">Sorrel Balance: {getSymbol()} {formatM(sorrelBalance)}</p>
        </div>
      </div>
          <div className="row mt-3">
          <div className="col">
              <p className="text-left">Destination</p>
              
              <div className="input-group mb-1 mt-3">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputGroup1"
                    placeholder="$"
                    onChange={updateAddress}
                    value={toAddress}
                  />
                  <label htmlFor="floatingInputGroup1">Address</label>
                </div>
              </div>
          </div>
          </div>

          <div className="row mt-5 text-center">
          {/* <div className="col">
            <button className="btn btn-outline-info" onClick={send}>Send</button>
          </div> */}
          <div className="col">
            <button className="btn btn-outline-info" onClick={sendGL}>
              Send <i className="fa-solid fa-bolt fa-beat lite"></i>
            </button>
          </div>          
          </div>
          <div id="alertTransferMsg">{trxId? <>
            <div className="mt-4 alert sorrel-success" role="alert"><a href={`https://nile.tronscan.org/#/transaction/${trxId}`} target="_blank"  rel="noreferrer" >Transfer Initiated - 
            <span className="small text-decoration-underline">View Tronscan</span></a><br/>
            <span className="">Please Confirm Transaction</span>
          </div> <TransactionHistory></TransactionHistory>
          </>
            : <><TransactionHistory></TransactionHistory></>
            } </div>
        </div>
      </div>
      </>
  );
};

export default OffcanvasTransfer;
