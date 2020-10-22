import React, { useState,useEffect, useRef } from 'react'
import config from "../../config";
import buildings from '../../data/buildings.json';
import {useParams} from 'react-router-dom';

function BuildingMap() {
  const [building, setBuilding] = useState(null);
  const params = useParams();
  const props = { ref: useRef() }

  useEffect(() => { 
    if(!window.google)
    {
      const script = document.createElement(`script`)
      script.type = `text/javascript`;
      script.src = config.GOOGLE_MAPS_API;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, refreshMap);
      return () => script.removeEventListener(`load`, refreshMap);
    }else{
      refreshMap();  
    }
  }, [building]);

  useEffect(() => {
    refreshMap();
  }, [params.buildingId]);

  const refreshMap = () => {
    const currentBuilding = buildings.find((o)=> o.id == params.buildingId);
    setBuilding(currentBuilding?currentBuilding:{});

    if(building)
    {
      console.log(building);
      const myLatLng = { lat: building.location.position[0], lng: building.location.position[1]};
      const map = new window.google.maps.Map(props.ref.current, {
        zoom: 10,
        center: myLatLng,
      });
      new window.google.maps.Marker({
        position: myLatLng,
        map,
        title: building.location.name,
      });
    }
   
  }

  return (
    <div {...props} style={{height: `70vh` ,margin: `1em 0`, borderRadius: `0.5em` }}/>
  )  
}
export default BuildingMap;