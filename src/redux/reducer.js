import {combineReducers} from 'redux';
import dataReducer from '../module/Register/reducer';

const appReducer = combineReducers({
  data: dataReducer,
});
export default appReducer;
