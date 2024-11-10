import { createSlice } from "@reduxjs/toolkit";
import {
  generatedPokemonType,
  PokemonTypeInitialState,
} from "../../Utils/Types";
import { getInitialPokemonData } from "../Reducers/getInitialPokemonData";
import { getPokemonsData } from "../Reducers/getPokemonData";
import { getUserPokemons } from "../Reducers/getUserPokemons";
import { removePokemon } from "../Reducers/removePokemonList";

const initialState: PokemonTypeInitialState = {
  allPokemon: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
  currentPokemon: undefined,
};

export const PokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => {
          return pokemon.id === action.payload.id;
        }
      );

      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      const queue = [...state.compareQueue];
      queue.splice(index, 1);
      state.compareQueue = queue;
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemon = action.payload;
    });

    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });

    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload!;
    });

    builder.addCase(removePokemon.fulfilled, (state, action) => {
      const userPokemon = [...state.userPokemons];
      const index = userPokemon.findIndex((pokemon) => {
        return pokemon.firebaseId === action.payload?.id;
      });

      userPokemon.splice(index, 1);
      state.userPokemons = userPokemon;
    });
  },
});

export const { addToCompare, removeFromCompare, setCurrentPokemon } = PokemonSlice.actions;
