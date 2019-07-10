import { takeEvery, call, put } from 'redux-saga/effects';
import { CART } from './../types';
import { fetchCartInfo } from "../api";
import { setCartInfoSuccess, setCartInfoError } from "../actions";

function* handleConsoleData(cart) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart
        const info = yield call(fetchCartInfo, cart.id);
        yield put(setCartInfoSuccess(info));
    } catch (error) {
        // dispatch error
        yield put(setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.CONSUMER_CART_INFO_LOADING, handleConsoleData);
}