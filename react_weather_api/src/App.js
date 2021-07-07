import AddCity from './components/AddCity';
import React, { useState, } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastContainer from './components/ForecastContainer'
const apiKey = '4915deb164cf151c9e3b329f1c2270a7'


function App() {
  const [weather, setWeather] = useState('')
  const [forecast, setForecast] = useState('')
  const [error, setError] = useState(false)

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
    if(data.message === "city not found"){
      setWeather('')
      setForecast('')
    }
    return data
  }

  const CityNotFoundMessage = () => {
    return <h1>City Not Found</h1>
  }

  const DisplayErrorMessage = (props) => {

    if(!error){
      return <div></div>
    }else{
      // setWeather('')
      // setForecast('')
      return <CityNotFoundMessage />
    }
  }
    
  const updateQuery = async (event) => {
  
    let weatherApi = await weatherApiCall(event)
    let forecastApi = await forecastApiCall(event)
    //check error
    if(weatherApi.message !== "city not found"){
      setWeather(weatherApi)
      setForecast(forecastApi)
    }else {
      setError(true)
    }

}


  return (
    <div className="App">
      <AddCity updateQuery= {updateQuery}/>
      <WeatherCard weather= {weather}/>
      <ForecastContainer forecast= {forecast}/>
      <DisplayErrorMessage />
    </div>
    
  );
}

export default App;


