function WeatherCard({weather}) {
  let iconCode = weather[1];
  let imgURL = `https://openweathermap.org/img/w/${iconCode}.png`;

  return (
    <div className="weather">
      <h3>{weather[0]}</h3>
      <img src={imgURL} alt={weather[0]}></img>
      <br></br>
      <h3>Min Temp: {weather[3]} °C</h3>
      <h3>Max Temp: {weather[4]} °C</h3>
      <h3>Current Temp: {weather[2]} °C</h3>
    </div>
  );
}

export default WeatherCard;
