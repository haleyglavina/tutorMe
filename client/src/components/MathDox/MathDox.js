import React, { useEffect } from 'react';
import './MathDox.scss';
import { makeDox } from '../../formulaeditor/main.js';

const MathDox = ({content, i, elementEdited}) => {
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "http://mathdox.org/formulaeditor/main.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = "http://mathdox.org/formulaeditor/org/mathdox/formulaeditor/FEConcatenation.js"
    script2.async = true;
    document.body.appendChild(script2);
    makeDox();
  }, []);

  return (
    <>
      <textarea 
        className='mathdoxformula' 
        id={`formula${i}`} 
        onInput={elementEdited ? ((e) => elementEdited(e, i)) : null}
      >
        {content ? content : null}
      </textarea>
    </>
  );
}

export default MathDox;