function WeatherCard( weatherApi ) {
  const api = weatherApi
  var weatherIcon = ""  
  if(api.weather ===""){
    return<div></div> 
  }else{
    weatherIcon = `https://openweathermap.org/img/w/${api.weather.weather[0].icon}.png` 
    return <div className="weather">   
    <h1>City: {api.weather.name}</h1>
   <img src = {weatherIcon} alt = {api.weather.name} />
   <h3>Current: {api.weather.main.temp}</h3>
   <h3>Min Temp: {api.weather.main.temp_min}</h3>
   <h3>Max Temp: {api.weather.main.temp_max}</h3>
   <br></br>
 </div>
  }
} 
export default WeatherCard;
