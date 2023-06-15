import {takeEvery, put, call} from 'redux-saga/effects';
// import axios from 'axios';
import {GetDataAction, SaveDataAction} from './actions';
import dataArr from '../../json/json';
function* onGetDataRequested() {
  try {
    const data = Object.values(dataArr);
    yield put(SaveDataAction(data));
  } catch (err) {
    console.log(err);
  }
}

function* sagaData() {
  yield takeEvery(GetDataAction, onGetDataRequested);
}
export default sagaData;
