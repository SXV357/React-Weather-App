import React, {useState} from 'react'

export default function App(){
  const [currentWeather, setCurrentWeather] = useState({})
  const [input, setInput] = useState(" ")

  function getData(event){
    if (event.key === "Enter") {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${input}`)
      .then(res => res.json())
      .then(data => {setCurrentWeather(data); setInput(" ")})
  }
  }

  function determineDayOrNight(t){
    let AmOrPm;
    if (t.slice(11,13)  === "00") {
      AmOrPm = "PM"
    }
    else{
      if (t.slice(11,13) < "12") {
        AmOrPm = "AM"
      }
      else{
        AmOrPm = "PM"
      }
    }
    return AmOrPm
  }

  function representDayMonthYear(t){
    let day = t.slice(8,10)
    let month = t.slice(5,7)
    let year = t.slice(0,4)
    return `${day}/${month}/${year}`
  }

  return(
    <main>
      <div className = "input-container">
        <input 
            type = "text" 
            placeholder = "Search..." 
            onChange = {(event) => {
              const {value} = event.target
              setInput(value)
            }} 
            value = {input} 
            onKeyPress={getData} />
            </div>
        {currentWeather.current ? <div className = "weather-container">
          <p>{currentWeather.location.name}, {currentWeather.location.region}, {currentWeather.location.country}</p>
          <p>{representDayMonthYear(currentWeather.location.localtime)} {currentWeather.location.localtime.slice(11, 16)} {determineDayOrNight(currentWeather.location.localtime)}</p>
          <p>{currentWeather.current.temp_f}°F({currentWeather.current.temp_c}°C)</p>
          <p>Feels like: {currentWeather.current.feelslike_f}°F({currentWeather.current.feelslike_c}°C)</p>
          <p>{currentWeather.current.condition.text}</p>
          <img src = {currentWeather.current.condition.icon}/>
        </div>: " "}
    </main>
  )
}