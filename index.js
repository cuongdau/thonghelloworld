import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/store";
import App from './App';

YellowBox.ignoreWarnings(['Setting a timer']);

const AppContainer = () =>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>;

AppRegistry.registerComponent('GolfingExchange', () => AppContainer);
