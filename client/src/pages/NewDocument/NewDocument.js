import React, {useState} from 'react';
import './NewDocument.scss';
import Document from '../../components/Document/Document';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import pencil from '../../assets/pencil.svg';

function NewDocument(props) {

  const initialDoc = [
    {
      tag: 'h1',
      content: 'Title of Lesson'
    },
    {
      tag: 'date',
      content: (new Date()).toDateString()
    }
  ]
  const [elementLi, setElementLi] = useState(initialDoc);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const {studentId, tutorId} = useParams();

  // Add new formula, textbox, or heading
  const insertNew = (tag, content='') => {
    // Check if previous element was math
    if (elementLi[elementLi.length - 1] && elementLi[elementLi.length - 1].tag === 'MathDox')
      mathEdited(elementLi.length - 1);

    setElementLi(elementLi.concat([
      {
        tag,
        content
      }
    ]));
    console.log(elementLi);
  }

  // Adds new element to elementLi state
  const updateElement = (i, content) => {
    let newElementLi = [...elementLi];
    newElementLi[i].content = content;
    setElementLi(newElementLi);
  }

  // Gets OpenMath value from a formula in the real DOM to send to updateElement
  const mathEdited = (i) => {
    const openMath = window.org.mathdox.formulaeditor.FormulaEditor.getEditorByTextArea(`formula${i}`).getOpenMath(true).value;
    updateElement(i, openMath);
  }

  const endLesson = () => {
    // Check if last element in virtual DOM was math
    if (elementLi[elementLi.length - 1].tag === 'MathDox')
      mathEdited(elementLi.length - 1);

    console.log("Final element list:", elementLi);
    axios.post(`http://localhost:8080/lesson/${studentId}`, {
      elementLi
    })
      .then(res => console.log(res))
      .then(setShouldRedirect(true))
      .catch(err => console.log(err));
  }

  if (shouldRedirect)
    return <Redirect to={`/${studentId}/${tutorId}`} />

  return (
    <main className="new-doc">
      <div className="controls">
        <div className="controls__title-box">
          <img src={pencil} alt='pencil' className="controls__icon" />
          <h1 className="controls__title">{`Lesson with Bella`}</h1>
          <img src={pencil} alt='pencil' className="controls__icon" />
        </div>
        <h2 className="controls__subtitle">Insert new:</h2>
        <div className="controls__btns">
          <button className="controls__btn" onClick={() => insertNew('MathDox')}>Formula</button>
          <button className="controls__btn" onClick={() => insertNew('p')}>Textbox</button>
          <button className="controls__btn" onClick={() => insertNew('h2')}>Heading</button>
        </div>
        <h2 className="controls__subtitle">Math formulae:</h2>
        <div className="controls__panel-space"></div>
        <div className="controls__end">
          <button className="controls__btn controls__btn--end" onClick={endLesson}>End Lesson</button>
        </div>
      </div>
      <div className="new-doc__doc">
        <Document 
          elementLi={elementLi}
          updateElement={updateElement}
        />
      </div>
    </main>
  );
}

export default NewDocument;