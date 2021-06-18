import React, { useState} from 'react';

function AddCity( {updateQuery }) {
    const [city, setCity] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!city) {
            alert('please add a city')
            return
        }

        updateQuery( {city} )

        setCity('')
    }

  return (
    <form className="add-form" onSubmit = {onSubmit}>
      <div className="form-control">
        <label>City</label>
        <input type="city" placeholder="Enter City" 
        value = {city}
        onChange ={e => setCity(e.target.value)}
        />
      </div>
    </form>
  );
}

export default AddCity;
