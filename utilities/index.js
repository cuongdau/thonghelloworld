import React from 'react';
import { Dimensions, PixelRatio, Linking } from 'react-native';
import {NavigationActions} from "react-navigation";

const phonere = /^[-. ]?([0-9]{3})?[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/;
const emailre = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;


export const { width, height } = Dimensions.get('screen');

export const normalize = (size) => {
    // based on iphone 6 scale(as on design)
    const scale = width / 750;
    return PixelRatio.roundToNearestPixel(size * scale);
};

// improved normalize function
export const normalize360 = (size) => {
    // based on iphone 6 scale(as on design)
    const scale = width / 360;
    return PixelRatio.roundToNearestPixel(size * scale);
};

export const objectToQueryString = (object) => {
    return Object.keys(object).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
    }).join('&');
};

export const rgba = (colorString, opacity) => {
    return colorString + Math.round(opacity * 255 / 100).toString(16)
};

export const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        );

export const getRoundingNumber = number => number.toFixed(2);

export const validatePhone = phone => phonere.test(phone);

export const validateEmail = email => emailre.test(email.toLowerCase());

export const followTheLink = url => Linking.openURL(url);

export const getArrayValues = values => Object.entries(values);

export const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob)
    }));

export const getCurrentYear = () => new Date(Date.now()).getFullYear();

export const getKeyName = (product, field) => Object.keys(product)
    .filter(item => new RegExp(field.join('|')).test(item))
    .join();

export  const unique = array => {
    const result = [];
    array.map(item => result.indexOf(item) === -1 ? result.push(item) : null);
    return result;
};

export const number = str => Number(str.split(" ")[0]);

export const excludeCategories = category => category !== '215' && category !== '220';

export const resetNavigationPage = (navigation, navigator) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({
                routeName: navigator ? navigator : 'Homepage'
            })
        ]
    });
    navigation.dispatch(resetAction);
};

export const getTitle = page => {
    switch (page) {
        case 'terms-of-use':
            return 'Terms of Use';
        case 'privacy-policy':
            return 'Privacy Policy';
        case 'marketplace-policies':
            return 'Marketplace Policies'
    }
};