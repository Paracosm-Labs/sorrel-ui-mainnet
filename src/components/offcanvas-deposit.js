import React, { useEffect, useRef, useState }  from 'react';
import { getCurrencies, getCurrency } from '../utils/currencies';
import Select from "react-select";
import { depositoryContract } from '../contracts/depositoryContract';
import { DepositoryContractAddress } from '../utils/contractAddress';

const OffcanvasDeposit = () => {
  const [gStableAmount, setGStableAmount] = useState(0);
  const [trxId, setTrxId] = useState("");

  // Canvas related
  const offCanvasDepositRef = useRef(null);
  useEffect(() => {
    const offCanvasDepositElement = offCanvasDepositRef.current;
    offCanvasDepositElement.addEventListener('hidden.bs.offcanvas', () => {
      // Handle onHide event here
      console.log('Off-canvas menu has been hidden');
      clear();
    });

    // Remove the event listener when the component is unmounted
    return () => {
      offCanvasDepositElement.removeEventListener('hidden.bs.offcanvas', () => {
        console.log("OffcanvasTransfer event listener removed");
      });
    };
  }, []);
  // Canvas related ends

// Select Currency Dropdown related
  const options = getCurrencies().map(currency => {
    return {value : currency.key, label : currency.label}
  });


  const [selected, setSelected] = useState(null);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const updateAmount = (e) => {
    console.log("DepositValue : ", e.target.value);
    setGStableAmount(e.target.value);
  };

  const clear = () => {
    setGStableAmount(0);
    setTrxId("");
  }

  const deposit = async () => {
    try {
      let dc = await depositoryContract();
      let currency = getCurrency(selected.value);
      let gStableContract = await currency.gStableContract();
      await gStableContract.approve(DepositoryContractAddress, gStableAmount * 1);
      console.log(`Depositing ${gStableAmount} in ${selected.label} (${selected.value})`);
      let trxId = await dc.deposit(currency.id, gStableAmount);
      setTrxId(trxId);
      document.querySelectorAll('input').forEach(input => {
          input.value = '';
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDeposit" aria-labelledby="offcanvasRightLabel"  ref={offCanvasDepositRef}>
  <div className="offcanvas-header bg-info">
    <h5 id="offcanvasRightLabel">
      <i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Deposit assets to your Sorrel Account"></i>
      &nbsp;&nbsp;Deposit
    </h5>
    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={clear}></button>
  </div>
  <div className="offcanvas-body mx-3">

    <div className="mt-3">
      <p className="text-left">Select Currency</p>
      <Select options={options} onChange={handleChange} autoFocus={true} />
    </div>

    <div className="row mt-5">
      <div className="col">
      <p className="text-left">Enter Amount</p>
          <div className="input-group mb-1 mt-3">
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
      </div>
    </div>

    <div className="row mt-5">
      <div className="col text-center">
      	<button className="btn btn-outline-info" onClick={deposit}>Deposit</button>
    	</div>
  	</div>
    <div id="alertDepositMsg">{trxId? <div className="mt-4 alert sorrel-success" role="alert"><a onClick={clear} href={`https://nile.tronscan.org/#/transaction/${trxId}`} target="_blank"  rel="noreferrer" >Processing Deposit - <br/><span className="small">View Tronscan</span></a></div> : <></>}</div>
  </div>
</div>

</>
  );
};

export default OffcanvasDeposit;
