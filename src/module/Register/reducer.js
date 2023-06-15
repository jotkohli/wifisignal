import AsyncStorage from '@react-native-async-storage/async-storage';
import {createReducer, createSlice} from '@reduxjs/toolkit';

import {GetDataAction, DataUpdateAction, SaveDataAction} from './actions';

const initialState = {
  loading: false,
  data: {},
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(SaveDataAction, (state, action) => {
    console.log('action.payload', action.payload);
    return {...state, data: action.payload};
  });
});

export default reducer;
