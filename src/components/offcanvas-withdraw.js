import React, { useEffect, useRef, useState }  from 'react';
import { getCurrencies } from '../utils/currencies';
import Select from "react-select";
import { depositoryContract } from '../contracts/depositoryContract';

const OffcanvasWithdraw = () => {
  const [gStableAmount, setGStableAmount] = useState(0);
  const [trxId, setTrxId] = useState("");

  // Canvas related
  const offCanvasWithdrawRef = useRef(null);
  useEffect(() => {
    const offCanvasWithdrawElement = offCanvasWithdrawRef.current;
    offCanvasWithdrawElement.addEventListener('hidden.bs.offcanvas', () => {
      // Handle onHide event here
      console.log('Off-canvas menu has been hidden');
      clear();
    });

    // Remove the event listener when the component is unmounted
    return () => {
      offCanvasWithdrawElement.removeEventListener('hidden.bs.offcanvas', () => {
        console.log("OffcanvasTransfer event listener removed");
      });
    };
  }, []);
  // Canvas related ends


// Select Currency Dropdown related
  const options = getCurrencies().map(currency => {
    return {value : currency.id, label : currency.label}
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

  const withdraw = async () => {
    try {
      let dc = await depositoryContract();
      console.log(`Withdrawing ${gStableAmount} in ${selected.label} (${selected.value})`);
      let trxId = await dc.withdraw(selected.value, gStableAmount);
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
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasWithdraw" aria-labelledby="offcanvasRightLabel" ref={offCanvasWithdrawRef}>
  <div className="offcanvas-header bg-info">
    <h5 id="offcanvasRightLabel">
      <i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Withdraw your assets from Sorrel to your Wallet"></i>
      &nbsp;&nbsp;Withdraw
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
      	<button className="btn btn-outline-info" onClick={withdraw}>Withdraw</button>
    	</div>
  	</div>
    <div id="alertWithdrawMsg">{trxId? <div className="mt-4 alert sorrel-success" role="alert"><a onClick={clear} href={`https://nile.tronscan.org/#/transaction/${trxId}`} target="_blank"  rel="noreferrer" >Processing Withdrawal - <span className="small">View Tronscan</span></a></div> : <></>}</div>
  </div>
</div>

</>
  );
};

export default OffcanvasWithdraw;
