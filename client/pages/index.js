import React from 'react';
import BuildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {

  return currentUser ? (
    <div> You are sign in</div>
  ) : (
    <div>You are sign out</div>
  );
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await BuildClient(context).get(`/api/users/currentuser`);

  return data;
};
export default LandingPage;
