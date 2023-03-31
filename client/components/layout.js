import React from 'react';

const layout = ({ children }) => {
  return (
    <div className='container-fluid d-flex justify-content-center'>
      {children}
    </div>
  );
};

export default layout;
