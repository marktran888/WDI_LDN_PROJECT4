import React from 'react';

const AllergiesFound = ({ data }) => {

  return (
    data.matchWords.length>0 && 
    <div>
      <h1 className="title">Allergies found</h1>
      {data.matchWords.length>0 ?  (
        <ul className="allergiesList2">
          {data.loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
          {data.matchWords.map((words, i) =>
            <li key={i}><i className="fas fa-exclamation-triangle"></i>{words}</li>)}
        </ul>
      ) : (
        <ul className="allergiesList">
          {data.loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
          {data.matchWords.map((words, i) =>
            <li key={i}><i className="fas fa-exclamation-triangle"></i>{words}</li>)}
        </ul>
      )}

    </div>
  );
};

export default AllergiesFound;
