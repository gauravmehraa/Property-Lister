import React from 'react';
import { Link }from 'react-router-dom';
import styles from '../styles/card.module.css';

function Card({property}){
  return(
    <Link to = {`/property/${property.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className={styles.parent}>
        <div className={styles.left}>
          <img className={styles.image} src={property.image1} alt={property.name}/>
        </div>
        <div className={styles.right}>
          <div className={styles.name}> {property.name} </div>
          <div className={styles.overview}> {property.overview} </div>
          <div className={styles.address}> {property.address} </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;