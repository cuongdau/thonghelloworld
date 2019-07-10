import { takeEvery, call, put } from 'redux-saga/effects';
import { PAYMENT } from './../types';
import { fetchPaymentsInfo } from "../api";
import { payListSuccess, payListError } from "../actions";

function* handleConsoleData(pay) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/id/:id/store/:id/payment
        const info = yield call(fetchPaymentsInfo, pay.id);
        yield put(payListSuccess(info));
    } catch (error) {
        // dispatch error
        yield put(payListError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(PAYMENT.PAY_LIST_LOADING, handleConsoleData);
}