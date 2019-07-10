/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import SplashScreen from 'react-native-smart-splash-screen';
import AppNavigator from './src/Navigator';
import { connect } from 'react-redux';
import {onAddCategories, getProductsLoading, getBrandsLoading} from "./src/actions";

class App extends Component {
    componentDidMount () {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        });

        this.props.onAddCategories();
        this.props.getBrandsLoading();
        this.props.getProductsLoading();
    }

    render() {
        return (
            <AppNavigator />
        );
    }
}

export default connect(null, {
    onAddCategories,
    getBrandsLoading,
    getProductsLoading
})(App)
