import React  from 'react';



const OffcanvasBridge = () => {
  return (

    <>


<div className="offcanvas offcanvas-end" tabIndex="-1" id="OffcanvasBridge" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header bg-info">
    <h5 id="offcanvasRightLabel">Bridge To</h5>
    <button type="button" className="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body mx-3">


    <div className="row mt-3">
      <div className="col">
      <p className="text-left">Enter Full Name</p>
          <div className="input-group mb-1 mt-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGroup1"
                placeholder="Value"
              />
            </div>
          </div>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col">
      <p className="text-left">Enter Account Number</p>
          <div className="input-group mb-1 mt-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputGroup1"
                placeholder="Value"
              />
              <label for="floatingInputGroup1">IBAN/Card Number</label>
            </div>
          </div>
      </div>
    </div>

    <div className="row mt-5">
      <div className="col text-center">
      	<button className="btn btn-outline-info">Send</button>
    	</div>
  	</div>
  </div>
</div>

</>
  );
};

export default OffcanvasBridge;
