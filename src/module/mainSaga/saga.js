import {takeEvery, put, call} from 'redux-saga/effects';
// import axios from 'axios';
import {DataUpdateAction, GetDataAction, SaveDataAction} from './actions';
import dataArr from '../../json/json';
function* onGetDataRequested() {
  try {
    const data = Object.values(dataArr);
    yield put(SaveDataAction(data));
  } catch (err) {
    console.log(err);
  }
}

function* onGetDataUpdated({payload}) {
  try {
    const data = Object.values(dataArr);
    const UpdatedData = data
      .sort((a, b) => b.bananas - a.bananas)
      .find((e, ind) => {
        if (e.name == payload) {
          return true;
        } else {
          return null;
        }
      });
    const UpdatedDataIndex = data
      .sort((a, b) => b.bananas - a.bananas)
      .findIndex((e, ind) => {
        if (e.name == payload) {
          return true;
        } else {
          return null;
        }
      });

    if (UpdatedData !== undefined && UpdatedDataIndex >= 0) {
      let ranked = {
        ...UpdatedData,
        rank: UpdatedDataIndex,
        isSearchedUser: true,
      };

      const length10 = data.sort((a, b) => b.bananas - a.bananas).slice(0, 10);

      if (length10.length > UpdatedDataIndex) {
        ranked = {
          ...UpdatedData,
          rank: UpdatedDataIndex + 1,
          isSearchedUser: true,
        };
        data
          .sort((a, b) => b.bananas - a.bananas)
          .splice(UpdatedDataIndex, 1, ranked);
      } else {
        data.sort((a, b) => b.bananas - a.bananas).splice(9, 1, ranked);
      }
      yield put(SaveDataAction(data));
    } else {
      yield put(SaveDataAction({err: 'error'}));
    }
  } catch (err) {
    console.log(err);
  }
}

function* sagaData() {
  yield takeEvery(GetDataAction, onGetDataRequested);
  yield takeEvery(DataUpdateAction, onGetDataUpdated);
}
export default sagaData;
export {onGetDataRequested, onGetDataUpdated, sagaData};
