import { takeEvery, call, put } from 'redux-saga/effects';
import {Alert} from 'react-native';
import { AUTH } from './../types';
import { fetchSignUpUser } from "../api";
import { setSignUpSuccess, setSignUpError, setSignUpLogout } from "../actions";

function* handleConsoleData(registration) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers
        Object.assign(registration.values, {"group_id": 4, "website_id": 5});
        const user = yield call(fetchSignUpUser, registration.values);
        yield put(setSignUpSuccess(user));
        Alert.alert(
            'Successful',
            'Thanks for creating your account. Please check your e-mail to complete your registration.',
            [
                {text: 'OK', onPress: () => registration.navigation.goBack()},
            ],
            { cancelable: false }
        );
    } catch(error) {
        // dispatch error
        yield put(setSignUpError(error.toString()));
        yield put(setSignUpLogout());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(AUTH.SIGN_UP_LOADING, handleConsoleData);
}