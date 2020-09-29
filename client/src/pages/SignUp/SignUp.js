import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router";
import app from "../../utils/firebase";
import Nav from '../../components/Nav/Nav';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const SignUp = ({ history }) => {

  const [tutorKeyOk, setTutorKeyOk] = useState(true);
  const [gradeOk, setGradeOk] = useState(true);
  const [nameOk, setNameOk] = useState(true);
  const [emailOk, setEmailOk] = useState(true);
  const [passwordsOk, setPasswordsOk] = useState(true);

  // Validate input fields
  const validateSignUp = async (target) => {
    console.log("validating...")
    const { tutorKey, grade, name, email, password, passwordCheck } = target.elements;

    // Check if passwords match
    if ((password.value !== passwordCheck.value) || !password.value) {
      await setPasswordsOk(false);
    }

    // Check if any fields are empty
    await setGradeOk(!!grade.value || false);
    await setNameOk(!!name.value || false);
    await setEmailOk(!!email.value || false);
    console.log(grade.value, name.value, email.value)

    setTimeout(() => {}, 1000);

    // Check if tutor key exists
    axios.post('http://localhost:8080/signup', {
      tutorKey: tutorKey.value,
      grade: grade.value,
      name: name.value,
      id: uuid()
    })
      .then(async res => {
        await setTutorKeyOk(res.data.success);
      })
      .catch(async err => {
        console.log(err);
        await setTutorKeyOk(false);
      });
    
    return {email, password, passwordsOk, tutorKeyOk, gradeOk, nameOk, emailOk};
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    validateSignUp(e.target)
      .then(({email, password, passwordsOk, tutorKeyOk, gradeOk, nameOk, emailOk}) => {
        console.log("After validation:", passwordsOk, tutorKeyOk, gradeOk, nameOk, emailOk)
        // If all checks passed, create new user
        if (passwordsOk && tutorKeyOk && gradeOk && nameOk && emailOk)
          addUser(email, password);
      })
  }

  const addUser = useCallback(async (email, password) => {
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <>
      <Nav />
      <main className="sign">
        <div className="sign__title-box">
          <h1 className="sign__title">Sign Up</h1>
        </div>
        <form  onSubmit={handleSignUp} className="form form--signup">
          <div className="form__inputs">
            <div className="form__column">
              <label className={tutorKeyOk ? 'form__label' : 'form__label form__label--tutor-error'}>
                Tutor's Key
                <input className="form__in" name="tutorKey" type="text" placeholder="Tutor's Key" />
              </label>
              <label className={gradeOk ? 'form__label' : 'form__label form__label--required'}>
                Grade
                <input className="form__in" name="grade" type="number" placeholder="i.e. 10" />
              </label>
              <label className={nameOk ? 'form__label' : 'form__label form__label--required'}>
                Name
                <input className="form__in" name="name" placeholder="Name" />
              </label>
            </div>

            <div className="form__column">
              <label className={emailOk ? 'form__label' : 'form__label form__label--required'}>
                Email
                <input className="form__in" name="email" type="email" placeholder="Email" />
              </label>
              <label className={passwordsOk ? 'form__label' : 'form__label form__label--password-error'}>
                Password
                <input className='form__in' name="password" type="password" placeholder="Password" autoComplete="new-password"/>
              </label>
              <label className={passwordsOk ? 'form__label' : 'form__label form__label--password-error'}>
                Confirm Password
                <input className="form__in" name="passwordCheck" type="password" placeholder="Password" autoComplete="new-password"/>
              </label>
            </div>
          </div>
          <button className="form__btn form__btn--signup" type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

export default withRouter(SignUp);