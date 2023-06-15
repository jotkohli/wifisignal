import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Provider, useDispatch, useSelector} from 'react-redux';

import {store} from './redux/store';
import Main from './main';
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
