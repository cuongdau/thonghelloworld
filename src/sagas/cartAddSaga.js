import { takeEvery, call, put } from 'redux-saga/effects';
import { CART } from './../types';
import {fetchAddToCart} from "../api";
import {setCartInfoSuccess, setCartInfoError} from "../actions";

function* handleConsoleData(product) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/product/add
        const cart = yield call(fetchAddToCart, product.data);
        yield put(setCartInfoSuccess(cart));

    } catch (error) {
        // dispatch error
        yield put (setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.ADD_TO_CART_LOADING, handleConsoleData);
}