import axios from 'axios'

const getAll= (url) => {
    return axios.get(url)
        .then(response => response.data)
}

export default {getAll}