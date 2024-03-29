import React from 'react';
import AuthForm from '../../components/authForm';
import Layout from '../../components/layout';

const signup = () => {
  return (
    <Layout>
      <AuthForm title={'Sign Up'} url={'/api/users/signup'} />
    </Layout>
  );
};

export default signup;
