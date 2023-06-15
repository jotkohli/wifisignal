import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducer';
import rootSaga from './saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
};
// const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);
