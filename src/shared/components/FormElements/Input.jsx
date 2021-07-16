import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      }
    default:
      return state;
  }
}
const Input = (props) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    {
      value: props.initialValue || '',
      isValid: props.initValid || false,
      isTouched: false
    });

    const {  id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
      onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

  const onChangeHandler = e => {
    dispatch({ type: 'CHANGE', val: e.target.value, validators: props.validators });
  }

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  }

  const element = (props.element === 'input' ?
    <input
      value={inputState.value}
      onChange={onChangeHandler}
      id={props.id}
      type={props.type}
      onBlur={touchHandler}
      placeholder={props.placeholder} />
    : <textarea
      value={inputState.value}
      onChange={onChangeHandler}
      onBlur={touchHandler}
      id={props.id}
      rows={props.rows || 3} />
  );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`} >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  )
}

export default Input
