import React from "react";
import L from "leaflet";


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER = document.getElementById("map-container");

    if (props.lat && props.lon && props.pins) {
      const MAP_ID = document.createElement("div");
      MAP_ID.setAttribute("id", "mapid");
      MAP_CONTAINER.appendChild(MAP_ID);

      const mymap = L.map("mapid").setView([props.lat, props.lon], 11); 

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(mymap);

      var iconOpportunity = L.divIcon({ 
        className: 'custom-div-icon',
        html: "<div style='background-color:#2589bd;' class='marker-pin'></div><i class='fas fa-hand-holding-heart'></i>",   
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });

      props.pins.forEach((pin) => {
        if (pin.latitude && pin.longitude && pin.opportunity_id) {
          L.marker([pin.latitude, pin.longitude],{icon: iconOpportunity}).addTo(mymap)
          .bindPopup("<p><b>Volunteer Opportunity</b>: " + pin.opportunity_id + "</p><p><b>Title</b>: " + pin.title + "</p><p><b>Website</b>: <a href=" + pin.website + " target='_blank'>" + pin.website + "</a></p><p><b>Summary</b>: " + pin.summary + "</p><p><b>Address</b>: " + pin.street_address + ", " + pin.city + ", " + pin.state +" "+ pin.postcode +"</p><p><b>Recurrence Type</b>: " + pin.recurrence_type + "</p>")
        } 
      })

      function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
       }
    }

    return () => (MAP_CONTAINER.innerHTML = ""); 
  }, [props.lat, props.lon, props.pins]);

  return <div id="map-container"></div>;
};

