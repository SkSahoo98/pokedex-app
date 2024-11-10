import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";
import { pokemonListRef } from "../../Utils/FirebaseConfig";

export const removePokemon = createAsyncThunk(
  "pokemon/remove",
  async ({ id }: { id: string }) => {
    try {
      console.log({ id });

      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch (error) {
      console.log(error);
    }
  }
);
