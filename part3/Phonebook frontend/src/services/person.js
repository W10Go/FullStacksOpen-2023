import axios from "axios"

const url = '/api/persons'

const getAll= () => {
    return axios.get(url)
        .then(response => response.data)
}
const create = newObject =>{
    return axios.post(url, newObject)
        .then(response => response.data)
}
const deleateAt = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(()=> true)
}

const updateAt = (id, newObject) => {
    return axios.put(`${url}/${id}`, newObject)
        .then(response => response.data)
}
export default { getAll , create , deleateAt , updateAt }