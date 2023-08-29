import classes from './Login.module.css';

import LoginForm from '../../forms/loginForm/LoginForm';
const Login = () => {
  return (
    <div className={classes.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;
