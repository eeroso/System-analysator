import React from 'react';
import '../styles/App.css';
import '../styles/About.css';
import Header from '../layout/Header';
import mariadblogo from '../img/mariadblogo.png';
import nodelogo from '../img/nodelogo.png';
import reactlogo from '../img/reactlogo.png';

function About() {
  return (
    <div>
      <Header />
      <div className='content-main'>
        <section className='aboutText'>
        <p>
          Systeemianalysaattori joka pyörii palvelimen päällä ja tallentaa dataa tietokantaan. 
        </p>
        <p>
        Tallennettu Data haettavissa tämän käyttöliittymän avulla.
        </p>
        </section>
        <section>
          <img src={mariadblogo} alt='Logo1'/>
          <img src={nodelogo} alt='Logo2'/>
          <img src={reactlogo} alt='Logo3'/>
        </section>
        <pre>v0.9.0.0</pre>
      </div>
    </div>
  );
}

export default About;