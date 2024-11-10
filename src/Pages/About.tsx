import React from "react";
import Wrapper from "../Sections/Wrapper";
import avatar from "../assets/avatar/swarup_avatar.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <div className="profile">
      <img src={avatar} alt="Avatar" className="profile-image" />
      <h1 className="profile-text">Hii, i am Swarup Kumar Sahoo</h1>
      <h2 className="profile-text">Creator of this Amazing Pokedex</h2>
      <h4 className="profile-text">
        This project is created for my Project Repo and my Intrests in Anime.
      </h4>

      <div className="profile-link">
        <a href="https://github.com/SkSahoo98">
          {" "}
          <FaGithub />{" "}
        </a>
        <a href="https://www.linkedin.com/in/swarup-sahoo-377026241/">
          {" "}
          <FaLinkedin />{" "}
        </a>
      </div>
    </div>
  );
};

export default Wrapper(About);
