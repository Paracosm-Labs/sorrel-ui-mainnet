import Web3 from "web3";
import TransferComptroller from "../contracts/transferComptroller";
import ConvertComptroller from "../contracts/convertComptroller";

class Web3Signer {
  web3 = null;
  constructor() {
    this.web3 = new Web3();
  }

  sign = async (tx) => {
    try {
        if (window.tronLink.ready) {
            const tronWeb = window.tronLink.tronWeb;
            try {
              let tc = new TransferComptroller();
              await tc.init();

              let from  = tronWeb.address.fromHex(tx.from);
              let to  = tronWeb.address.fromHex(tx.to);              

              const txHash = await tc.getTxHash(from, to, tx.gStableId, this.web3.utils.toWei(String(tx.value)), tx.nonce); 
              const trxFromContract2 = await tc.getTx(txHash);
              console.log(trxFromContract2);
              console.log(txHash);
              

              const signedStr = await tronWeb.trx.signMessageV2(txHash);
              console.log(signedStr);

              return {txHash, signedStr};

            } catch (e) {
                console.error(e);
            }
          }
    } catch (error) {
        console.error(error);
    }
    return null;
  };

  signConvert = async (tx) => {
    try {
        if (window.tronLink.ready) {
            const tronWeb = window.tronLink.tronWeb;
            try {
              let tc = new ConvertComptroller();
              await tc.init();

              let hodler  = tronWeb.address.fromHex(tx.hodler);
              let to  = tronWeb.address.fromHex(tx.to);              

              const txHash = await tc.getTxHash(hodler, tx.fromId, this.web3.utils.toWei(String(tx.fromTokens)), tx.toId, tx.nonce); 
              const trxFromContract2 = await tc.getTx(txHash);
              console.log(trxFromContract2);
              console.log(txHash);
              

              const signedStr = await tronWeb.trx.signMessageV2(txHash);
              console.log(signedStr);

              return {txHash, signedStr};

            } catch (e) {
                console.error(e);
            }
          }
    } catch (error) {
        console.error(error);
    }
    return null;
  };
 
}

export default Web3Signer;

