import React, { useState } from 'react';
import './BuildingList.css';
import userSearchEvent from '../../events/user-search-event';
import users from '../../data/users.json';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';


function BuildingList() {

  const [buildings, setBuildings] = useState([]);

  userSearchEvent
    .on('userSearchCompleted', selectedUserValue => {

      const selectedUser = selectedUserValue ? users.find(user => user.id == selectedUserValue) : null;
      setBuildings(selectedUser ? selectedUser.buildings : []);

    });

  return (
    <div className="BuildingList">
      <nav id="sidebarMenu" className="d-md-block bg-light sidebar collapse">
      <div className="position-sticky">
      <div className="card">
  <h5 className="card-header">Buildings</h5>
  <div className="card-body p-0">
          <ul className="nav flex-column">
            {buildings.map(
              (building) =>
                <li key={building.id}>
                  <div className="row col-md-12">
                    <div className="col-md-8 mt-2" >
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
</div>

      </nav>
    </div>
  );
}

export default BuildingList;
