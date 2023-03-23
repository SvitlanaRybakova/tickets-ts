import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: ()=> Router.push('/')
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    doRequest();
    setPassword('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label htmlFor=''>Email Adress</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='form-control'
          type='text'
        />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          className='form-control mb-4'
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};

export default signup;
