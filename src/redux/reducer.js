import {combineReducers} from 'redux';
import dataReducer from '../module/mainSaga/reducer';
const appReducer = combineReducers({
  data: dataReducer,
});

export default appReducer;
