import { takeEvery, call, put } from 'redux-saga/effects';
import { CART } from './../types';
import {fetchDeleteFromCart, fetchCartInfo} from "../api";
import {setCartInfoSuccess} from "../actions";

function* handleConsoleData(product) {
    try  {
        yield call(fetchDeleteFromCart, product.data);
        const cart = yield call(fetchCartInfo, product.data.quote_id);
        yield put(setCartInfoSuccess(cart));
    }
    catch (error) {
        // dispatch error
        console.log('ERROR', error.toString());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.DELETE_FROM_CART, handleConsoleData);
}