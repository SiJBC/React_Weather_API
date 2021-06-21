import React from 'react';

function Forecast( { dayObjectArray } ) {
  const dayForecasts = dayObjectArray.map((day) => {
    return     <li key={day.date_key}>
    <h1>{day.date}</h1> 
     {day.icon}
     {day.description}
     {day.minTemp}
     {day.maxTemp}
   </li>
  })

  return (
      <div className="forecast">
  <ul>{dayForecasts}</ul>

    </div>
  );
}

export default Forecast;
