import React, { useState, useEffect, useRef } from 'react'
import config from "../../config";
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { useSelector } from "react-redux";

function BuildingMap() {
  const [building, setBuilding] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState(null);
  const buildings = useSelector((state)=> state.buildings);

  const params = useParams();
  const props = { ref: useRef() }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => refreshMap(), 1000);
  }, [building]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (!window.google) {
        const script = document.createElement(`script`)
        script.type = `text/javascript`;
        script.src = config.GOOGLE_MAPS_API;
        const headScript = document.getElementsByTagName(`script`)[0];
        headScript.parentNode.insertBefore(script, headScript);
        script.addEventListener(`load`, refreshMap);
        return () => script.removeEventListener(`load`, refreshMap);
      } else {
        refreshMap();
      }
    }, 1000);

  }, [params.buildingId]);


  const refreshMap = () => {
    const currentBuilding = buildings.find((o) => o.id == params.buildingId);
    if (building && building.id == currentBuilding.id && map) {
      return;
    }

    setBuilding(currentBuilding ? currentBuilding : null);

    if (building) {
      const myLatLng = { lat: building.location.position[0], lng: building.location.position[1] };

      const map = new window.google.maps.Map(props.ref.current, {
        zoom: 10,
        center: myLatLng,
      });

      setMap(map);
      window.google.maps.event.addListenerOnce(map, 'idle', function () {
        setIsLoading(false);
      });

      new window.google.maps.Marker({
        position: myLatLng,
        map,
        title: building.location.name,
      });
    }
  }
  return (<div className="BuildingMap">
    { isLoading ? <Spinner /> : null}
    <div {...props} style={{ visibility: isLoading ? `hidden` : `visible`, height: `70vh`, margin: `1em 0`, borderRadius: `0.5em` }} />
  </div>
  );

}
export default BuildingMap;