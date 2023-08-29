import classes from './LoginForm.module.css';

import { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../../ui/dumbComponents/Form';
import Label from '../../ui/dumbComponents/Label';
import Input from '../../ui/dumbComponents/Input';
import Button from '../../ui/dumbComponents/Button';
import { authUserSelector } from '../../selectors/selectors';
import { loginAsync } from '../../redux/authActions';

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

  const inputNameHandler = useCallback((event) => { setLoginInput(event.target.value); }, []);

  const loginHandler = useCallback(
    async (event) => {
      event.preventDefault();
      if (!authUser) {
        dispatch(loginAsync(loginInput));
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
