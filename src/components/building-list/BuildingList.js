import React, { useState } from 'react';
import './BuildingList.css';
import userSearchEvent from '../../events/user-search-event';
import data from '../../data/users.json';

function BuildingList() {

  const [buildings, setBuildings] = useState([]);

  userSearchEvent
    .on('userSearchCompleted', selectedUserValue => {
      const users = data;
      const selectedUser = selectedUserValue ? users.find(user => user.id == selectedUserValue) : null;
      setBuildings(selectedUser ? selectedUser.buildings : []);

    });

  return (
    <div className="BuildingList">
      <nav id="sidebarMenu" className="d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            {buildings.map(
              (building) =>
                <li className="nav-item" key={building.id}>
                  <a className="nav-link active" aria-current="page" href="#">
                    {building.name}
                  </a>
                </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default BuildingList;
