import { takeEvery, call, put } from 'redux-saga/effects';
import { CART } from './../types';
import { fetchPromoLoading } from "../api";
import { setCartInfoSuccess, setCartInfoError } from "../actions";

function* handleConsoleData(promo) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/coupon
        // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST
        // -d "{\"store\": 5, \"quote_id\":\"6957\", \"coupon_code\":\"qwerty\"}"
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/coupon

        const result = yield call(fetchPromoLoading, promo.data);
        yield put(setCartInfoSuccess(result))
    } catch (error) {
        // dispatch error
        yield put (setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.PROMO_CODE_LOADING, handleConsoleData);
}