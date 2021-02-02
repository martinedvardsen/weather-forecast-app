import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const { city } = context.query;
  const res = await fetch(`http://localhost:3000/api/hello?city=${city}`)
  const data = await res.json();

  return {
    props: { data }
  }
}

function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [weatherData, setWeatherData] = useState({...data});
  const [query, setQuery] = useState("")

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    const response = await fetch(`http://localhost:3000/api/hello?city=${query}`).then(res => res.json())
    setWeatherData(response)
  }

  return (
    <div className={styles.container}>
      <p>City: {weatherData.name}</p>
      <p>Current temperature: {weatherData.weatherData.temperature}</p>
      <p>Current weather status: {weatherData.weatherData.skyText}</p>
      <p>Current humidity: {weatherData.weatherData.humidity}</p>
      <p>Current wind status: {weatherData.weatherData.windText}</p>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
      <button onClick={handleClick}>Search</button>
    </div>
  )
}

export default Home;