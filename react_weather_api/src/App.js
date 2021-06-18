import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import AddCity from './components/AddCity'
const apiKey = '4915deb164cf151c9e3b329f1c2270a7'

  function App () {
  const [weather, setWeather] = useState([])
  const [forecast, setForecast] = useState([])
  const [query, setQuery] = useState([])


    useEffect(() => {
      const getWeatherProp = async () => {
        const weatherAPI = await fetchWeather()
        const name = weatherAPI.name
        const icon = weatherAPI.weather[0].icon
        const temp = weatherAPI.main.temp
        const minTemp = weatherAPI.main.temp_min
        const maxTemp = weatherAPI.main.temp_max
        const weatherArray = [name, icon, temp, minTemp, maxTemp]
        setWeather(weatherArray)
      }

      const getForecastProp = async () => {
        const forecastAPI = await fetchForecast()
        const forecastPropArray = []
        for (var i = 0; i < forecastAPI.length; i++) {
          const day = {}
          day.date = forecastAPI[i][0].dt_txt
          day.icon = forecastAPI[i][0].weather[0].icon
          day.minTemp = findMinTemp(forecastAPI[i])
          day.maxTemp = findMaxTemp(forecastAPI[i])
          forecastPropArray.push(day)
        }
        setForecast(forecastPropArray)
      }
      getWeatherProp()
      getForecastProp()
    }, [])

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=sydney&units=metric&appid=${apiKey} `
    )
    const data = await response.json()
    return data
  }

  const fetchForecast = async (query) => {
    var city = 'sydney'
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=sydney&units=metric&appid=${apiKey}`
    )
    const data = await response.json()
    const day1 = data.list.slice(0, 6)
    const day2 = data.list.slice(7, 14)
    const day3 = data.list.slice(15, 22)
    const day4 = data.list.slice(23, 30)
    const day5 = data.list.slice(31, 38)
    const forecastArray = [day1, day2, day3, day4, day5]
    return forecastArray
  }

  const findMinTemp = day => {
    let minTempArray = []
    let timeStampArray = []
    day.forEach(day => minTempArray.push(day.main.temp_min))
    day.forEach(day => timeStampArray.push(day.dt_txt))
    var indexOfMinTemp = minTempArray.indexOf(Math.min(...minTempArray))
    const minTemp = {
      "min_temp" : minTempArray[indexOfMinTemp],
      "min_temp_time" : timeStampArray[indexOfMinTemp]
    }  
    return minTemp
  }

  const findMaxTemp = day => {
    var maxTempArray = []
    var timeStampArray = []
    day.forEach(day => maxTempArray.push(day.main.temp_max))
    day.forEach(day => timeStampArray.push(day.dt_txt))
    var indexOfMaxTemp = maxTempArray.indexOf(Math.max(...maxTempArray))
    const maxTemp = {
      "max_temp" : maxTempArray[indexOfMaxTemp],
      "max_temp_time" : timeStampArray[indexOfMaxTemp]
    }
    return maxTemp
  }

  const updateQuery = (newQuery) =>{
    fetchWeather(newQuery)
    console.log(query.city)
  }

  return (
    <div className='container'>
      <h1>Weather API</h1>
      <WeatherCard weather={weather} />
      <ForecastCard forecast={forecast} />
      <AddCity updateQuery = {updateQuery}/>
    </div>
  )
}

export default App
