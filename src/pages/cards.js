import React  from 'react';
import WalletCard from '../components/walletCard';
import CardsImg from "../img/cards-mockup-alpha.png";

const Cards = () => {
  return (
    <>
    <div className="d-flex bg-sorrel pb-8">
        <div className="container content">
            <div className="row mt-3 text-center">
              <div className="col d-none d-lg-block">
                <h3>Get Your Sorrel NFC Wallet Card</h3>
                <h5>[Coming Soon]</h5>
              </div>
              <div className="col d-lg-none pb-8">
                <h3>Get Your Sorrel NFC Wallet Card</h3>
                <h5>[Coming Soon]</h5>
              </div>
            </div>

        </div>
    </div>


    <div className="container cards content">
      <div className="row mt-n10">
        <div className="col"></div>
        <div className="col-md-8 text-center">
                <img
                  src={CardsImg}
                  alt="Sorrel NFC Wallet Card"
                  width="550"
                  className="sorrel-card"
                />
        </div>
        <div className="col"></div>
      </div>
      <div className="row mt-1">
        <div className="col"></div>
        <div className="col-md-8">

              <div className="row p-3">
                <div className="col">

                  <div className="accordion" id="accordionCards">
                    <WalletCard></WalletCard>
                  </div>

                </div>
                <div className="row p-3">
                  <div className="col">
                  </div>
                </div>

              </div>

            </div>

        <div className="col"></div>
      </div>
    </div>


    </>


  );
};

export default Cards;
