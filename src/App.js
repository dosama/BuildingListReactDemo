import React from 'react';
import './App.css';
import Header from './components/header/Header';
import BuildingList from './components/building-list/BuildingList';


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
   <main className="ml-sm-auto px-md-4">
 
       </main>
 
   </div>
  </div>
</div>

 </div>

 );
}

export default App;
