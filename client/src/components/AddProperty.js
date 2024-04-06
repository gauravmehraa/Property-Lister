import React, { useState } from 'react';
import styles from "../styles/AddProperty.module.css"

function AddProperty(){

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    if(e.target.name === 'image'){
      setImage(URL.createObjectURL(e.target.files[0]));
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setFormData({ ...formData, [e.target.name]: reader.result });
      }
    }
    else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className={styles.input}
          type="text"
          placeholder='Property Name'
          onChange={handleChange}
        />
        <input
          name="info"
          className={styles.input}
          type="text"
          placeholder='Information'
          onChange={handleChange}
        />
        <input
          name="address"
          className={styles.input}
          type="text"
          placeholder='Address'
          onChange={handleChange}
        />
        <input
          name="email"
          className={styles.input}
          type="email"
          placeholder='Email'
          onChange={handleChange}
        />
        <input
          name="phone"
          className={styles.input}
          type="tel"
          placeholder='Phone Number'
          onChange={handleChange}
        />
        <input
          name="image"
          className={styles.input}
          type="file"
          placeholder='Property Image'
          onChange={handleChange}
        />
        {image && <img src={image} alt="Property"/>}
        <button type="submit" className={styles.submit}> Add Property </button>
      </form>
    </div>
  )
}

export default AddProperty;