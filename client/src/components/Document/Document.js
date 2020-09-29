import React, {useState} from 'react';
import './Document.scss';
import MathDox from '../MathDox/MathDox';
//import { OM } from 'openmath-js';

function Document({elementLi, updateElement}) {
  // Editable document
  if (updateElement) {
    return (
      <>
        <div className="doc">
          {elementLi.map((elem, i) => {
            if (elem.tag === 'h1')
              return <h1 className="doc__title" contentEditable="true" key={i} onBlur={(e) => updateElement(i, e.target.innerText)}>{elem.content}</h1>
            if (elem.tag === 'date')
              return <h2 className="doc__date" key={i}>{elem.content}</h2>
            if (elem.tag === 'h2')
              return <h2 className="doc__subhead" contentEditable="true" key={i} onBlur={(e) => updateElement(i, e.target.innerText)}>{elem.content}</h2>
            if (elem.tag === 'p')
              return <p className="doc__text" contentEditable="true" key={i} onBlur={(e) => updateElement(i, e.target.innerText)}>{elem.content}</p>
            if (elem.tag === 'MathDox')
              return <MathDox content={elem.content} i={i} key={i}/>
          })}
        </div>
      </>
    );
  }

  // Not editable
  return (
    <>
      <div className="doc">
        {elementLi.map((elem, i) => {
          if (elem.tag === 'h1')
            return <h1 className="doc__title" key={i}>{elem.content}</h1>
          if (elem.tag === 'date')
            return <h2 className="doc__date" key={i}>{elem.content}</h2>
          if (elem.tag === 'h2')
            return <h2 className="doc__subhead" key={i}>{elem.content}</h2>
          if (elem.tag === 'p')
            return <p className="doc__text" key={i}>{elem.content}</p>
          if (elem.tag === 'MathDox')
            return <MathDox content={elem.content} i={i} key={i}/>
        })}
      </div>
    </>
  );
}

export default Document;