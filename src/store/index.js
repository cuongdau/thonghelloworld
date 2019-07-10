import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import appReducer from './../reducers';
import appSaga from './../sagas';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, appReducer);


const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(logger, sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(appSaga);

export { store, persistor };

