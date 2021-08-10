import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from './../../shared/util/validators';
import Button from './../../shared/components/FormElements/Button';
import { useForm } from './../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from './../../shared/context/auth-context';

const UpdatePlace = props => {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);


  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    }
  });

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
        setLoadedPlace(responseData.place);

        // TODO fix issue of setFormData, not working correctly
        // if (responseData.place) {
        //   setFormData(
        //     {
        //       title: {
        //         value: "responseData.place.title",
        //         isValid: true,
        //       },
        //       description: {
        //         value: "responseData.place.description",
        //         isValid: true,
        //       }
        //     },
        //     true
        //   );
        // }

      } catch (error) {
        // * Errors handled on useHttpClient
      };
    };
    fetchPlace();

  }, [setFormData, sendRequest, placeId]);



  const placeUpdateSubmitHandler = async e => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
        });

      history.push('/' + auth.userId + '/places');
    } catch (error) {

    };
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }
  if (!loadedPlace) {
    return (
      <Card>
        <div className="center" >
          <h2>Could not find place!</h2>
        </div>
      </Card>
    )
  };

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler} >
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initValid={true}
      />
      <Input
        id="description"
        element="textarea"
        type="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description"
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initValid={true}
      />
      <Button type="submit" disabled={!formState.isValid} >UPDATE PLACE</Button>
    </form>
  )
}

export default UpdatePlace;
