import React, {Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import BuildingList from './components/building-list/BuildingList';
import BuildingMap from './components/building-map/BuildingMap';
import BuildingDetails from './components/building-details/BuildingDetails';
import Home from './components/home/Home';
import { Route, Router, Switch } from 'react-router-dom';

function App() {
  return (

<div  className="App">
    <Header></Header>
<div className="container-fluid">
  <div className="row">
    <div className="col-md-3 col-lg-2">
   <BuildingList></BuildingList>
    </div>
   <div className="col-md-9 col-lg-10">
   <main>
   <Switch>
   <Route path="/" exact  ><Home></Home></Route>
   <Route path="/buildingMap/:buildingId"  ><BuildingMap></BuildingMap></Route>
   <Route path="/buildingDetails/:buildingId"  ><BuildingDetails></BuildingDetails></Route>
            </Switch>
       </main>
   </div>
  </div>
</div>

 </div>

 );
}

export default App;
