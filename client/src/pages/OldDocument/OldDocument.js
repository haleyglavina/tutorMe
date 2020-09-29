import React, {useState, useEffect} from 'react';
import './OldDocument.scss';
import axios from 'axios';
import Document from '../../components/Document/Document';
import { useParams, Link } from 'react-router-dom';

function OldDocument(props) {

  const [elementLi, setElementLi] = useState(null);
  const {studentId, lessonId, tutorId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/lesson/${studentId}/${lessonId}`)
      .then(res => {
        console.log("res: ", res);
        return setElementLi(res.data.elementLi)})
      .catch(err => console.log(err));
  }, [])

  if (!elementLi)
    return (
      <div>
        Loading...
      </div>
    )
    
  return (
    <main className="old-doc">
      <div className="old-doc__options">
        <Link to={`/${studentId}/${tutorId}`}>
          <button className="old-doc__btn">All Lessons</button>
        </Link>
      </div>
      <div className="old-doc__doc">
        <Document 
          elementLi={elementLi}
        />
      </div>
    </main>
  );
}

export default OldDocument;