import React from 'react';

const ScannedWords = ({ data }) => {

  return (
    data.scannedWords.length >0 &&
    <div>
      <h1 className="title">Ingredients found</h1>
      <div className="allergiesList">
        {data.loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
        {data.scannedWords}
      </div>
    </div>
  );
};

export default ScannedWords;
