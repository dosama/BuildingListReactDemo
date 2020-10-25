import React, {Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import BuildingList from './components/building-list/BuildingList';
import BuildingMap from './components/building-map/BuildingMap';
import BuildingDetails from './components/building-details/BuildingDetails';
import Home from './components/home/Home';
import { Route ,Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  const routes = [
    {
      path: "/buildingMap/:buildingId",
      component: BuildingMap
     
    },
    {
      path: "/buildingDetails/:buildingId",
      component: BuildingDetails
     
    }
  ];
  function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
  return (

<div  className="App">
    <Header></Header>
    <ToastProvider>
<div className="container-fluid">
  <div className="row">
    <div className="col-md-3 col-lg-2">
   <BuildingList></BuildingList>
    </div>
   <div className="col-md-9 col-lg-10">
   <main>
   <Switch>
   <Route path="/" exact  ><Home></Home></Route>
   {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
  </Switch>
       </main>
   </div>
  </div>
</div>
</ToastProvider>

 </div>

 );
}

export default App;
