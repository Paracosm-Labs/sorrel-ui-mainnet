import React  from 'react';
import { addonsData } from "../components/addonsData";
import AddonItem from '../components/addons';


const Addons = () => {
  return (
    <>
    <div className="d-flex bg-sorrel pb-8">
      <div className="container content">
          <div className="row mt-3">
            <div className="col text-center">
              <h1>Addons</h1>
              <p>Use your gStables to crowdfund us to build addons that enhances everyone's Sorrel experience.</p>
            </div>
          </div>

      </div>
    </div>

    <div className="container addons content mb-5">
      <div className="row mt-n2">
        <div className="col"></div>
        <div className="col-md-8">
            {addonsData.map((item, key) => (
              <AddonItem key={key} item={item} />
            ))}
        </div>
        <div className="col"></div>
      </div>
    </div>





    </>

  );
};

export default Addons;
