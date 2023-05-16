// import OffcanvasTxnHistory from "../components/offcanvas-txnhistory";
// import gTTDImg from "../img/gttd.png";
// import USDDImg from "../img/usdd.png";
// import gEURImg from "../img/geur.png";
// import gGBPImg from "../img/ggbp.png";
// import gGELImg from "../img/ggel.png";

// const currencyAcc = () => {
//   return (
//     <>
 
//  <div className="container justify-content-center">

//         <div className="card-header d-none d-lg-block">
//           <div className="row mt-4 mx-3 pt-3 pe-4">
//             <div className="col text-center">
//               Asset
//             </div>
//             <div className="col text-center">
//               APR
//             </div>
//             <div className="col text-center">
//               Savings Balance
//             </div>
//             <div className="col text-center">
//               Wallet Balance
//             </div>
//             <div className="col text-center">

//             </div>
//           </div>
//         </div>

// <div className="accordion accordion-flush mt-3" id="accordionFlushExample">
//   <div className="accordion-item currency-acc mt-3">
//     <h2 className="accordion-header" id="flush-headingOne">
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//           <div className="container row mx-1 pt-3">
//             <div className="col">
//               <img
//                 src={gTTDImg}
//                 alt="gStable"
//                 width="32"
//                 height="32"
//                 className="flex-shrink-0"
//               />
//               <div className="currency-name">
//                 <b>gTTD</b>
//                 <p className="small">Trinidad & Tobago Dollar</p>
//               </div>
//             </div>
//             <div className="col text-center apr-info">
//               <b className="d-lg-none">APR</b>
//               <h6>2.69%</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Savings Balance</b>
//               <h6>$444,326.88</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Wallet Balance</b>
//               <h6>$48,006.98</h6>
//             </div>
//             <div className="col text-center">3 Accounts</div>
//           </div>
//       </button>
//     </h2>
//     <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne">
//       <div className="accordion-body owned-accounts">
//         <div className="row mt-1 border-2 border-bottom">
//           <div className="col text-left">Primary Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$44,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>
//         <div className="row mt-3 border-2 border-bottom">
//           <div className="col text-left">Travel Fund Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$4,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>
//         <div className="row mt-3">
//           <div className="col text-left">Groceries & Food Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="accordion-item currency-acc mt-3">
//     <h2 className="accordion-header" id="flush-headingTwo">
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
//           <div className="container row mx-1 pt-3">
//             <div className="col">
//               <img
//                 src={gGELImg}
//                 alt="gStable"
//                 width="32"
//                 height="32"
//                 className="flex-shrink-0"
//               />
//               <div className="currency-name">
//                 <b>gGEL</b>
//                 <p className="small">Georgian Lari</p>
//               </div>
//             </div>
//             <div className="col text-center apr-info">
//               <b className="d-lg-none">APR</b>
//               <h6>2.69%</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Savings Balance</b>
//               <h6>$444,326.88</h6>
//             </div>

//             <div className="col text-center">
//               <b className="d-lg-none">Wallet Balance</b>
//               <h6>$48,006.98</h6>
//             </div>
//             <div className="col text-center">1 Account</div>
//           </div>
//       </button>
//     </h2>
//     <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo">
//       <div className="accordion-body owned-accounts">

//         <div className="row mt-3 border-2 border-bottom">
//           <div className="col text-left">Primary Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$44,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>

//       </div>
//     </div>
//   </div>
//   <div className="accordion-item currency-acc mt-3">
//     <h2 className="accordion-header" id="flush-headingThree">
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
//           <div className="container row mx-1 pt-3">
//             <div className="col">
//               <img
//                 src={USDDImg}
//                 alt="gStable"
//                 width="32"
//                 height="32"
//                 className="flex-shrink-0"
//               />
//               <div className="currency-name">
//                 <b>USDD</b>
//                 <p className="small">Decentralized US Dollar</p>
//               </div>
//             </div>
//             <div className="col text-center apr-info">
//               <b className="d-lg-none">APR</b>
//               <h6>2.69%</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Savings Balance</b>
//               <h6>$444,326.88</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Wallet Balance</b>
//               <h6>$48,006.98</h6>
//             </div>
//             <div className="col text-center">1 Account</div>
//           </div>
//       </button>
//     </h2>
//     <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree">
//       <div className="accordion-body owned-accounts">

//         <div className="row mt-3 border-2 border-bottom">
//           <div className="col text-left">Primary Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$44,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>

//       </div>
//     </div>
//   </div>
//   <div className="accordion-item currency-acc mt-3">
//     <h2 className="accordion-header" id="flush-headingFour">
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
//           <div className="container row mx-1 pt-3">
//             <div className="col">
//               <img
//                 src={gEURImg}
//                 alt="gStable"
//                 width="32"
//                 height="32"
//                 className="flex-shrink-0"
//               />
//               <div className="currency-name">
//                 <b>gEUR</b>
//                 <p className="small">Euro</p>
//               </div>
//             </div>
//             <div className="col text-center apr-info">
//               <b className="d-lg-none">APR</b>
//               <h6>2.69%</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Savings Balance</b>
//               <h6>$444,326.88</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Wallet Balance</b>
//               <h6>$48,006.98</h6>
//             </div>
//             <div className="col text-center">1 Account</div>
//           </div>
//       </button>
//     </h2>
//     <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour">
//       <div className="accordion-body owned-accounts">

//         <div className="row mt-3 border-2 border-bottom">
//           <div className="col text-left">Primary Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$44,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>

//       </div>
//     </div>
//   </div>
//   <div className="accordion-item currency-acc mt-3">
//     <h2 className="accordion-header" id="flush-headingFive">
//       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
//           <div className="container row mx-1 pt-3">
//             <div className="col">
//               <img
//                 src={gGBPImg}
//                 alt="gStable"
//                 width="32"
//                 height="32"
//                 className="flex-shrink-0"
//               />
//               <div className="currency-name">
//                 <b>gGBP</b>
//                 <p className="small">British Pound</p>
//               </div>
//             </div>
//             <div className="col text-center apr-info">
//               <b className="d-lg-none">APR</b>
//               <h6>2.69%</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Savings Balance</b>
//               <h6>$444,326.88</h6>
//             </div>
//             <div className="col text-center">
//               <b className="d-lg-none">Wallet Balance</b>
//               <h6>$48,006.98</h6>
//             </div>
//             <div className="col text-center">1 Account</div>
//           </div>
//       </button>
//     </h2>
//     <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive">
//       <div className="accordion-body owned-accounts">

//         <div className="row mt-3 border-2 border-bottom">
//           <div className="col text-left">Primary Account</div>
//           <div className="col"></div>
//           <div className="col text-center">$44,326.88</div>
//           <div className="col"></div>
//           <div className="col"><button className="btn btn-outline-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTxnHistory" aria-controls="offcanvasTxnHistory">Transaction History</button></div>
//         </div>

//       </div>
//     </div>
//   </div>
// </div>
// <OffcanvasTxnHistory></OffcanvasTxnHistory>
// </div>



//     </>


//   );
// };

// export default currencyAcc;
