import React, { useEffect, useState} from 'react';
import './BuildingDetails.css';
import countries from '../../data/countriesList.json';
import buildings from '../../data/buildings.json';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

function BuildingDetails() {
    const [building, setBuilding] = useState({location:{id:'-1'}});
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
   
    useEffect(() => {
        loadBuilding();
    }, building);

    useEffect(() => {
        loadBuilding();
    }, params.buildingId);

    const loadBuilding =()=>{
        setIsLoading(true);
      setTimeout(() => {
        const currentBuilding = buildings.find((o)=> o.id == params.buildingId);
        setBuilding(currentBuilding?currentBuilding:{});
        setIsLoading(false);
      }, 1000);      
    }

    const saveBuilding = ()=>{}

    return (
        
        <div className="BuildingDetails">
            {isLoading ? (
         
            <Spinner></Spinner>
        
        ) :(
            <div>
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
                        <select className="form-control" id="location" value={building.location.id}
                             >
                            <option key='0' value='-1' ></option>
                            {countries.map((country) => <option key={country.id}  value={country.id}>{country.name}</option>)}

                        </select>
                    </div>
                    <div className="col-md-4 filter">
                        <button type="button" className="btn btn-sm btn-primary" onClick={saveBuilding}>Save</button>
                    </div>


                </form>

            </div>
        
       </div>)}

       </div>
    );
}

export default BuildingDetails;
