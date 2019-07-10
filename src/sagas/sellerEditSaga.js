import { takeEvery, call, put } from 'redux-saga/effects';
import { SELLER } from './../types';
import {fetchEditSeller, fetchSeller} from "../api";
import { shopInfoSuccess, shopInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/seller/:sellerId
        yield call(fetchEditSeller, action);
        const shop = yield call(fetchSeller, {id: action.id, user: action.id});
        yield put(shopInfoSuccess(shop));
        yield action.navigation.goBack()
    } catch (error) {
        // dispatch error
        yield put(shopInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(SELLER.SHOP_EDIT_INFO_LOADING, handleConsoleData);
}