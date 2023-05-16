import React, { useEffect, useState } from 'react';
import convertPublisher from '../publishers/convert';
import ConvertHistoryItem from './convertHistoryItem';


const ConvertHistory = () => {
    const [trxs, setTrxs] = useState([]);
    useEffect(() => {
        convertPublisher.attach(updateTrxs);
        return () => {
            convertPublisher.detach(updateTrxs);
            console.log("Unmounting ConvertHistory");
        };
    }, []);

    const updateTrxs = (trxs) => {
        if(trxs && Array.isArray(trxs)){
            setTrxs(trxs.reverse());
        } else {
            console.error(`trxs ${trxs}`);
        }
    } 

    if(!trxs.length){
        return <></>;
    }

  return (
    <>
        <div className="row mt-2 transaction-history conversions">
            <h4 className="text-sorrel-green">Conversion</h4>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {trxs.map((trx,index) => <ConvertHistoryItem key={index} tx={trx}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  );
};

export default ConvertHistory;
