/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {render as rtlRender} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../src/redux/store';

const render = (component: React.ReactElement) =>
  rtlRender(<Provider store={store}>{component}</Provider>);

it('renders correctly', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});
