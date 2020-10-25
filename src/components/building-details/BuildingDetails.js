import React, { useEffect, useState } from 'react';
import './BuildingDetails.css';
import countries from '../../data/countriesList.json';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { useDispatch, useSelector } from "react-redux";
import actions from '../../actions/actions';
import { Guid } from 'js-guid';
import { useToasts } from 'react-toast-notifications';

function BuildingDetails() {
    const [building, setBuilding] = useState({ name : '',location: { id: '-1' } });
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState(null);
    const buildings = useSelector((state) => state.buildings);
    const user = useSelector((state) => state.user);
    const params = useParams();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    useEffect(() => {
        if(!mode)
        {
            loadBuilding();
        }
     
    }, [building]);

    useEffect(() => {
        loadBuilding();
    },[ params.buildingId]);

    const loadBuilding = () => {
        if (params.buildingId == 0) {
        setMode('CREATE');
        setBuilding({ name : '',location: { id: '-1' } });
        }else {
            setMode('Edit');
            setIsLoading(true);
            setTimeout(() => {
                const currentBuilding = buildings.find((o) => o.id == params.buildingId);
                setBuilding(currentBuilding ? currentBuilding : {});
                setIsLoading(false);
            }, 1000);
        }
    }

    const saveBuilding = () => { 
        let data = building;
        if(mode =='CREATE'){
            data = {
                "id": Guid.newGuid(),
                "name": building.name,
                "location": building.location
            }
            const userData =  { ...user, buildings: [...user.buildings, data] };
            dispatch(actions.ADD_BUILDING(data));
            dispatch(actions.SET_USER(userData));
            addToast('Building Added Successfully ....', {
                appearance: 'success',
                autoDismiss: true,
              })
        }else{
            data = {
                "id": params.buildingId,
                "name": building.name,
                "location": countries.find((o)=> o.id == building.location.id)
            }
            const userObj ={...user}; 
             const userBuildingDetails = userObj.buildings.find((o)=> o.id == data.id );
            userBuildingDetails.name = data.name;
            userBuildingDetails.location = data.location.id;
            dispatch(actions.EDIT_BUILDING(data));
            dispatch(actions.SET_USER(userObj));
            addToast('Building Updated Successfully ....', {
                appearance: 'success',
                autoDismiss: true,
              })
        }
      
    }

    const handleLocationChange = (event)=>{
        const location = countries.find((o)=> o.id == event.target.value);
        setBuilding({...building, location:location});
    }

    return (

        <div className="BuildingDetails">
            {isLoading ? (

                <Spinner></Spinner>

            ) : (
                    <div>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{mode ==`CREATE`?`New Building`:`Edit Building Details`}</h1>
                        </div>
                        <div className="pt-3 pb-2 mb-3 border-bottom">
                            <form className="row">

                                <div className="form-group col-md-4">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" id="name"
                                        value={building.name} 
                                        onChange={(event)=>setBuilding({...building, name:event.target.value})}/>

                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="location">Location</label>
                                    <select className="form-control" id="location" 
                                    value={building.location.id}
                                     onChange={handleLocationChange}
                                    >
                                        <option key='0' value='-1' ></option>
                                        {countries.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}

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
