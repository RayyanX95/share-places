import React, { useState } from 'react';

import './Auth.css';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from './../../shared/util/validators';
import { useForm } from './../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const Auth = (props) => {

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    }
  }, false);

  const authSubmitHandler = (e) => {
    e.preventDefault();

    console.log('Auth: ', formState.inputs);
  }

  const switchModeHandler = () => {
    const { email, password } = formState.inputs
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
      },
        email.isValid && password.isValid
      )
      setIsLoginMode((prevMode) => !prevMode);
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: false
        },
      },
        false
      )
      setIsLoginMode((prevMode) => !prevMode);
    }
  }


  return (
    <Card className="authentication" >
      <h2>Login Required</h2>
      <hr />
      <form className="place-form" onSubmit={authSubmitHandler} >
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password at least five character"
          onInput={inputHandler}
        />

        <Button
          type="submit"
          disabled={!formState.isValid} >
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button
        inverse
        onClick={switchModeHandler} >
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  )
}

export default Auth
