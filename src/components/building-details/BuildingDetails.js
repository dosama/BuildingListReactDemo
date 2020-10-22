import React, { useEffect, useState } from 'react';
import './BuildingDetails.css';



function BuildingDetails() {
    const [building, setBuilding] = useState({});
    const [countries, setCountries] = useState([]);
   
    useEffect(() => {
       
    }, [building]);

    const saveBuilding = ()=>{}

    return (
        <div className="BuildingDetails">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Building Details</h1>
            </div>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <form className="row">

                    <div className="form-group col-md-4">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" id="name"
                            value={building.name} />
                     
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="location">Location</label>
                        <select className="form-control" id="location" value={building.location}
                             >
                            <option key='0' value='-1' ></option>
                            {countries.map((promo) => <option key={promo.id} value={promo.id}>{promo.code}</option>)}

                        </select>
                    </div>
                    <div className="col-md-4 filter">
                        <button type="button" className="btn btn-sm btn-primary" onClick={saveBuilding}>Save</button>
                    </div>


                </form>

            </div>
        </div>

    );
}

export default BuildingDetails;
