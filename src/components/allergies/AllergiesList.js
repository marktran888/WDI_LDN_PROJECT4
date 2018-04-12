import React from 'react';

const AllergiesList = ({ handleChange, handleSubmit, deleteAllergy, data }) => {

  return (
    <div>
      <h1 className="title">Allergies List</h1>
      <ul className="allergiesList">
        {data.allergies.map((allergies, i) =>
          <li key={i}>{allergies}
            <span className="spanRight">
              <button className="btn" onClick={() => deleteAllergy(allergies)} >X</button>
            </span>
          </li>)}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New allergy"
            onChange={handleChange}
            value={data.newAllergy}
          />
          <button className="btn">Add</button>
        </form>
      </ul>
    </div>
  );
};

export default AllergiesList;
