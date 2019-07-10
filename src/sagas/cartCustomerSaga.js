import {takeEvery, call, put} from 'redux-saga/effects';
import {CART} from './../types';
import {fetchCartInfo, fetchAddCartCustomer} from "../api";
import {setCartInfoSuccess, setCartInfoError} from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/3833/customer
        yield call(fetchAddCartCustomer, action);
        const cart = yield call(fetchCartInfo, action.cart);
        yield put(setCartInfoSuccess(cart));
    } catch (error) {
        // dispatch error
        yield put(setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.CUSTOMER_TO_CART_LOADING, handleConsoleData);
}