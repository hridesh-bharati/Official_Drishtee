import React, { useState } from 'react';
import Form from './ParentComponent';

const App = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (data) => {
    setSubmittedData([...submittedData, data]);
  };

  return (
    <div className='mt-5 pt-5'>
      <Form onSubmit={handleSubmit} />
      <div>
        <h2>Submitted Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
