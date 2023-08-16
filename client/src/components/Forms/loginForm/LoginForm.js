import classes from './LoginForm.module.css';

import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from '../../redux/authSlice';
import { AUTH_USER } from '../../data/apiData';

import Form from '../../UI/dumbComponents/Form';
import Label from '../../UI/dumbComponents/Label';
import Input from '../../UI/dumbComponents/Input';
import Button from '../../UI/dumbComponents/Button';
import { authUserSelector } from '../../selectors/selectors';

const text = {
  inputNameLabel: 'Enter your name',
  inputNameType: 'text',
  inputNameid: 'loginInput',
  buttonLogin: 'Login',
  buttonSubmitType: 'submit',
};

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState('');

  const authUser = useSelector(authUserSelector);
  const dispatch = useDispatch();

  const inputNameHandler = useCallback((event) => {
    setLoginInput(event.target.value);
  }, []);

  const loginHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (!authUser) {
        localStorage.setItem(AUTH_USER, loginInput);
        dispatch(authActions.login(loginInput));
        setLoginInput('');
      }
    },
    [authUser, dispatch, loginInput]
  );

  const isFormValid = useMemo(() => loginInput.trim().length === 0, [loginInput]);

  return (
    <Form onSubmit={loginHandler} className={classes.formLogin}>
      <Label htmlFor={text.inputNameid} textContent={text.inputNameLabel} />
      <Input type={text.inputNameType} id={text.inputNameid} onChange={inputNameHandler} value={loginInput} />
      <Button disabled={isFormValid} type={text.buttonSubmitType}>
        {text.buttonLogin}
      </Button>
    </Form>
  );
};

export default LoginForm;
