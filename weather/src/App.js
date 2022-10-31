import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Weather from './Weather';

function App() {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    
    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);},
                (error) => {
                    alert(error);
                })
        }
        else {
            console.log('Your browser does not support geolocation');
        }
        
    }, []);
    var isLoading = (lat === 0 && lon === 0);

    if(isLoading){
        console.log('loading');
        return <p>Loading...</p>;
    }
    else 
        return (
        <div id='position' class="border">

            <h1>Your position is</h1>
            <p>Position: {lat.toFixed(3)}, {lon.toFixed(3)}</p>
            <Weather lat={lat} lon={lon}/>
        </div>
        )
}

export default App;
