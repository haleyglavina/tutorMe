// This code referenced from https://github.com/satansdeer/react-firebase-auth
// by Maksim Ivanov

import React, { useEffect, useState } from 'react';
import app from './firebase.js';
import axios from 'axios';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [isTutor, setIsTutor] = useState(false);
  const [tutorId, setTutorId] = useState(null);

  // Grab user object from firebase
  useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      //setCurrentUser(user);
      console.log("In auth!");
      
      if (user) {
        axios.get(`http://localhost:8080/allStudents/${user.uid}`)
        .then(res => {
          setIsTutor(res.data.length);

          // this user is a tutor, tutorId == their id
          if (res.data.length)
            return setTutorId(user.uid);

          // not a tutor, find their tutor's id
          axios.get(`http://localhost:8080/tutorId/${user.uid}`)
            .then(res => {
              console.log("Tutor id call:", res.data.tutorId);
              setTutorId(res.data.tutorId);
            })
            .catch(err => console.log(err));
            setPending(false);
        })
        .catch(err => console.log("Error checking if tutor:", err));
      }

      setCurrentUser(user);
      
    })
  }, []);

  // Determine if current user is a tutor
  /*
  useEffect(() => {
    if (currentUser && currentUser.uid) {
      axios.get(`http://localhost:8080/allStudents/${currentUser.uid}`)
      .then(res => {
        setIsTutor(res.data.length);

        // another axios call inside here
      })
      .catch(err => console.log("Error checking if tutor:", err));
    } else {
      setIsTutor(false);
    }
  }, [currentUser]);
  */

  // Whether a tutor or not, get their tutor's id
  /*
  useEffect(() => {
    if (isTutor)
      return setTutorId(currentUser && currentUser.uid);

    axios.get(`http://localhost:8080/tutorId/${currentUser && currentUser.uid}`)
      .then(res => {
        console.log("Tutor id call:", res.data.tutorId);
        setTutorId(res.data.tutorId);
      })
      .catch(err => console.log(err));
      setPending(false)
  }, [isTutor]);
  */
  /*
  if(pending){
    return <>Loading...</>
  }
  */

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isTutor,
        tutorId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};