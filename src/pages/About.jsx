import React from 'react'
import Biography from '../components/Biography'
import Hero from '../components/Hero'

const About = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Satabdisundar's MED+ Hospital "}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  )
}

export default About