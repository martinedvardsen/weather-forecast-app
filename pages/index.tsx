import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../styles/Home.module.css';
import Weather from '../components/weather';

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const { city } = context.query;
  const res = await fetch(`http://localhost:3000/api/weatherAPI?city=${city}`)
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