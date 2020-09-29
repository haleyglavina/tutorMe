import React, {useState, useContext, useEffect} from 'react';
import './Nav.scss';
import { Link, Redirect, useParams } from 'react-router-dom';
import app from '../../utils/firebase';
import { AuthContext } from '../../utils/Auth';
import axios from 'axios';

function Nav() {

  const { currentUser, isTutor, tutorId} = useContext(AuthContext);
  const [signedOut, setSignedOut] = useState(false);

  // Nav when not signed in
  if (!currentUser) {
    return (
      <nav className="nav-bar">
        <div className="nav-bar__logo">
          <Link className="nav-bar__link" to='/'>
            <h1 className="nav-bar__title">Tutor Me</h1>
          </Link>
        </div>
        <div className="nav-bar__options">
          <Link className="nav-bar__link" to="/sign-in">
            <p className="nav-bar__option nav-bar__option--login">Log In</p>
          </Link>
        </div>
      </nav>
    );
  }

  // Nav when we're signed in
  const signOut = () => {
    app.auth().signOut().then(function() {
      console.log('Signed Out');
      setSignedOut(true);
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  if (signedOut) {
    return <Redirect to="/" />;
  }

  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo">
        <Link className="nav-bar__link" to='/'>
          <h1 className="nav-bar__title">Tutor Me</h1>
        </Link>
      </div>
      <div className="nav-bar__options">
        {isTutor
          ? <Link className="nav-bar__link" to={`/myStudents/${tutorId}`}>
              <p className="nav-bar__option">My Students</p>
            </Link>
          : null
        }
        <p className="nav-bar__option" onClick={signOut}>Sign Out</p>
      </div>
    </nav>
  );
}

export default Nav;