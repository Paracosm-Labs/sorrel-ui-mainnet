import CardsImg from "../img/cards-mockup-alpha.png";
import React  from 'react';

const WalletCard = () => {
  return (

    <>

      <div className="accordion-item wallet-card mt-3">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
            <div className="container row">
              <div className="col-12 text-center">
                <h4>Pre-Order Now</h4>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionCards">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3 border-width-2">
              To Pre-Order your Sorrel NFC Wallet Card - Alpha Edition, you can <a href="/addons">crowdfund this addon</a> with a minimum of $30 USD value in any supported stablecoin on Sorrel.<br/><br/>Once funding goal is met, the functional mechanics will be implemented on Mainnet. Up to 50% of fund goal will be redistributed to members staked in the Sorrel TRX Vault.
            </div>
          </div>


          <div className="row mb-4 mt-3">
              <div className="col"></div>

              <div className="col-md-6">
                <p className="text-left">Enter Your Full Name</p>
                  <div className="input-group mb-1 mt-3">
                    <div className="form-floating">
                      <input disabled
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=""
                      />
                      <label htmlFor="floatingInputGroup1">Full Name</label>
                    </div>
                  </div>
              </div>
              <div className="col"></div>
          </div>

          <div className="row mb-4 mt-3">
              <div className="col"></div>

              <div className="col-md-6">
                <p className="text-left">Enter Your Full Shipping Address</p>
                  <div className="input-group mb-1 mt-3">
                    <div className="form-floating">
                      <input disabled
                        type="text-area"
                        className="form-control"
                        id="floatingInputGroup1"
                        placeholder=""
                      />
                      <label htmlFor="floatingInputGroup1">Address</label>
                    </div>
                  </div>
              </div>
              <div className="col"></div>
          </div>

            <div className="row mt-1 mb-3 text-center">
              <div className="col"></div>
              <div className="col">
                <button className="btn btn-outline-info disabled" type="button">Pre-Order Now</button>           
              </div>
              <div className="col"></div>            
            </div>
          </div>
        </div>
      </div>


      <div className="accordion-item wallet-card mt-3">
        <h2 className="accordion-header" id="headingFour">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <div className="container row">
              <div className="col-12 text-center">
                <h4>Activate Card</h4>
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionCards">
          <div className="accordion-body">
          <div className="row">
            <div className="col border-bottom pb-3 border-width-2">
              Please ensure you are viewing this page on an NFC enabled device such as an Android smartphone.<br/>Once you recieve your card, activation is done in 3 steps: <br/><br/>
                <ul>
                  <li>Click the Activate button.</li>
                  <li>Place your Sorrel Card to your phone near its NFC reader.</li>
                  <li>Wait for the message confirming a successful activation. (Usually within 2 - 5 seconds)</li>
                </ul>
            </div>
          </div>


            <div className="row mt-5 text-center">
              <div className="col"></div>
              <div className="col">
              <button className="btn btn-outline-info disabled" type="button">Activate<br/>Coming Soon</button>
              </div>
              <div className="col"></div>
            </div>
            
           
          </div>
        </div>
      </div>



    </>

  );
};

export default WalletCard;
