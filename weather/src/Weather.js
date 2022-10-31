import { useEffect,useState } from "react";
import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL= 'https://openweathermap.org/img/wn/';
const API_KEY = '';

export default function Weather({lat, lon}){
    const [location, setLocation] = useState('');
    const [temp, setTemp] = useState(0);
    const [tempFeel, setTempFeel] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDir] = useState(0);
    const [description, setDesc] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        
        const url = API_URL + 'lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_KEY;

        console.log(url);

        axios.get(url).then((response) => {
            console.log(response.data);
            setLocation(response.data.name);
            setTemp(response.data.main.temp);
            setTempFeel(response.data.main.feels_like.toFixed(1));
            setSpeed(response.data.wind.speed);
            setDir(response.data.wind.deg);
            setDesc(response.data.weather[0].description);
            setIcon(ICON_URL + response.data.weather[0].icon + '@2x.png');

        }).catch(error => { console.log(error);
        });
    }, []);
    return(
        <div>
            <h1>Weather at {location}</h1>
            <p>{temp} C&#176; (feels like {tempFeel} C&#176;)</p>
            <p>{speed} m/s at {direction} degrees</p>
            <p>{description}</p>
            <img src={icon} alt=""/>
            
        </div>
    )
}