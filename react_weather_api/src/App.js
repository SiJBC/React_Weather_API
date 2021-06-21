import AddCity from './components/AddCity';
import React, { useState, } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastContainer from './components/ForecastContainer'
const apiKey = '4915deb164cf151c9e3b329f1c2270a7'

function App() {
  const [weather, setWeather] = useState('')
  const [forecast, setForecast] = useState('')
  // const [name, setName] = useState('')
  // const [icon, setIcon] = useState('')

  // const getWetherAPI = async (city) => {
  //   let weatherAPI = await weatherApiCall(city)
  //   return weatherAPI
  //   // console.log(api.name, "from api")
  //   // setName(api.name)
  //   // setIcon(`https://openweathermap.org/img/w/${api.weather[0].icon}.png`)
  // }

  const weatherApiCall = async (city) => {
    var queryString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey} `
    const response = await fetch(
      queryString
    )
    const data = await response.json()
    return data
  }

  const forecastApiCall = async (city) => {
    var queryString = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey} `
    const response = await fetch(
      queryString
    )
    const data = await response.json()
    return data
  }
    
  const updateQuery = async (event) => {
    let weatherApi = await weatherApiCall(event)
    let forecastApi = await forecastApiCall(event)
    setWeather(weatherApi)
    setForecast(forecastApi)
}


  return (
    <div className="App">
      <AddCity updateQuery= {updateQuery}/>
      
      <WeatherCard weather= {weather}/>
      <ForecastContainer forecast= {forecast}/>
    </div>
  );
}

export default App;


