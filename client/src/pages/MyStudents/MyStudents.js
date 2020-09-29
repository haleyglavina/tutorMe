import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MyStudents.scss';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import user from '../../assets/user.svg';
import { AuthContext } from '../../utils/Auth';

function MyStudents() {
  const [studentLi, setStudentLi] = useState(null);
  //const {tutorId} = useParams();
  const { currentUser, isTutor, tutorId } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:8080/allStudents/${tutorId}`)
    .then(res => {
      setStudentLi(res.data);
    })
    .catch(err => console.log("Error getting student's lessons:", err));
  }, [])

  return (
    <>
      <Nav />
      <main className="students">
        <div className="students__container">
          <h2 className="students__subhead">My Students</h2>
          <ul className="student-card">
            {studentLi 
              ? studentLi.map((student) => (
                <Link to={`/${student.id}/${tutorId}`} className="link">
                  <li className="student-card__li" key={student.id} >
                    <div className="student-card__doc">
                      <img src={user} alt="Profile Pic" className="student-card__pic" />
                      <p className="student-card__title">{student.name}</p>
                      <p className="student-card__date">{`Grade ${student.grade}`}</p>
                    </div>
                  </li>
                </Link>
                ))
              : <h1 className="student-card__loading">Loading...</h1>}
          </ul>
        </div>
      </main>
    </>
  )
}

export default MyStudents;