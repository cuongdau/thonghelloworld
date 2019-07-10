import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTH } from './../types';
import { fetchSignInFb } from "../api";
import {setSignInApiSuccess, setSignInApiError, setSignInApiLogout} from "../actions";

function* handleConsoleData(action) {
    try {
        // while don't know api url
        const user = yield call(fetchSignInFb, action.email);
        yield put(setSignInApiSuccess(user));
        yield action.navigation.navigate(action.navigation.state.params.navigator);
    } catch(error) {
        // dispatch error
        yield put(setSignInApiError(error.toString()));
        yield put(setSignInApiLogout());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(AUTH.SIGN_IN_FB_LOADING, handleConsoleData);
}