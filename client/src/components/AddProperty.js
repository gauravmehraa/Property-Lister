import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/addproperty.module.css"
import Loader from "./Loader";

function AddProperty(){

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formDataWithFiles = new FormData();
      formDataWithFiles.append('image1', formData.image1);
      formDataWithFiles.append('image2', formData.image2);
      formDataWithFiles.append('image3', formData.image3);
      formDataWithFiles.append('video', formData.video);
      formDataWithFiles.append('name', formData.name);
      formDataWithFiles.append('overview', formData.overview);
      formDataWithFiles.append('info', formData.info);
      formDataWithFiles.append('address', formData.address);
      formDataWithFiles.append('email', formData.email);
      formDataWithFiles.append('phone', formData.phone);

      const response = await fetch('/api/data', {
        method: 'POST',
        body: formDataWithFiles,
      });
      const responseData = await response.json();
      console.log(responseData);
      alert("Property successfully added");
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return(
    loading? <Loader text="Uploading data"/>
    :
    <div className={styles.parent}>
      <Link to = '/'>
        <h3 className={styles.back}>Go Back</h3>
      </Link>
      <h1 className={styles.header}>Add a Property</h1>
      <form onSubmit={handleSubmit} className={styles.form} id="add-form">
        <input
          name="name"
          className={styles.input}
          type="text"
          placeholder='Property Name'
          onChange={handleChange}
          required
        />
        <input
          name="overview"
          className={styles.input}
          type="text"
          placeholder='Brief Overview'
          onChange={handleChange}
          required
        />
        <textarea
          name="info"
          rows="10"
          className={styles.input}
          type="text"
          placeholder='Detailed Information'
          onChange={handleChange}
          required
        />
        <textarea
          rows="5"
          name="address"
          className={styles.input}
          type="text"
          placeholder='Address'
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className={styles.input}
          type="email"
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          className={styles.input}
          type="tel"
          placeholder='Phone Number'
          onChange={handleChange}
          required
        />
        <h3 className={styles.header}>Upload Images</h3>
        <input
          name="image1"
          className={styles.input}
          type="file"
          placeholder='Property Image'
          onChange={handleChange}
          required
        />
        <input
          name="image2"
          className={styles.input}
          type="file"
          placeholder='Property Image'
          onChange={handleChange}
          required
        />
        <input
          name="image3"
          className={styles.input}
          type="file"
          placeholder='Property Image'
          onChange={handleChange}
          required
        />
        <h3 className={styles.header}>Upload Video</h3>
        <input
          name="video"
          className={styles.input}
          type="file"
          placeholder='Property Video'
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submit}> Add Property </button>
      </form>
    </div>
  )
}

export default AddProperty;