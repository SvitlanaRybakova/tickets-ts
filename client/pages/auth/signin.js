import AuthForm from '../../components/authForm';
import Layout from '../../components/layout';

const signin = () => {
  return (
    <Layout>
      <AuthForm title={'Sign In'} url={'/api/users/signin'} />
    </Layout>
  );
};

export default signin;
