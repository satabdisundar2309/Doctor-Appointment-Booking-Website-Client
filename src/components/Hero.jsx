import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Satabdisundar's MED+ Hospital is a state of the art facility dedicated to provide comprehensive healthcare support to patients. Our team of skilled doctors and para medical staff is committed to deliver care to each and every patient. Here we prioritize your well being ensuring a harmonious journey towards optimal healthcare and wellness.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} height={700} alt="Doctor image" className='animated-image'/>
        <span>
          <img src="/Vector.png" height={900} alt="pattern" />
        </span>
      </div>
    </div>
  )
}

export default Hero