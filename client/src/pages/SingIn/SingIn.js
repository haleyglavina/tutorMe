import React, { useCallback, useContext, useEffect, useState } from "react";
import './SignIn.scss';
import { withRouter, Redirect } from "react-router";
import app from "../../utils/firebase";
import { AuthContext } from "../../utils/Auth";
import Nav from '../../components/Nav/Nav';
import axios from 'axios';

const SignIn = ({ history }) => {

  const { currentUser, isTutor, tutorId } = useContext(AuthContext);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        // try making than a .then instead
        history.push(
          isTutor 
          ? `/myStudents`
          : `/${currentUser && currentUser.uid}`
        );
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  // const { currentUser, isTutor, tutorId } = useContext(AuthContext);

  if (currentUser && tutorId) {
    return <Redirect to={
      isTutor 
      ? `/myStudents`
      : `/${currentUser && currentUser.uid}`} 
    />;
  }

  return (
    <>
    <Nav />
    <main className="sign">
      <div className="sign__title-box">
        <h1 className="sign__title">Log in</h1>
      </div>
      <form onSubmit={handleLogin} className="form">
        <h2 className="form__title">Welcome back!</h2>
        <label className="form__label">
          Email
          <input className="form__in" name="email" type="email" placeholder="Email" autoComplete="new-password" />
        </label>
        <label className="form__label">
          Password
          <input className="form__in" name="password" type="password" placeholder="Password" autoComplete="new-password" />
        </label>
        <button className="form__btn" type="submit">Log In</button>
      </form>
    </main>
    </>
  );
};

export default withRouter(SignIn);