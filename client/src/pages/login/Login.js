import classes from './Login.module.scss';

import LoginForm from '../../components/forms/loginForm/LoginForm';
const Login = () => {
  return (
    <div className={classes.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;
