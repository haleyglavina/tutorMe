import React from 'react';


const symbols = ['a', 'b', '&pi;'];

function SymbolList({insertSymbol}) {
  return (
    <div className="symbol__container">
      {symbols.map(symbol => 
        <button className="symbol__btn" onClick={() => insertSymbol(symbol)}>{symbol}</button>)}
   </div>
  );
}

export default SymbolList;