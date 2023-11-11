const Country = ({ country, showDataOf }) => {


    const handleButton = () => {
        showDataOf(country)
    }
    return(
        <div>
            {country.name.common}
            <button onClick={handleButton}>show</button>
        </div>
    )
}
export default Country