// import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

// export const checkProps = (component, confirmingPropTypes) => {
//   const propError = checkPropTypes(
//     component.propTypes,
//     confirmingPropTypes,
//     'prop',
//     component.name);

//   expect(propError).toBeUndefined();
// };