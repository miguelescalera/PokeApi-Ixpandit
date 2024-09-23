import React, { useEffect, useState } from 'react'
import SkeletonCard from '../SkeletonCard/SkeletonCard'
import './PokeCard.css'
import { Card, CardActionArea, CardContent, Grid2, Typography } from '@mui/material'
import { getPokeDetails, getPokeEspecie } from '../../services/Api'

const PokeCard = ({ pokemon }) => {
  const [poke, setPoke] = useState(null)
  const [pokeDetails, setPokeDetails] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const URL = pokemon.url.split('/')[6]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specieResponse, pokeResponse] = await Promise.all([
          getPokeEspecie(URL),
          getPokeDetails(URL)
          
        ]);
        setPokeDetails(specieResponse)
        setPoke(pokeResponse)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
  
    fetchData();
  }, [pokemon.url])

  if (poke === null || pokeDetails === null) {
    return <SkeletonCard />
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  };

  return (
    <Grid2 container size={{ xs: 10, sm: 5, lg: 2.5 }}>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <CardActionArea>
              <Card elevation={6}>
                <CardContent className={`bg-${pokeDetails?.color?.name} content-height card-with-id`}>
                <div className="poke-id-background">{poke?.id}</div>
                  <img
                    className='card_img'
                    src={poke?.sprites?.other['official-artwork']?.front_default}
                    alt="pokemon"
                  />
                  <Typography gutterBottom variant="h5" component="div" color={pokeDetails?.color?.name === 'black' ? 'white' : '' }>
                    {poke.name}
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </div>
          <div className="flip-card-back">
            <Card elevation={6}>
              <CardContent className={`bg-${pokeDetails?.color?.name} content-height`}>
                <Grid2 container direction={'column'} alignContent={'flex-start'} alignItems={'flex-start'} gap={2} color={pokeDetails?.color?.name === 'black' ? 'white' : '' }>
                <Typography variant="h6">Más detalles</Typography>
                <Typography variant="body2">Color: {pokeDetails?.color?.name}</Typography>
                <Typography variant="body2">Shape: {pokeDetails?.shape?.name}</Typography>
                <Typography variant="body2">Height: {poke?.height * 10} cm</Typography>
                <Typography variant="body2">Weight: {poke?.weight / 10} kg</Typography>
                <Typography variant="body2">Habitat: {pokeDetails?.habitat?.name}</Typography>
                </Grid2>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Grid2>
  );
};

export default PokeCard;