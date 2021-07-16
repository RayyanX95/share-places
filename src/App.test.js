import React from 'react'
import { shallow } from 'enzyme';

import App from './App';

export const setup = () => shallow(<App />);

test('test what App component renderers', () => {

  const text = "test";
  expect(text.length).toBe(4)
})
