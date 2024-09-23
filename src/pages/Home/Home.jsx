import { Grid2, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import PokeCard from '../../components/PokeCard/PokeCard'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import { ArrowBack, ArrowForward, Search } from '@mui/icons-material'
import './Home.css'
import { Context } from '../../components/PokeContext/PokeContext'
import { NEXT, POKEMONS_PER_PAGE, PREVIOUS } from '../../utils/Constans'

const Home = () => {

    const {getPokemonsForCurrentPage, currentPage, handlePageChange, handleSearchChange, searchTerm, filteredPokemons} = useContext(Context)
    const PokeResults  = getPokemonsForCurrentPage()

    const totalFilteredPokemons = filteredPokemons.length;
    const maxPage = Math.ceil(totalFilteredPokemons / POKEMONS_PER_PAGE);

    return (
        <div>
            <HeaderBar />
            <Grid2
                container
                mt={'80px'}
                size={{ sm: 5 }}
                justifyContent={'center'}
                mx={'auto'}
                alignItems={'center'}
                backgroundColor={'gainsboro'}
                padding={'7px'}
                borderRadius={'50px'}
            >
                <TextField
                    sx={{marginX:'20px'}}
                    fullWidth
                    label="Buscar tu pokemon"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid2>
            <Grid2 container gap={8} justifyContent={'space-around'} my={4}>
                {PokeResults.length > 0 ? (
                    PokeResults.map((pokemon) => (
                        <PokeCard key={pokemon.name} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No se encontraron pokemones</p>
                )}
            </Grid2>
            {PokeResults.length > 0 && 
            <Grid2
                container
                justifyContent={'space-around'}
                size={{ sm: 5 }}
                mx={'auto'}
                alignItems={'center'}
                backgroundColor={'gainsboro'}
                padding={'7px'}
                borderRadius={'50px'}
            >
                <IconButton
                    disabled={currentPage === 1}
                    className='page-icon'
                    size='large'
                    onClick={() => handlePageChange(PREVIOUS)}
                >
                    <ArrowBack />
                </IconButton>
                <Typography>{currentPage}</Typography>
                <IconButton
                    disabled={currentPage >= maxPage}
                    className='page-icon'
                    size='large'
                    onClick={() => handlePageChange(NEXT)}
                >
                    <ArrowForward />
                </IconButton>
            </Grid2>}
        </div>
    )
}

export default Home