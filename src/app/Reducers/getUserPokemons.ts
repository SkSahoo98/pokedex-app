import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../Utils/FirebaseConfig";
import { userPokemonsType } from "../../Utils/Types";
import { defaultImages, images } from "../../Utils/getPokemonImages";
import { pokemonTypes } from "../../Utils/pokemonTypes";

export const getUserPokemons = createAsyncThunk(
  "pokemon/userList",
  async (args, { getState }) => {
    try {
      const {
        app: { userInfo },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return;
      }

      const firestoreQuery = query(
        pokemonListRef,
        where("email", "==", userInfo.email)
      );

      const fetchPokemon = await getDocs(firestoreQuery);

      if (fetchPokemon.docs.length) {
        const userPokemons: userPokemonsType[] = [];
        fetchPokemon.forEach(async (pokemon) => {
          const pokemons = await pokemon.data().pokemon;
          //@ts-ignore
          let image = images[pokemons.id];

          if (!image) {
            //@ts-ignore
            image = defaultImages[pokemons.id];
          }

          const types = pokemons.types.map((name: string) => ({
            //@ts-ignore
            [name]: pokemonTypes[name],
          }));

          userPokemons.push({
            ...pokemons,
            firebaseId: pokemon.id,
            image,
            types,
          });
        });
        console.log(userPokemons, "Pokemons User");

        return userPokemons;
      }

      return [];
    } catch (error) {
      console.log(error);
    }
  }
);
