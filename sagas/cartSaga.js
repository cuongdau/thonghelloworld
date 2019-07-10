import { takeEvery, call, put } from 'redux-saga/effects';
import { CART } from './../types';
import { fetchCartCreating} from "../api";
import {setCartInfoSuccess, setCartInfoError} from "../actions";

const store = {
    "store": 5
};

function* handleConsoleData() {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart
        // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{\"store\": 5}"
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart
        const cart = yield call(fetchCartCreating, store);
        yield put(setCartInfoSuccess(cart));
    } catch (error) {
        // dispatch error
        yield put(setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.CONSUMER_CART_LOADING, handleConsoleData);
}