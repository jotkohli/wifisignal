import {runSaga, RunSagaOptions} from 'redux-saga';
import dataArr from '../src/json/json';
import PropTypes from 'prop-types';
import {SaveDataAction} from '../src/module/mainSaga/actions';
import {onGetDataRequested} from '../src/module/mainSaga/saga';

interface RunSagaProps<Action, State> {
  dispatch: (action: Action) => void;
  getState: () => State;
}
describe('Saga Tests', () => {
  describe('onGetDataRequested', () => {
    test('should put SaveDataAction with the correct data', async () => {
      const fakePut = (action: any) => {
        // Assert the dispatched action
        expect(action).toEqual(SaveDataAction(Object.values(dataArr)));
      };

      // Run the saga
      await runSaga(
        {
          dispatch: fakePut,
          getState: () => {},
        },
        function* () {
          yield onGetDataRequested();
        },
      ).toPromise();
    });

    test('should put SaveDataAction with an error when UpdatedData is undefined', async () => {
      const fakePut = (action: any) => {
        // Assert the dispatched action
        expect(action).toEqual(SaveDataAction({err: 'error'}));
      };

      // Run the saga
      await runSaga(
        {
          dispatch: fakePut,
          getState: () => {},
        },
        function* () {
          yield onGetDataRequested();
        },
      ).toPromise();
    });
  });
});
