import { takeEvery, call, put } from 'redux-saga/effects';
import { CUSTOMER } from './../types';
import { fetchCustomerInfo } from "../api";
import { customerInfoSuccess, customerInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers/3864/addresses/
        const info = yield call(fetchCustomerInfo, action.id); // action.id
        yield put(customerInfoSuccess(info));
        yield action.navigation.navigate(action.navigator)
    } catch (error) {
        // dispatch error
        yield put(customerInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CUSTOMER.MY_INFO_LOADING, handleConsoleData);
}