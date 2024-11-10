import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { log } from "console";
import { pokemonsRoute } from "../../Utils/Constants";

export const getInitialPokemonData = createAsyncThunk(
  "pokemon/initialData",
  async () => {
    try {
      const { data } = await axios.get(pokemonsRoute);
      // console.log(data.results);
      return data.results;
    } catch (err) {
      console.log(err);
    }
  }
);
