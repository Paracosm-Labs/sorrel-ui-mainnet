import React from 'react';
import { useEffect, useState } from "react";
import { Row, Col, ProgressBar } from 'react-bootstrap';
import walletPublisher from '../publishers/wallet';
import { DepositoryOwnerAddress } from "../utils/contractAddress";
import { formatM } from '../utils/currencyFormatter';

const SharedResources = () => {
  const [resourceBalance, setResourceBalance] = useState(0);

  const [energyBalance, setEnergyBalance] = useState(0);
  const [energyUsed, setEnergyUsed] = useState(0);

  const [bandwidthBalance, setBandwidthBalance] = useState(0);
  const [bandwidthAvail, setBandwidthAvail] = useState(0);

  const [energyDiff, setEnergyDiff] = useState(0);
  const [bandwidthDiff, setBandwidthDiff] = useState(0);

  const [energyRatio, setEnergyRatio] = useState(0);
  const [bandwidthRatio, setBandwidthRatio] = useState(0);



  useEffect(() => {
    walletPublisher.attach(updateSorrelResources);
      return () => {
          console.log("Unmounting Shared Resources");
          walletPublisher.detach(updateSorrelResources);
      }
  }, []);

  //tried something here..
  const updateSorrelResources = async (resourceData) => {
      let resourceBalance = await window.tronWeb.trx.getAccountResources(DepositoryOwnerAddress);
      let bandwithBal = await window.tronWeb.trx.getBandwidth(DepositoryOwnerAddress);
      setEnergyBalance(resourceBalance.EnergyLimit);
      setEnergyUsed(resourceBalance.EnergyUsed);

      setBandwidthBalance(bandwithBal);
      setBandwidthAvail(resourceBalance.NetLimit);

      setEnergyDiff(resourceBalance.EnergyLimit - resourceBalance.EnergyUsed);

      setEnergyRatio((resourceBalance.EnergyLimit - resourceBalance.EnergyUsed) / resourceBalance.EnergyLimit * 100);
      setBandwidthRatio(bandwithBal / resourceBalance.NetLimit * 100);
};


  return (
    <>
        <div className="col-12 mt-3 text-center shared-resources">
            <h6>Shared Resources</h6>

            <Row className="text-center">
              <div className="col"></div>
              <Col xs={4} md={3}>
                <span className="progress mt-3 mb-2">
                  <span className="progress-bar bg-energy-guage" role="progressbar" aria-valuenow={energyRatio} aria-valuemin={0} aria-valuemax={100} style={{width:`${energyRatio}%`}}>
                  </span>
                  
                </span><p className="text-xs text-muted">Energy: {formatM(energyRatio)}% | <span className="dnone"> {energyDiff} / {energyBalance}</span></p>
              </Col>
              <Col xs={1}>
              <i className="fa-solid fa-bolt fa-beat" data-toggle="tooltip" title="Enjoy Energy Free transactions when available!"></i>
              </Col>
              <Col xs={4}  md={3}>
                <span className="progress mt-3 mb-2">
                  <span className="progress-bar bg-bandwidth-guage" role="progressbar" aria-valuenow={bandwidthRatio} aria-valuemin={0} aria-valuemax={100} style={{width:`${bandwidthRatio}%`}}>
                  </span>
                  
                </span><p className="text-xs text-muted">Bandwidth: {formatM(bandwidthRatio)}% | <span className="dnone"> {bandwidthBalance} / {bandwidthAvail}</span></p>
              </Col>
              <div className="col"></div>
            </Row>

        </div>
    </>
  );
};

export default SharedResources;