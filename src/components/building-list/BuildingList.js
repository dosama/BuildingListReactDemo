import React, { useEffect, useState } from 'react';
import './BuildingList.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import Spinner from '../spinner/Spinner';
import {  useDispatch, useSelector } from "react-redux";
import actions from '../../actions/actions';
import _ from 'lodash';
import { useToasts } from 'react-toast-notifications';

function BuildingList() {

  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
    useEffect(()=>{
      if(user)
      {
        setIsLoading(true);
        setTimeout(() => {        
          setBuildings(user ? user.buildings : []);
          setIsLoading(false);
        }, 1000);
      } 
    },[user]);

    const removeBuilding = (buildingId)=>{
    const userObj ={...user}; 
    _.remove(userObj.buildings, (o)=> o.id ==buildingId );
    dispatch(actions.RREMOVE_BUILDING(buildingId));
    dispatch(actions.SET_USER(userObj));  
    addToast('Building Removed Successfully ....', {
      appearance: 'success',
      autoDismiss: true,
    })  
  
    }
  return (
    <div className="BuildingList">
      <nav id="sidebarMenu" className="d-md-block bg-light sidebar collapse">
        <div>
          <h5 className="card-header">Buildings</h5>
          {isLoading ? (
            <div className="position-sticky">
              <Spinner></Spinner>
            </div>
          ) : (
              <div className="card">
                <div className="card-body p-0">
                  <ul className="nav flex-column">
                    {buildings.map(
                      (building) =>
                        <li key={building.id}>
                          <div className="row col-md-12 p-2">
                            <div className="col-md-8 mt-1" >
                              <Link key={building.id} to={`/buildingMap/${building.id}`}> {building.name} </Link>
                            </div>
                            <div className="col-md-2">
                              <Link to={`/buildingDetails/${building.id}`}>
                                <button className="btn btn-icon">
                                  <span className="feather"><Icon.Edit /></span>
                                </button>
                              </Link>
                            </div>
                            <div className="col-md-2">
                              <button className="btn btn-icon"  onClick={()=>removeBuilding(building.id)}>
                                <span className="feather"><Icon.Trash /></span>
                              </button>
                            </div>
                          </div>
                        </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
        </div>
        <Link to={`/buildingDetails/0`}>
        <button type="button" disabled={!user} className="col-md-12 btn btn-sm btn-primary">Add Building</button>
        </Link>
      
      </nav>
    </div>
  );
}

export default BuildingList;
