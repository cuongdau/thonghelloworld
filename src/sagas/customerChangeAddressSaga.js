import { takeEvery, call, put } from 'redux-saga/effects';
import { CUSTOMER } from './../types';
import { fetchCreateAddress, fetchChangeAddress, fetchCustomerInfo } from "../api";
import { customerInfoSuccess, customerInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/customers/3864/addresses/
        const { values, navigation } = action;

        if(values.action === 'create')
            yield call(fetchCreateAddress, values);
        else
            yield call(fetchChangeAddress, values);

        const info = yield call(fetchCustomerInfo, values.user); // action.id
        yield put(customerInfoSuccess(info));
        yield navigation.goBack()
    } catch (error) {
        // dispatch error
        yield put(customerInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CUSTOMER.CHANGE_USER_ADDRESS, handleConsoleData);
}