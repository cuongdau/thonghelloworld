import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTH } from './../types';
import { fetchChangeMainUserData, fetchGetMainUserData } from "../api";
import { setSignInApiSuccess, setSignInApiError, setSignInApiLogout } from "../actions";
import {Alert} from "react-native";

function* handleConsoleData(main) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers/:id
        yield call(fetchChangeMainUserData, main.values);
        const user = yield call(fetchGetMainUserData, main.values.entity_id);
        yield put(setSignInApiSuccess(user));
        Alert.alert(
            'Customers Changing',
            `Customer data successfully changed!`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
    } catch(error) {
        // dispatch error
        yield put(setSignInApiError(error.toString()));
        yield put(setSignInApiLogout());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(AUTH.CHANGE_USER_MAIN_LOADING, handleConsoleData);
}