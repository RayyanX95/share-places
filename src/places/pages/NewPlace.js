import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from './../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from './../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from './../../shared/components/UIElements/ErrorModal';
import { useHistory } from 'react-router-dom';

const NewPlace = () => {
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const history = useHistory();
  const auth = useContext(AuthContext)
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    }
  }, false);


  const placeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await sendRequest('http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId   
        }),
        {
          'Content-Type': 'application/json',
        });
      // // TODO redirect user to a different page
      history.push('/');
    } catch (error) {
      // * Errors are handled on useHttpClient
    };
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal overlay onClick={clearError} />}
      <form className="place-form" onSubmit={placeSubmitHandler} >
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler} />
        <Input
          id="description"
          element="input"
          type="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid Description"
          onInput={inputHandler} />
        <Input
          id="address"
          element="input"
          type="textarea"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler} />

        <Button type="submit" disabled={!formState.isValid} >
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  )
}

export default NewPlace
