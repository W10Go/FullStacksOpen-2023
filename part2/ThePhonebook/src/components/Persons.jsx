

const Persons = ({  person , deletePerson }) => {
    const handleDelete = () => {
        deletePerson(person)}

    return(
        <div>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

export default Persons