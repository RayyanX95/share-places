import checkPropTypes from 'check-prop-types';


export const checkProps = (component, confirmingPropTypes) => {
  const propError = checkPropTypes(
    component.propTypes,
    confirmingPropTypes,
    'prop',
    component.name);

  expect(propError).toBeUndefined();
};