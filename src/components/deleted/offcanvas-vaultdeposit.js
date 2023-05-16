import React  from 'react';



const OffcanvasVaultDeposit = () => {
  return (

    <>


<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasVaultDeposit" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header bg-info">
    <h5 id="offcanvasRightLabel">Vault Deposit</h5>
    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body mx-3">


    <div className="row mt-3">
      <div className="col">
      <p className="text-left">Enter Amount</p>
          <div className="input-group mb-1 mt-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGroup1"
                placeholder="Value"
              />
              <label for="floatingInputGroup1">$</label>
            </div>
          </div>
          <p className="small pb-3">Balance: 3,000,000.89</p>
      </div>
    </div>

    <div className="row mt-5">
      <div className="col text-center">
      	<button className="btn btn-outline-info">Deposit</button>
    	</div>
  	</div>
  </div>
</div>

</>
  );
};

export default OffcanvasVaultDeposit;
