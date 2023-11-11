import { useState, useEffect } from 'react'
import countriesServices from './services/countries'
import Countries from './components/countries'

// Step1  show all countries and filter them ✔
//        Cap the max # of countries filtered ✔
//        When the is only one country matching, display the basic data of the country. ✔
// Step2  Add a button to show an individual country ✔
// Step3  Add the data of the weather report for the capital.


function App() {
  const [countriesText, setCountriesText] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesShowed, setCountriesShowed] = useState([])
  const [weather, setWeather] = useState('')
  const [haveToRefresh, setHaveToRefresh] = useState(true)

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    countriesServices
      .getAll(url)
      .then(initialCountries => {
        setCountries(initialCountries)
        setCountriesShowed(initialCountries)
      })
  },[])

  const handleChangeText = (event) => {
    setCountriesText(event.target.value)
    const aux = countries.filter(country =>country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setHaveToRefresh(true)
    setCountriesShowed(aux)
    
    //setCountriesShowed(countries.filter(country => cou))
  }
  const showDataOf= (selectedCountry) => {
    const aux = countries.filter(country => country.area === selectedCountry.area)
    setHaveToRefresh(true)
    setCountriesShowed(aux)
  }
  const changeWeather = data =>{
    setWeather(data)
    setHaveToRefresh(false)
  }
  return (
    <>
      <form>
        find countries
        <input value={countriesText} onChange={handleChangeText}>
        </input>
        found: {countriesShowed.length} countries
        {<Countries countries={countriesShowed} showDataOf={showDataOf} changeWeather={changeWeather} weather={weather} haveToRefresh={haveToRefresh}/>}
      </form>
    </>
  )
}

export default App
