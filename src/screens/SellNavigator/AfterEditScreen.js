import React from 'react';
import { connect } from 'react-redux';
import {getProductsLoading} from "./../../actions";

const AfterEditScreen = ({getProductsLoading, navigation}) => {
    getProductsLoading();
    navigation.navigate('Listing');

    return null;
};

export default connect(null, {getProductsLoading})(AfterEditScreen);