import { takeEvery, call, put } from 'redux-saga/effects';
import { SELLER } from './../types';
import { fetchSeller } from "../api";
import { shopInfoSuccess, shopInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/seller/:sellerId
        const shop = yield call(fetchSeller, {id: action.id, user: action.user});
        yield put(shopInfoSuccess(shop));
        if(action.navigator === 'MyShop' && !shop.seller_data.shopContactNumber)
            yield action.navigation.navigate('EditMyShop');
        else if(action.navigator)
            yield action.navigation.navigate(action.navigator, {navigator: action.parent});
        else
            yield action.navigation.goBack();
    } catch (error) {
        // dispatch error
        yield put(shopInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(SELLER.SHOP_INFO_LOADING, handleConsoleData);
}