import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div>
      <Link to = '/add-property'>
        <button> Add Property </button>
      </Link>
      {
      (typeof propertyList[0]?.name === 'undefined')?(
        <p> Fetching data</p>
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