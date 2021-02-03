import { useState } from "react";

import { Data } from "../utils/types";
import styles from '../styles/Weather.module.css';

const Weather: React.FC<Data> = (data) => {
    const [weatherData, setWeatherData] = useState({...data});
    const [query, setQuery] = useState("")

    const handleClick = async (e: React.FormEvent<HTMLButtonElement | HTMLInputElement>) => {
        const response = await fetch(`https://weather-forecast-app.martinedvardsen.vercel.app/api/weatherAPI?city=${query}`)
        const body = await response.json();
        setWeatherData(body);
        if (window.history.pushState) {
            const url = new URL(window.location.href);
            url.searchParams.set('city', query || "København");
            window.history.pushState({}, '', url.toString());
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>Weather in <b>{weatherData.name}</b></p>
            </div>
            <div className={styles.element_wrapper}>
                <p>Temperature: <b>{weatherData.weatherData?.temperature}&deg;C</b></p>
            </div>
            <div className={styles.element_wrapper}>
                <p>Sky: <b>{weatherData.weatherData?.skyText}</b></p>
            </div>
            <div className={styles.element_wrapper}>
                <p>Humidity: <b>{weatherData.weatherData?.humidity}</b></p>
            </div>
            <div className={styles.element_wrapper}>
                <p>Wind: <b>{weatherData.weatherData?.windText}</b></p>
            </div>
            <div className={styles.search_wrapper}>
                <div className={styles.input_wrapper}>
                    <input 
                    type="text" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search for another city"
                    onKeyPress={e => 
                        {
                            if(e.key === 'Enter') handleClick(e);
                        }
                    }
                    />
                    <button onClick={handleClick}>Search</button>
                </div>
                {weatherData.error && <small className={styles.error}>{weatherData.error}</small>}
            </div>
        </div>
    )
}

export default Weather;