import React from 'react';
import styles from '../styles/Card.module.css';

function Card({property}){
  return(
    <div>
      <p> {property.name} </p>
      <p> {property.info} </p>
      <p> {property.address} </p>
      <p> {property.email} </p>
      <p> {property.phone} </p>
    </div>
  )
}

export default Card;