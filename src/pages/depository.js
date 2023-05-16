import React from 'react';
import CurrencyAccounts from "../components/currency-accounts";
import TransactionHistory from "../components/txnhistory";
import OffcanvasExchange from "../components/offcanvas-exchange";
import OffcanvasDeposit from "../components/offcanvas-deposit";
import OffcanvasWithdraw from "../components/offcanvas-withdraw";
import OffcanvasTransfer from "../components/offcanvas-transfer";
import BalanceCardUSDD from "../components/balancesUSDD";
import ConvertHistory from '../components/convertHistory';
import SharedResources from '../components/shared-resources';

const Depository = () => {
  return (
    <>
      <div className="d-flex bg-sorrel pb-8">
        <div className="container accounts-info content">

          <div className="row mt-5 mx-3">
            <BalanceCardUSDD></BalanceCardUSDD>
            <SharedResources></SharedResources>
          </div>

        </div>
      </div>
      <div className="container accounts content">
        <div className="row mt-3 mx-3">
          <div className="col md-6 xs-12 justify-content-start">
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDeposit">
              <i className="fa-solid fa-cloud-arrow-down" data-toggle="tooltip" title="Deposit assets to your Sorrel Account"></i>&nbsp;
              Deposit
            </button>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithdraw">
              <i className="fa-solid fa-arrow-up-right-from-square" data-toggle="tooltip" title="Withdraw assets from Sorrel to your Wallet"></i>&nbsp;
              Withdraw
            </button>
          </div>

          <div className="col md-6 xs-12">
            <span className=" float-end">
            
              <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExchange" aria-controls="offcanvasExchange">
                <i className="fa-solid fa-bolt fa-beat" data-toggle="tooltip" title="Enjoy Energy Free transactions when available!"></i>
                <i className="fa-solid fa-repeat" data-toggle="tooltip" title="Convert your gStables to another easily"></i>&nbsp;
                Convert
              </button>

              <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTransfer" aria-controls="offcanvasTransfer">
                <i className="fa-solid fa-bolt fa-beat" data-toggle="tooltip" title="Enjoy Energy Free transactions when available!"></i>
                <i className="fa-solid fa-arrow-right-from-bracket" data-toggle="tooltip" title="Transfer assets between Sorrel Members"></i>&nbsp;
                Transfer
              </button>
            </span>
          </div>
        </div>
        <div className="row mt-3 mx-3">
        <CurrencyAccounts></CurrencyAccounts>
        </div>
        <div className="row mt-3 mx-3">
          <TransactionHistory></TransactionHistory>
        </div>
        <div className="row mt-3 mx-3">
          <ConvertHistory></ConvertHistory>
        </div>        
      </div>
      <OffcanvasExchange></OffcanvasExchange>
      <OffcanvasDeposit></OffcanvasDeposit>
      <OffcanvasWithdraw></OffcanvasWithdraw>
      <OffcanvasTransfer></OffcanvasTransfer>
    </>
  );
};

export default Depository;
