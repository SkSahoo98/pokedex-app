import React, { useEffect } from "react";
import Wrapper from "../Sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Login from "../Components/Login";
import PokemonCardGrid from "../Components/PokemonCardGrid";
import { getUserPokemons } from "../app/Reducers/getUserPokemons";

const MyList = () => {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserPokemons());
  }, [userInfo, dispatch]);

  useEffect(() => {
    console.log({ userPokemons });
  }, [userPokemons]);
  
  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
};

export default Wrapper(MyList);
