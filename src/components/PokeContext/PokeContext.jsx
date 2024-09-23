import React, { createContext, useEffect, useState } from 'react';
import { NEXT, POKEMONS_PER_PAGE, PREVIOUS } from '../../utils/Constans'
import { getAllPokemons } from '../../services/Api';

export const Context = createContext();

export const PokeContext = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [countPokemons, setCountPokemons] = useState(0);
    const pokemonsPerPage = POKEMONS_PER_PAGE

    const loadAllPokemons = () => {
        getAllPokemons()
        .then(data => {
            setCountPokemons(data.count);
            setAllPokemons(data.results);
            localStorage.setItem('allPokemons', JSON.stringify(data.results));
            setLoading(false);
        })
    };

    useEffect(() => {
        const cachedPokemons = localStorage.getItem('allPokemons');
        if (cachedPokemons) {
            setAllPokemons(JSON.parse(cachedPokemons));
            setLoading(false);
        } else {
            loadAllPokemons();
        }
    }, []);

    useEffect(() => {
        const filtered = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemons(filtered);
        setCurrentPage(1)
    }, [searchTerm, allPokemons]);

    const getPokemonsForCurrentPage = () => {
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        return filteredPokemons.slice(startIndex, endIndex);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const handlePageChange = (direction) => {
        if (direction === NEXT && currentPage * pokemonsPerPage < filteredPokemons.length) {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === PREVIOUS && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <Context.Provider value={{ 
            getPokemonsForCurrentPage, 
            loading, 
            currentPage, 
            handlePageChange,
            countPokemons,
            handleSearchChange,
            searchTerm,
            filteredPokemons
        }}>
            {children}
        </Context.Provider>
    );
};
