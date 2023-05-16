import React, { useEffect, useState } from 'react';
import { getCurrencyById } from '../utils/currencies';
import { getDate } from '../utils/date';
import Web3Signer from '../utils/web3Signer';
import axios from 'axios';
import serverURL from '../utils/server';
import TransferComptroller from '../contracts/transferComptroller';


const TxnHistoryItem = ({tx}) => {
  let from  = window.tronLink.tronWeb.address.fromHex(tx.from);
  let to  = window.tronLink.tronWeb.address.fromHex(tx.to);
    const confirm = async () => {
        let signer = new Web3Signer();
        let sig = await signer.sign(tx);
        if(sig){
          axios.post(`${serverURL}/txn/execute`,{from, to , gStableId: tx.gStableId, value : tx.value, nonce : tx.nonce, txHash : sig.txHash, sig : sig.signedStr})
          .then(async(response) => {
            console.log(response);
          })``
          .catch((error) => {
            console.log(error);
          }); 
        }
    } 

    const cancel = async () => {
      let tc = new TransferComptroller();
      await tc.init();
      await tc.cancel(tx.from, tx.to,tx.gStableId, tx.value, tx.nonce);
    } 

    const getStatusJSX = (tx) => {
      switch (tx.status) {
        case 1: {
          let returnJSX = (<>
          <button type="button" className="btn btn-transfer-confirm btn-sm" style={{fontSize : ".8rem"}} onClick={confirm}>Confirm</button>
            <button type="button" className="btn btn-transfer-cancel btn-sm" style={{fontSize : ".8rem"}}  onClick={cancel}>Cancel</button>
            </>)
            if(window.tronLink.tronWeb.address.fromHex(tx.from).localeCompare(window.tronWeb.defaultAddress.base58) != 0) {
              returnJSX = <><span>Not yet confirmed...</span></>;
            }
            return returnJSX;
           }
         case 2:
          return (<><span className='text-sorrel-normal'>Cancelled</span></>)
          case 3:
            return (<><span className='text-danger'>Failed</span></>)
            case 4:
              return (<><span className='text-sorrel-green'>{getDate(tx.executedTime)}</span></>)                        
        default:
          <></>
          break;
      }
    }

    return (<tr className={tx.status} style={{fontSize : ".9rem"}}>
                <td>{from.localeCompare(window.tronWeb.defaultAddress.base58) == 0 ? 
                <><span className='text-sorrel-purple'><i className="fa-solid fa-share-from-square"></i></span> <span className="trx-address">{window.tronLink.tronWeb.address.fromHex(tx.to)}</span></> : 
                <><span className='text-sorrel-green'><i className="fa-solid fa-right-to-bracket fa-rotate-90"></i></span> <span className="trx-address">{window.tronLink.tronWeb.address.fromHex(tx.from)}</span></> }</td>
                <td><img src={getCurrencyById(tx.gStableId).icon}
                width="22"
                height="22"
                className="flex-shrink-0" /> {getCurrencyById(tx.gStableId).symbol}&nbsp;{tx.value}
                </td>
                <td>{getDate(tx.initiatedTime)}</td>
                <td>{getStatusJSX(tx)}</td>
            </tr>)
};

export default TxnHistoryItem;
