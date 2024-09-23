import axios from 'axios'
import { API_ESPECIES, API_POKEMONS } from '../utils/Constans'

export const getAllPokemons = () => {
    return axios.get(`${API_POKEMONS}?limit=5000`)
        .then(response => response.data)
        .catch(err => {
            console.log('ocurrio un error al solicitar los pokemones', err)
        })
}

export const getPokeEspecie = (id) => {
    return axios.get(`${API_ESPECIES}${id}`)
        .then(response => response.data)
        .catch(err => {
            console.log('Ocurrio un error al obtener la especie del pokemon', err)
        })
}

export const getPokeDetails = (id) => {
    return axios.get(`${API_POKEMONS}/${id}`)
        .then(response => response.data)
        .catch(err => {
            console.log('Ocurrio un error al obtener los detalles del pokemon', err)
        })
} 