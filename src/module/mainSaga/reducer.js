import {createReducer, createSlice} from '@reduxjs/toolkit';

import {
  GetDataAction,
  DataUpdateAction,
  SaveDataAction,
  DataUpdateActionSuccess,
} from './actions';

const initialState = {
  loading: false,
  data: {},
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(SaveDataAction, (state, action) => {
    // console.log('action.payload', action.payload);
    return {...state, data: action.payload};
  });
  builder.addCase(DataUpdateActionSuccess, (state, action) => {
    // console.log('action.payload', action.payload);
    return {...state, data: action.payload};
  });
});

export default reducer;
