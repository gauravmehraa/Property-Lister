import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/property.module.css';
import Loader from './Loader';

function Property(){

  const { id } = useParams();
  const [property, setProperty] = useState([{}]);

  useEffect(() => {
    fetch(`/api/properties/${id}`).then(
      response => response.json()
    ).then(
      data => {
        setProperty(data);
      }
    )
  }, [id])

  return(
    (typeof property.name === 'undefined')? <Loader/>:
    <div className={styles.parent}>
      <div className={styles.name}> {property.name} </div>
      <img className={styles.image} src={property.image1} alt={property.name}/>
      <img className={styles.image} src={property.image2} alt={property.name}/>
      <img className={styles.image} src={property.image3} alt={property.name}/>
      <div className={styles.address}> {property.address} </div>
      <div className={styles.info}> {property.info} </div>
      <div className={styles.phone}> {property.phone} </div>
      <div className={styles.email}> {property.email} </div>
    </div>
  )
}

export default Property;