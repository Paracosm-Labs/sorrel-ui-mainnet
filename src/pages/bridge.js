import React  from 'react';
import OffcanvasBridge  from '../components/offcanvas-bridge';



const Bridge = () => {
  return (

    <>
    <div className="d-flex bg-sorrel pb-8">
      <div className="container content">
          <div className="row mt-3">
            <div className="col text-center">
              <h1>Bridge</h1>
              <p>Convert your stablecoins into the real world</p>
            </div>
          </div>

      </div>



    </div>



    <div className="container bridge content">
        <div className="row mt-5">
          <div className="col text-center d-lg-none">
          </div>
        </div>
      <div className="row mt-n10">
        <div className="col"></div>
        <div className="col-md-6">
          <div className="card bg-secondary p-3">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h4>Source</h4>

                  <select className="mt-3 form-select form-select-sm" aria-label="Select Currency">
                    <option selected>gTTD $4,400.88</option>
                    <option value="2">gXCD $4,400.88</option>
                    <option value="3">gBBD $4,400.88</option>
                    <option value="4">gJMD $44,000.88</option>
                    <option value="5">gDOP $4,000.88</option>
                  </select>

                  <div className="input-group mb-1 mt-3">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder="Value in USDD"
                      />
                      <label for="floatingInputGroup1">Enter Amount</label>
                    </div>
                    <span className="input-group-text">
                      <i className="fa-solid fa-dollar"></i>
                    </span>
                  </div>



                </div>
                <div className="row p-3 text-center">

                </div>
                <div className="col mt-3">
                  <h4>Destination</h4>

                  <select className="form-select mt-3" aria-label="Select Method">
                    <option selected>Available Methods</option>
                    <option value="1">Western Union</option>
                    <option value="2">Moneygram</option>
                    <option value="3">RIA</option>
                    <option value="4">Bank Transfer</option>
                    <option value="4">SWIFT</option>
                    <option value="4">Worldremit</option>
                    <option value="4">Remitly</option>
                    <option value="4">SEPA</option>
                    <option value="5">IBAN</option>
                    <option value="6">ACH</option>
                    <option value="7">Visa</option>
                    <option value="8">Mastercard</option>
                    <option value="9">Alipay</option>
                    <option value="10">Google Pay</option>
                  </select>

                </div>
              </div>

                  <div className="row text-center mt-5">
                    <div className="col">

                      <button className="btn btn-outline-info btn-lg" data-bs-toggle="offcanvas" data-bs-target="#OffcanvasBridge" aria-controls="#OffcanvasBridge">
                        Next Step
                      </button>

                    </div>
                  </div>

            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>

    <OffcanvasBridge></OffcanvasBridge>



    </>

  );
};

export default Bridge;
