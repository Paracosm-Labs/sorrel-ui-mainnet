import logo from './logo.svg';
import './App.css';
import NavMenu from './components/navmenu';
import AIASupport from './components/aia-support';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Home from './pages/home';
import Cards from './pages/cards';
import Bridge from './pages/bridge';
import Addons from './pages/addons';
import React  from 'react';
import Accounts from './pages/depository';
import Delegator from './pages/delegator';
import Vaults from './pages/vaults';


function App() {
  return (
    <>

    <Router>

      <NavMenu />
      <Routes>
        {/* <Route path = "/home" element={<Home/>} /> */}
        <Route path = "/accounts" element={<Accounts/>} />
        <Route path = "/cards" element={<Cards/>} />
        <Route path = "/vaults" element={<Delegator/>} />
        <Route path = "/vaultsx" element={<Vaults/>} />
        <Route path = "/bridge" element={<Bridge/>} />
        <Route path = "/addons" element={<Addons/>} />
        <Route path = "*" element={<Accounts/>} />
      </Routes>

    </Router>
    <AIASupport></AIASupport>
    </>
  );
}

export default App;
