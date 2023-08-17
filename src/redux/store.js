import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
