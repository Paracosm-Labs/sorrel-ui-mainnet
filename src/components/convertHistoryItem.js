import React, { useEffect, useState } from 'react';
import { getCurrencyById } from '../utils/currencies';
import { getDate } from '../utils/date';
import Web3Signer from '../utils/web3Signer';
import axios from 'axios';
import serverURL from '../utils/server';
import ConvertComptroller from '../contracts/convertComptroller';
import { gStableManagerContract } from '../contracts/gStableManagerContract';
import { formatM } from '../utils/currencyFormatter';


const ConvertHistoryItem = ({tx}) => {
  const [convertedVal, setConvertedVal] = useState(0);

  let hodler  = window.tronLink.tronWeb.address.fromHex(tx.hodler);
    const confirm = async () => {
        let signer = new Web3Signer();
        let sig = await signer.signConvert(tx);
        if(sig){
          axios.post(`${serverURL}/exc/execute`,{hodler, fromId : tx.fromId, fromTokens : tx.fromTokens, toId: tx.toId, nonce : tx.nonce, txHash : sig.txHash, sig : sig.signedStr})
          .then(async(response) => {
            console.log(response);
          })``
          .catch((error) => {
            console.log(error);
          }); 
        }
    } 

    const cancel = async () => {
      let cc = new ConvertComptroller();
      await cc.init();
      await cc.cancel(hodler, tx.fromId, tx.fromTokens, tx.toId, tx.nonce);
    } 

    const getStatusJSX = (tx) => {
      switch (tx.status) {
        case 1: {
          let returnJSX = (<>
          <button type="button" className="btn btn-convert-confirm btn-sm" style={{fontSize : ".8rem"}} onClick={confirm}>Confirm</button>
            <button type="button" className="btn btn-convert-cancel btn-sm" style={{fontSize : ".8rem"}}  onClick={cancel}>Cancel</button>
            </>)
            return returnJSX;
           }
         case 2:
          return (<><span className='text-sorrel-normal'>Cancelled</span></>)
          case 33:
            return (<><span className='text-danger'>Not enough balance!</span></>)
        default:
          return (<><span className='text-sorrel-green'>{getDate(tx.executedTime)}</span></>)
      }
    }

    const updateConvertedVal = async() => {
      debugger;
      let gsmc = await gStableManagerContract();
      let cSrc = await gsmc.getConversion(tx.fromId);
      let cDst = await gsmc.getConversion(tx.toId);
      setConvertedVal(tx.fromTokens * cDst/cSrc)
    }
    useEffect(() => {
      updateConvertedVal();  
      return () => {
        console.log("Unmounting ");
      };
    }, []);

    return (<tr className={tx.status} style={{fontSize : ".9rem"}}>
                <td style={{width : "10%"}}><img src={getCurrencyById(tx.fromId).icon}
                width="22"
                height="22"
                className="flex-shrink-0 mx-2" />{getCurrencyById(tx.fromId).symbol} {tx.fromTokens}</td>
                <td style={{width : "25%"}}>
                <span className='mx-1'><i className="fa-sharp fa-solid fa-arrow-right"></i></span>
                <img src={getCurrencyById(tx.toId).icon}
                width="22"
                height="22"
                className="flex-shrink-0 mx-2" /><span className="dnone"> ≈ {getCurrencyById(tx.toId).symbol} {formatM(convertedVal)} </span>
                </td>                
                <td>{getDate(tx.initiatedTime)}</td>
                <td>{getStatusJSX(tx)}</td>
            </tr>)
};

export default ConvertHistoryItem;
