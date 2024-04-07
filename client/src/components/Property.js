import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <Link to = '/'>
        <h3 className={styles.back}>Go Back</h3>
      </Link>
        <h1 className={styles.header}> {property.name} </h1>
      <div className={styles.images}>
        <img className={styles.image} src={property.image1} alt={property.name}/>
        <img className={styles.image} src={property.image2} alt={property.name}/>
        <img className={styles.image} src={property.image3} alt={property.name}/>
      </div>
      <h1 className={styles.header}> About {property.name} </h1>
      <div className={styles.info}>{property.info} </div>
      <h1 className={styles.header}> Address </h1>
      <div className={styles.address}> {property.address} </div>
      <h1 className={styles.header}> Contact Information </h1>
      <div className={styles.phone}>
        Mobile: <a href={`tel:${property.phone}`}> {property.phone} </a>
      </div>
      <div className={styles.email}>
        Email: <a href={`mailto:${property.email}`}> {property.email} </a>
      </div>
    </div>
  )
}

export default Property;