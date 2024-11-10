import React, { useEffect } from "react";
import Wrapper from "../Sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialPokemonData } from "../app/Reducers/getInitialPokemonData";
import { getPokemonsData } from "../app/Reducers/getPokemonData";
import PokemonCardGrid from "../Components/PokemonCardGrid";
import { debounce } from "../Utils/Debounce";
import { setLoading } from "../app/Slices/AppSlice";
import Loader from "../Components/Loader";

const Search = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);

  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => {
    return pokemon;
  });

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemon = [...allPokemon];
      const randomPokemonID = clonedPokemon
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      // console.log(randomPokemonID);
      dispatch(getPokemonsData(randomPokemonID));
    }
  }, [allPokemon, dispatch]);
  // console.log(randomPokemons)

  const handleChange = debounce((value: string) => getPokemon(value), 300);

  useEffect(() => {
    if (randomPokemons) {
      dispatch(setLoading(false));
    }
  }, [randomPokemons, dispatch]);

  const getPokemon = async (value: string) => {
    // console.log(value.length, "Lenght");
    // console.log(value, "Value")
    // console.log(allPokemon)

    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) => {
        // console.log(pokemon.name.includes(value.toLowerCase()));
        let test = pokemon.name.includes(value.toLowerCase());
        // console.log(test, "test");
        return test;
      });
      console.log(pokemons);
      dispatch(getPokemonsData(pokemons!));
    } else {
      const clonedPokemon = [...(allPokemon as [])];
      const randomPokemonID = clonedPokemon
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      // console.log(randomPokemonID);
      dispatch(getPokemonsData(randomPokemonID));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            className="pokemon-searchbar"
            placeholder="Search Pokemon..."
            onChange={(e) => handleChange(e.target.value)}
          />
          <PokemonCardGrid pokemons={randomPokemons!} />
        </div>
      )}
    </>
  );
};

export default Wrapper(Search);
