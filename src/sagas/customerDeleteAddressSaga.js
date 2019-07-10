import { takeEvery, call, put } from 'redux-saga/effects';
import { CUSTOMER } from './../types';
import { fetchDeleteAddress, fetchCustomerInfo } from "../api";
import { customerInfoSuccess, customerInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers/3864/addresses/
        yield call(fetchDeleteAddress, action.item);

        const info = yield call(fetchCustomerInfo, action.user); // action.id
        yield put(customerInfoSuccess(info));
    } catch (error) {
        // dispatch error
        yield put(customerInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CUSTOMER.DELETE_USER_ADDRESS, handleConsoleData);
}