import React from 'react';

function Forecast({ forecast }) {
    console.log(forecast)
    let iconCode = forecast[0].icon;
    let imgURL = `https://openweathermap.org/img/w/${iconCode}.png`;
  return (
      <div className="forecast">
        <div className="forecast1">
        <img src={imgURL} alt={forecast[0]}></img> 
            <p>Date: {forecast[0].date.slice(0,10)}</p>
            <p>Min temp: {forecast[0].minTemp.min_temp}<br/> at: {forecast[0].minTemp.min_temp_time} </p>
            <p>Max temp: {forecast[0].maxTemp.max_temp}<br/> at: {forecast[0].maxTemp.max_temp_time} </p> 
        </div> 
        <div className="forecast2"></div>
        <div className="forecast3"></div>
        <div className="forecast4"></div>
        <div className="forecast5"></div>
        <div className="forecast6"></div>
        <div className="forecast7"></div> 

    </div>
  );
}

export default Forecast;
