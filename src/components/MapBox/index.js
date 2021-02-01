import React from "react";
import Map from "./../Map/index";


function MapBox(props) {

    let validEntries = props.results.length
    let starterObj = {lat: 0.0, lon: 0.0}
	const latLonObj = props.results.reduce(reduceMethod, starterObj)

    console.log(latLonObj, starterObj)
	
    function reduceMethod(t,r){
      	//Try to get lat and lon
      	const rLat = checkAndParseFloat(r.latitude)
      	const rLon = checkAndParseFloat(r.longitude)
        //lat and long are valid? add to totals
      	if(rLon && rLat){
			t.lat += rLat
          	t.lon += rLon
          //invalid, remove from averaging number
		}else{
        	validEntries--
        }
		// return whole object
        return t
    }
    
    function checkAndParseFloat (x) {
        let result = parseFloat(x)
        console.log(result)
        if (!result) {
            return 0
        }

        return result;
    }
    return (
        <>
            <Map lat={latLonObj.lat/validEntries} lon={latLonObj.lon/validEntries} pins={props.results} />
        </>
    )
}

export default MapBox;