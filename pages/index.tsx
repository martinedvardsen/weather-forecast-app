import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../styles/Home.module.css';
import Weather from '../components/weather';

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const { city } = context.query;
  const res = await fetch(`https://weather-forecast-app-ecru.vercel.app/api/weatherAPI?city=${city || encodeURI('København')}`)
  const data = await res.json();

  return {
    props: { data }
  }
}

function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Weather {...data} />
    </div>
  )
}

export default Home;