import { takeEvery, call, put } from 'redux-saga/effects';
import { HOME } from './../types';
import { fetchProduct } from "../api";
import { setProductSuccess, setProductError } from "../actions";

function* handleConsoleData(item) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/products/1346/store/5
        const product = yield call(fetchProduct, item.id);
        yield put(setProductSuccess(product));
        yield item.navigation.navigate('Description',{navigator: item.navigator});
    } catch (error) {
        // dispatch error
        yield put(setProductError());
    }
}

export default function* watchDateLoader() {
    yield takeEvery(HOME.CHANGE_PRODUCT, handleConsoleData);
}