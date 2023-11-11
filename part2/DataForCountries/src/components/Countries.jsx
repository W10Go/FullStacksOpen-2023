import Country from "./Country"
import Language from "./Language"
import axios from "axios"

const Countries = ({ countries, showDataOf, changeWeather, weather, haveToRefresh }) => {
    if(countries.length == 1){
        const api_key = import.meta.env.VITE_SOME_KEY
        
        const country = countries[0]
        const languages = Object.values(country.languages)
        const imgFlag = country.flags.svg
        const imgAlt = `Image of the country: ${country.name.common}`
        const capital = country.capitalInfo.latlng

        const url= `https://api.openweathermap.org/data/2.5/weather?lat=${capital[0]}&lon=${capital[1]}&appid=${api_key}`
        
        if(haveToRefresh){
            axios.get(url)
                .then
                (response => {
                    changeWeather(response.data)
                    }
                )
                
        }
        if(weather != ''){
            const weatherIcon = weather.weather[0].icon
            const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            return(
            <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h2>languages:</h2>
                <ul>
                    {languages.map(language => <Language key={language} language={language}/>)}
                </ul>
                <img width={400} src={imgFlag} alt={imgAlt} />
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <p>
                        temperature {weather.main.temp - 273.15} Celcius
                    </p>
                    <img src={iconURL} alt='weather on the Capital'/>
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            </>
            )
        }
    }
    if(countries.length > 10){
        return <p>Too many matches, specify another filter</p>
    }
    return(
        <div>
            {countries.map(country => <Country key={country.area} country={country} showDataOf= {showDataOf}/>)}
        </div>
    )
}
export default Countries