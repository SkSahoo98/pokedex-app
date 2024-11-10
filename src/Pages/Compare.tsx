import React from "react";
import Wrapper from "../Sections/Wrapper";
import { useAppSelector } from "../app/hooks";
import CompareContainer from "../Components/CompareContainer";

const Compare = () => {
  const { compareQueue } = useAppSelector(({ pokemon }) => {
    return pokemon;
  });
  return (
    <div className="compare">
      <CompareContainer
        pokemon={compareQueue[0]}
        isEmpty={compareQueue.length < 1}
      />
      <CompareContainer
        pokemon={compareQueue[1]}
        isEmpty={compareQueue.length < 2}
      />
    </div>
  );
};

export default Wrapper(Compare);