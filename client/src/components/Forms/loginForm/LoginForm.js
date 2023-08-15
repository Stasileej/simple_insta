import classes from './LoginForm.module.css';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { authActions } from '../../redux/authSlice';
import { AUTH_USER } from '../../data/apiData';
import Form from '../../UI/dumbComponents/Form';
import Label from '../../UI/dumbComponents/Label';
import Input from '../../UI/dumbComponents/Input';
import Button from '../../UI/dumbComponents/Button';

const formText = {
  inputNameLabel: 'Enter your name',
  inputNameType: 'text',
  inputNameid: 'loginInput',
  buttonLogin: 'Login',
  buttonSubmitType: 'submit',
};

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const dispatch = useDispatch();

  const inputNameHandler = useCallback((event) => {
    setLoginInput(event.target.value);
  }, []);

  const loginHandler = useCallback((event) => {
    event.preventDefault();
    setIsAuthorized(true);
  }, []);

  const isFormValid = useMemo(() => loginInput.trim().length === 0, [loginInput]);

  useEffect(() => {
    if (isAuthorized) {
      localStorage.setItem(AUTH_USER, loginInput);
      dispatch(authActions.login(loginInput));
      setIsAuthorized(false);
      setLoginInput('');
    }
  }, [loginInput, dispatch, isAuthorized]);

  return (
    <Form onSubmit={loginHandler} className={classes.formLogin}>
      <Label htmlFor={formText.inputNameid} textContent={formText.inputNameLabel} />
      <Input type={formText.inputNameType} id={formText.inputNameid} onChange={inputNameHandler} value={loginInput} />
      <Button disabled={isFormValid} type={formText.buttonSubmitType}>
        {formText.buttonLogin}
      </Button>
    </Form>
  );
};

export default LoginForm;
