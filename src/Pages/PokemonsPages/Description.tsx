import React from 'react'
import PokemonContainer from '../../Components/PokemonContainer'
import { useAppSelector } from '../../app/hooks'
import Info from '../../Components/Info'

const Description = () => {
    const pokemonData = useAppSelector(
        ({pokemon: {currentPokemon}}) => currentPokemon
    )
  return (
    <>
    {/* <Info data={pokemonData} /> */}
    {pokemonData && <PokemonContainer image={pokemonData.image} />}
  </>
  )
}

export default Description
