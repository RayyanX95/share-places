import React, { useState, useContext } from 'react';

import './Auth.css';
import Input from './../../shared/components/FormElements/Input';
import Button from './../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from './../../shared/util/validators';
import { useForm } from './../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from './../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from './../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Auth = () => {
  const auth = useContext(AuthContext)

  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    console.log("formInputs: ", formState.inputs);

    if (isLoginMode) {
      try {
        const parsedData = await sendRequest('http://localhost:5000/api/users/login',
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        console.log('parsedData.userId', parsedData.userId);
        auth.login(parsedData.userId, parsedData.token);
      } catch (error) {
        // * Errors are already handled by on useHttpClient
      };
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const parsedData = await sendRequest('http://localhost:5000/api/users/signup',
          'POST',
          formData,
        );

        auth.login(parsedData.userId, parsedData.token);
      } catch (error) {
        console.log(error);
      };

    }
  }

  const switchModeHandler = () => {
    const { email, password } = formState.inputs
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined,
        image: undefined,
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
        image: {
          value: null,
          isValid: false
        }
      },
        false
      )
      setIsLoginMode((prevMode) => !prevMode);
    }
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          {!isLoginMode && <ImageUpload id="image" center onInput={inputHandler} />}
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password at least 6 character"
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
