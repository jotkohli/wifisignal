import {all} from 'redux-saga/effects';

import sagaData from '../module/Register/saga';

export default function* rootSaga() {
  yield all([sagaData()]);
}
