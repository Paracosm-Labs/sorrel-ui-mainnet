import React from 'react';
import SorrelLogo from "../img/sorrel-logo.png";
import goStablesLogo from "../img/gostables-logo.png";

const Welcome = () => {
        return <>
        <div className="no-currencies text-center">
                <img src={SorrelLogo}
                width="100"
                height="100"
                className="flex-shrink-0" />
            <h1>Welcome to Sorrel Banq!</h1>
            <h4>You don't seem to have any stablecoins yet.<br/>Get some testnet tokens via:</h4>
            <h3><br/>
            <a href="https://nile.gostables.org/faucets" target="_blank">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDeposit">
                <img src={goStablesLogo}
                width="55"
                height="55"
                className="flex-shrink-0" /><br/>
                  goStables Protocol <br/>
                  <i className="fa-solid fa-faucet-drip" data-toggle="tooltip" title="Get stablecoins to deposit to your Sorrel Account"></i>&nbsp;Faucets
                </button>
               </a>
            </h3>
        </div>
        </>
}

export default Welcome;