import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  pokemonStatType,
  pokemonTypeInterface,
  userPokemonsType,
} from "../../Utils/Types";
import { RootState } from "../store";
import { setToast } from "../Slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../Utils/FirebaseConfig";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login to add Pokemon to your collections...")
        );
      }

      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name;
      });

      if (index === -1) {
        let types: string[] = [];

        if (!pokemon.stats) {
          pokemon.types.forEach((type: any) => {
            types.push(Object.keys(type).toString());
          });
        } else {
          types = pokemon.types as string[];
        }

        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
          email: userInfo.email,
        });
        await dispatch(getUserPokemons());
        return dispatch(
          setToast(`${pokemon.name} added to your collection!!!`)
        );
      } else {
        return dispatch(
          setToast(`${pokemon.name} is already a part of your collection..!!!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
);
