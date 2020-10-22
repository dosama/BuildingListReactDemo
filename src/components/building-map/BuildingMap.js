import React, { useEffect, useRef } from 'react'
import config from "../../config";

export default function BuildingMap({ options, onMount, className }) {
  const props = { ref: useRef(), className }
  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options)
    onMount && onMount(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`;
      script.src = config.GOOGLE_MAPS_API;

      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  })

  return (
    <div {...props} style={{height: `70vh` ,margin: `1em 0`, borderRadius: `0.5em` }}/>
  )
}

BuildingMap.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  }
}