import React, { useState, useContext } from 'react';

import './Auth.css';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MIN, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from './../../shared/util/validators';
import { useForm } from './../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/ErrorModal';

const Auth = (props) => {
  const auth = useContext(AuthContext)

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        };

        setIsLoading(false);
        auth.login();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message || 'Something went wrong, please try again.');
      };
    } else {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        };

        setIsLoading(false);
        auth.login();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message || 'Something went wrong, please try again.');
      };

    }
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

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication" >
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  )
}

export default Auth
