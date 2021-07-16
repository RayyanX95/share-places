import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Button from './../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
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


  const placeSubmitHandler = e => {
    e.preventDefault();
    // TODO send data to the BE
    console.log("state data: ", formState.inputs);
  }

  return (
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
  )
}

export default NewPlace
