import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Loader from './Loader';
import Card from './Card';

function Home(){

  const [propertyList, setPropertyList] = useState([{}]);
  useEffect(() => {
    fetch('/api/properties').then(
      response => response.json()
    ).then(
      data => {
        setPropertyList(data);
      }
    )
    
  }, [])

  return(
    <div className={styles.parent}>
      <h1 className={styles.header}> Welcome to Property-Lister! </h1>
      <Link to = '/add-property' className={styles.link}>
        <button className={styles.button}> Add Property </button>
      </Link>
      {
      (typeof propertyList[0]?.name === 'undefined')?(
        <Loader/>
      )
      :(
        propertyList.map(property => (
          <Card property={property}/>
        ))
      )

      }
    </div>
  )
}

export default Home;