import React from 'react';


function ForecastBox(forecastApi) {

    // var someStr = 'He said "Hello, my name is Foo"';
    // console.log(someStr.replace(/['"]+/g, ''));


const dayArrayInit = () => {
    const data = forecastApi.forecast.list;
    const day1 = data.slice(0, 6);
    const day2 = data.slice(7, 14);
    const day3 = data.slice(15, 22);
    const day4 = data.slice(23, 30);
    const day5 = data.slice(31, 38);
    const forecastArray = [day1, day2, day3, day4, day5];
    return forecastArray;
}


const dayParser = (dayArray) => {

    const dayObject = {}
    dayObject.date_key = dayArray[0].dt_txt 
    dayObject.minTemp = findMinTemp(dayArray)
    dayObject.maxTemp = findMaxTemp(dayArray)
    dayObject.date =  dayArray[0].dt_txt.slice(0, dayArray[0].dt_txt.length/2+2) 
    dayObject.icon = `https://openweathermap.org/img/w/${dayArray[0].weather[0].icon}.png` 
    dayObject.description = dayArray[0].weather[0].description
    return dayObject
} 

  const findMinTemp = (day) => {
    let minTempArray = [];
    let timeStampArray = [];
    day.forEach((day) => minTempArray.push(day.main.temp_min));
    day.forEach((day) => timeStampArray.push(day.dt_txt.slice(day.dt_txt.length/2 +2, day.dt_txt.length-3)));
    var indexOfMinTemp = minTempArray.indexOf(Math.min(...minTempArray));
    const minTemp = {
      " min temp ": `${minTempArray[indexOfMinTemp]} °C`,
      " at ": timeStampArray[indexOfMinTemp],
    };
    return minTemp;
  };

    const findMaxTemp = day => {
    var maxTempArray = []
    var timeStampArray = []
    day.forEach(day => maxTempArray.push(day.main.temp_max))
    day.forEach(day => timeStampArray.push(day.dt_txt.slice(day.dt_txt.length/2 +2, day.dt_txt.length-3)));
    var indexOfMaxTemp = maxTempArray.indexOf(Math.max(...maxTempArray))
    const maxTemp = {
      "max temp " : `${maxTempArray[indexOfMaxTemp]} °C`,
      " at" : `${timeStampArray[indexOfMaxTemp]}`
    }
    return maxTemp
  }

  if (forecastApi.forecast !== '') {
    const dayArray = dayArrayInit(forecastApi)
    const dayObjectArray = dayArray.map(day => dayParser(day))
    const forecast = dayObjectArray.map((day) => 
    <div key = {day.date_key}>
        <ul>
            <img src = {day.icon} alt = {day.date}></img>
            <h3>{day.date}</h3>
            <p>{JSON.stringify(day.minTemp).replace(/[:{}'"]+/g, '')}</p>
            <p>{JSON.stringify(day.maxTemp).replace(/[:{}'"]+/g, '')}</p>
            <p>{day.description}</p>
            <br></br>
        </ul>
    </div>
    )

    return (
      <div className = "container">
          {/* <h1>{dayObjectArray[0].date}</h1> */}
            {forecast}
            {/* <ForecastCard dayObjectArray = {dayObjectArray}/> */}
      </div>
    );
  } else {
    return <div>GoodBye World</div>;
  }
}

export default ForecastBox;
