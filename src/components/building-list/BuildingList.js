import React, { useState } from 'react';
import './BuildingList.css';
import userSearchEvent from '../../events/user-search-event';
import users from '../../data/users.json';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import Spinner from '../spinner/Spinner';


function BuildingList() {

  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  userSearchEvent
    .on('userSearchCompleted', selectedUserValue => {
      setIsLoading(true);
      setTimeout(() => {
        const selectedUser = selectedUserValue ? users.find(user => user.id == selectedUserValue) : null;
        setBuildings(selectedUser ? selectedUser.buildings : []);
        setIsLoading(false);
      }, 1000);

    });


  return (
    <div className="BuildingList">
      <nav id="sidebarMenu" className="d-md-block bg-light sidebar collapse">
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
                            <button className="btn btn-icon">
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
      </nav>
    </div>
  );
}

export default BuildingList;
