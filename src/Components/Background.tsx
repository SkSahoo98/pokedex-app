import React from "react";
import pokeball1 from "../assets/pokeball.png";
import pokeball2 from "../assets/pokeball2.png";

const Background = () => {
  return (
    <div className="background">
      <img src={pokeball1} alt="pokeball" className="pokeball1 pokeball" />
      <img src={pokeball2} alt="pokeball" className="pokeball2 pokeball" />

      <img src={pokeball1} alt="pokeball" className="pokeball3 pokeball" />
      <img src={pokeball2} alt="pokeball" className="pokeball4 pokeball" />

      <img src={pokeball1} alt="pokeball" className="pokeball5 pokeball" />
      <img src={pokeball2} alt="pokeball" className="pokeball6 pokeball" />
    </div>
  );
};

export default Background;
