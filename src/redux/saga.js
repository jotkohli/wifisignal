import {all} from 'redux-saga/effects';

import sagaData from '../module/mainSaga/saga';
export default function* rootSaga() {
  yield all([sagaData()]);
}
