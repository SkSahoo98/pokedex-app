import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPokemonsData } from "../../app/Reducers/getPokemonData";
import PokemonCardGrid from "../../Components/PokemonCardGrid";

const Evolution = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { currentPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    const fetchData = async () => {
      const pokemons = currentPokemon?.evolution.map(({ pokemon }) => {
        return pokemon;
      });
      await dispatch(getPokemonsData(pokemons!));
      setIsLoading(true);
    };
    fetchData()
  }, [dispatch, currentPokemon]);

  return (
    <div className="page">
      {isLoading && <PokemonCardGrid pokemons={randomPokemons!} />}
    </div>
  );
};

export default Evolution;
