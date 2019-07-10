import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTH } from './../types';
import { fetchSignInApi } from "../api";
import { setSignInApiSuccess, setSignInApiError, setSignInApiLogout } from "../actions";

function* handleConsoleData(login) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers/login
        Object.assign(login.values, {"website_id": 5});
        const user = yield call(fetchSignInApi, login.values);
        yield put(setSignInApiSuccess(user));
        yield login.navigation.navigate(login.navigation.state.params.navigator);
    } catch(error) {
        // dispatch error
        yield put(setSignInApiError(error.toString()));
        yield put(setSignInApiLogout());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(AUTH.SIGN_IN_API_LOADING, handleConsoleData);
}