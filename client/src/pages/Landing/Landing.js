import React from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';

function Landing() {
  return (
    <>
    <Nav />
    <main className="welcome-page">
      <div className="welcome">
        <p className="welcome__pretitle">Welcome to</p>
        <h1 className="welcome__title">Tutor Me</h1>
        <h2 className="welcome__subtitle">We make formatting math equations <span className="welcome__emphasis">easy</span> so the hard part of <span className="welcome__emphasis">math tutoring</span> is the math itself.</h2>
        <div className="log">
          <Link className="log__option" to='/sign-in'>Log In</Link>
          <Link className="log__option" to='/sign-up'>Sign Up</Link>
        </div>
      </div>
    </main>
    </>
  );
}

export default Landing;