import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
import heroImage from "/hero.png";
import aboutImage from "/about.png";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Satabdisundar's MED+ Hospital | Your most trusted healthcare organazation"
        }
        imageUrl={heroImage}
      />
      <Biography imageUrl={aboutImage}/>
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
