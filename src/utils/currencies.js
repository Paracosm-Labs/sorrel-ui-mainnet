import gStableContract from "../contracts/gStableContract";


import usddImg from "../img/usdd.png";
import usdtImg from "../img/usdt.png";
import usdcImg from "../img/usdc.png";
import tusdImg from "../img/tusd.png";

import ttddImg from "../img/gttd.png";
import xcddImg from "../img/gxcd.png";
import bbddImg from "../img/gbbd.png";
import jmddImg from "../img/gjmd.png";
import awgdImg from "../img/gawg.png";
import dopImg from "../img/gdop.png";
import bsdImg from "../img/gbsd.png";
import kydImg from "../img/gkyd.png";
import cupImg from "../img/gcup.png";
import htgImg from "../img/ghtg.png";
import eurImg from "../img/geur.png";
import gbpImg from "../img/ggbp.png";
import cnhImg from "../img/gcnh.png";
import hkdImg from "../img/ghkd.png";
import sgdImg from "../img/gsgd.png";

import cadImg from "../img/gcad.png";
import audImg from "../img/gaud.png";
import aedImg from "../img/gaed.png";
import ghsImg from "../img/gghs.png";
import copImg from "../img/gcop.png";
import zarImg from "../img/gzar.png";
import ngnImg from "../img/gngn.png";
import kesImg from "../img/gkes.png";
import inrImg from "../img/ginr.png";
import rubImg from "../img/grub.png";
import uahImg from "../img/guah.png";
import gelImg from "../img/ggel.png";

import thbImg from "../img/gthb.png";
import idrImg from "../img/gidr.png";
import jpyImg from "../img/gjpy.png";
import chfImg from "../img/gchf.png";
import krwImg from "../img/gkrw.png";
import tryImg from "../img/gtry.png";
import ilsImg from "../img/gils.png";
import brlImg from "../img/gbrl.png";
import nprImg from "../img/gnpr.png";
import omrImg from "../img/gomr.png";
import myrImg from "../img/gmyr.png";

class Currency {
  id = 0;
  key = null;
  label = null;
  text = null;
  icon = null;
  symbol = null;
  gStableAddress = null;
  gStableContract_ = null;
  isStableCoin = false;
  constructor(
    _id,
    _key,
    _label,
    _text,
    _icon,
    _symbol,
    _gStableAddress,
    _isStableCoin = false,
  ) {
    this.id = _id;
    this.key = _key;
    this.label = _label;
    this.text = _text;
    this.icon = _icon;
    this.symbol = _symbol;
    this.gStableAddress = _gStableAddress;
    this.isStableCoin = _isStableCoin;
  }
  gStableContract = async () => {
    if (!this.gStableContract_) {
      console.log("initializing gStableContract");
      const contract_ = new gStableContract(this.gStableAddress);
      this.gStableContract_ = await contract_.init();
    }
    return this.gStableContract_;
  };
}

const CurrencyList = {
  USDD: new Currency(
    1001,
    "USDD",
    "USDD",
    "Decentralized USD",
    usddImg,
     "$" /*Currency Symbol*/,
    "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn" /*USDDStableAddress Mainnet*/,
    true,
  ),
  USDT: new Currency(
    1002,
    "USDT",
    "USDT",
    "Tether USD",
    usdtImg,
    "$" /*Currency Symbol*/,
    "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t" /*USDTStableAddress Mainnet*/,
    true,
  ),
  USDC: new Currency(
    1003,
    "USDC",
    "USDC",
    "Circle USD",
    usdcImg,
    "$" /*Currency Symbol*/,
    true,
    "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8" /*USDCStableAddress Mainnet*/,
  ),
  // TUSD: new Currency(
  //   1004,
  //   "TUSD",
  //   "TUSD",
  //   "True USD",
  //   tusdImg,
  //   "$" /*Currency Symbol*/,
  //   true,
  //   "TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4" /*TUSDStableAddress Mainnet*/,
  // ),
  TTD: new Currency(
    1,
    "TTD",
    "gTTD",
    "Trinidad & Tobago Dollar",
    ttddImg,
    "TT$" /*Currency Symbol*/,
    "TTyTrwsnsi5Fr6YjhPsqc3cbTLqPALTe4U" /*gStableAddress mainnet*/,
  ),
  XCD: new Currency(
    2,
    "XCD",
    "gXCD",
    "Eastern Caribbean Dollar",
    xcddImg,
    "EC$" /*Currency Symbol*/,
    "TBovdWbXNQEhERaRTB7MdY2h1Ykchji1Xw" /*gStableAddress mainnet*/,
  ),
  BBD: new Currency(
    3,
    "BBD",
    "gBBD",
    "Barbadian Dollar",
    bbddImg,
    "BB$" /*Currency Symbol*/,
    "TGsz1q1ryn5DLZngM2xxek3jN1X53qW7vZ" /*gStableAddress mainnet*/,
  ),
  JMD: new Currency(
    4,
    "JMD",
    "gJMD",
    "Jamaican Dollar",
    jmddImg,
    "JM$" /*Currency Symbol*/,
    "TPoyDSNF7F2h5ZTRh25ypXvtn5hJfjaZ2K" /*gStableAddress mainnet*/,
  ),
  AWG: new Currency(
    5,
    "AWG",
    "gAWG",
    "Aruban Florin",
    awgdImg,
    "ƒ" /*Currency Symbol*/,
    "TJ1wyr39g79qStW8GhCkexz3DHXs4DcBCq" /*gStableAddress mainnet*/,
  ),
  BSD: new Currency(
    6,
    "BSD",
    "gBSD",
    "Bahamian Dollar",
    bsdImg,
    "B$" /*Currency Symbol*/,
    "THo47joX34Ms3TAFNdpnovno6a7JsP4x9A" /*gStableAddress mainnet*/,
  ),
  KYD: new Currency(
    7,
    "KYD",
    "gKYD",
    "Cayman Islands Dollar",
    kydImg,
    "CI$" /*Currency Symbol*/,
    "TVP6k4U37d2W9r86fVKV4N4fTgiCJVLMfg" /*gStableAddress mainnet*/,
  ),
  DOP: new Currency(
    8,
    "DOP",
    "gDOP",
    "Dominican Peso",
    dopImg,
    "₱" /*Currency Symbol*/,
    "TAa3RAnMh2ppJdczHsVrdRcvD9bELXS5Pj" /*gStableAddress mainnet*/,
  ),
  CUP: new Currency(
    9,
    "CUP",
    "gCUP",
    "Cuban Peso",
    cupImg,
    "₱" /*Currency Symbol*/,
    "TTmfn4Bpkr3wn3nWJEvotWAwpFK32CXZjQ" /*gStableAddress mainnet*/,
  ),
  HTG: new Currency(
    10,
    "HTG",
    "gHTG",
    "Haitian Gourde",
    htgImg,
    "G₵" /*Currency Symbol*/,
    "TNwd7QazM32hS26JceuLygT6JbpQJAd8N1" /*gStableAddress mainnet*/,
  ),
  EUR: new Currency(
    11,
    "EUR",
    "gEUR",
    "Euro",
    eurImg,
    "€" /*Currency Symbol*/,
    "TQfpTaXasX8dVXFkgEneYDTBemk1QP4MAV" /*gStableAddress mainnet*/,
  ),
  GBP: new Currency(
    12,
    "GBP",
    "gGBP",
    "British Pound",
    gbpImg,
    "£" /*Currency Symbol*/,
    "TWR3mfiQRopJ8xFVbZALVE9DnGbjaoJKgX" /*gStableAddress mainnet*/,
  ),
  // CNH: new Currency(
  //   13,
  //   "CNH",
  //   "gCNH",
  //   "Chinese Offshore Yuan",
  //   cnhImg,
  //   "¥" /*Currency Symbol*/,
  //   "---" /*gStableAddress mainnet*/,
  // ),
  // HKD: new Currency(
  //   14,
  //   "HKD",
  //   "gHKD",
  //   "Hong Kong Dollar",
  //   hkdImg,
  //   "HK$" /*Currency Symbol*/,
 //   "---" /*gStableAddress mainnet*/,
  // ),
//   SGD: new Currency(
//     15,
//     "SGD",
//     "gSGD",
//     "Singaporean Dollar",
//     sgdImg,
//     "SG$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   THB: new Currency(
//     16,
//     "THB",
//     "gTHB",
//     "Thai Baht",
//     thbImg,
//     "฿" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   IDR: new Currency(
//     17,
//     "IDR",
//     "gIDR",
//     "Indonesian Rupee",
//     idrImg,
//     "Rp$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   INR: new Currency(
//     18,
//     "INR",
//     "gINR",
//     "Indian Rupee",
//     inrImg,
//     "₹" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   CAD: new Currency(
//     19,
//     "CAD",
//     "gCAD",
//     "Canadian Dollar",
//     cadImg,
//     "CA$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   AUD: new Currency(
//     20,
//     "AUD",
//     "gAUD",
//     "Australian Dollar",
//     audImg,
//     "A$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   JPY: new Currency(
//     21,
//     "JPY",
//     "gJPY",
//     "Japanese Yen",
//     jpyImg,
//     "¥" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   CHF: new Currency(
//     23,
//     "CHF",
//     "gCHF",
//     "Swiss Franc",
//     chfImg,
//     "₣" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   KRW: new Currency(
//     24,
//     "KRW",
//     "gKRW",
//     "South Korean Won",
//     krwImg,
//     "₩" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   TRY: new Currency(
//     26,
//     "TRY",
//     "gTRY",
//     "Turkish Lira",
//     tryImg,
//     "₺" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   ILS: new Currency(
//     27,
//     "ILS",
//     "gILS",
//     "Israeli Shekel",
//     ilsImg,
//     "₪" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   ZAR: new Currency(
//     30,
//     "ZAR",
//     "gZAR",
//     "South African Rand",
//     zarImg,
//     "R" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   NGN: new Currency(
//     31,
//     "NGN",
//     "gNGN",
//     "Nigerian Naira",
//     ngnImg,
//     "₦" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   KES: new Currency(
//     32,
//     "KES",
//     "gKES",
//     "Kenyan Shilling",
//     kesImg,
//     "KSh" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   RUB: new Currency(
//     33,
//     "RUB",
//     "gRUB",
//     "Russian Ruble",
//     rubImg,
//     "₽" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   UAH: new Currency(
//     34,
//     "UAH",
//     "gUAH",
//     "Ukranian Hyrvnia",
//     uahImg,
//     "₴" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   GEL: new Currency(
//     35,
//     "GEL",
//     "gGEL",
//     "Georgian Lari",
//     gelImg,
//     "₾" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   AED: new Currency(
//     40,
//     "AED",
//     "gAED",
//     "UAE Dirham",
//     aedImg,
//     "د.إ" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   GHS: new Currency(
//     41,
//     "GHS",
//     "gGHS",
//     "Ghanaian Cedi",
//     ghsImg,
//     "GH₵" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   COP: new Currency(
//     44,
//     "COP",
//     "gCOP",
//     "Colombian Peso",
//     copImg,
//     "$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   BRL: new Currency(
//     45,
//     "BRL",
//     "gBRL",
//     "Brazillian Real",
//     brlImg,
//     "R$" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   NPR: new Currency(
//     46,
//     "NPR",
//     "gNPR",
//     "Nepali Rupee",
//     nprImg,
//     "रू" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   OMR: new Currency(
//     47,
//     "OMR",
//     "gOMR",
//     "Omani Rial",
//     omrImg,
//     "ر.ع." /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),
//   MYR: new Currency(
//     48,
//     "MYR",
//     "gMYR",
//     "Malaysian Ringgit",
//     myrImg,
//     "RM" /*Currency Symbol*/,
//   "---" /*gStableAddress mainnet*/,
//   ),

};

export const getCurrencies = () => {
  return Object.values(CurrencyList);
};

export const getCurrency = (currKey) => {
  return CurrencyList[currKey];
};

export const getCurrencyById = (id) => {
  let list = getCurrencies().filter(curr => curr.id == id);
  if(list.length > 0){
    return list[0];
  }
  return null;
};
