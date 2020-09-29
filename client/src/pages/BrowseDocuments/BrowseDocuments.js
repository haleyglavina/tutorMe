import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BrowseDocuments.scss';
import plus from '../../assets/add.svg';
import Nav from '../../components/Nav/Nav';

function BrowseDocuments() {
  const [student, setStudent] = useState(null);
  const {studentId, tutorId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/allLessons/${studentId}`)
    .then(res => {
      setStudent(res.data);
    })
    .catch(err => console.log("Error getting student's lessons:", err));
  }, [])

  return (
    <>
      <Nav />
      <main className="browse">
        <div className="browse__content">
          <div className="browse__new">
            <h2 className="browse__subhead">New Lesson</h2>
            {student 
              ? <Link to={`/${studentId}/new/${tutorId}`} className="link">
                  <div className="mock-doc__new">
                    <p className="prev-docs__title">Start a new Lesson</p>
                    <img src={plus} className="plus-icon"></img>
                  </div>
                </Link>
              : <div className="mock-doc__new">
                  <p className="prev-docs__title">No new lesson</p>
                </div>
            }
          </div>
          <div className="browse__old">
            <h2 className="browse__subhead">Previous Lessons</h2>
            <ul className="prev-docs">
              {student 
                ? student.lessons.map((lesson, i) => (
                  <Link to={`/${student.id}/${lesson.id}/${tutorId}`} className="link">
                    <li className="prev-docs__li" key={lesson.id} >
                      <div className="prev-docs__doc">
                        <p className="prev-docs__title">{lesson.elementLi[0].content || `Lesson ${i}`}</p>
                        <p className="prev-docs__date">{lesson.elementLi[1].content || 'No Date'}</p>
                      </div>
                    </li>
                  </Link>
                  ))
                : <h1 className="prev-docs__loading">Loading...</h1>}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}

export default BrowseDocuments;