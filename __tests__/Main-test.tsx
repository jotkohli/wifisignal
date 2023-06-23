import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Main from '../src/main';
import {DataUpdateAction} from '../src/module/mainSaga/actions';
// Create a mock store
const mockStore = configureMockStore([]);

describe('Main Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      data: {
        data: {},
      },
    });
  });

  it('renders the component correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    // Assert that necessary elements are rendered
    expect(getByPlaceholderText('Enter user name')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('dispatches DataUpdateAction when search button is pressed', async () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    // Enter search value
    const searchInput = getByPlaceholderText('Enter user name');
    fireEvent.changeText(searchInput, 'John');

    // Press search button
    const searchButton = getByText('Search');
    fireEvent.press(searchButton);

    // Expect the DataUpdateAction to be dispatched with the correct payload
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0]).toEqual(DataUpdateAction('John'));
    });
  });

  // Add more test cases for other scenarios
});

Main.propTypes = {};

export {};
