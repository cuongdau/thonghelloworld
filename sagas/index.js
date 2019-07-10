import { all } from 'redux-saga/effects';
import regSaga from './regSaga';
import signInApiSaga from './signInApiSaga';
import signInFbSaga from './signInFbSaga';
import changeUserDataSaga from './changeUserDataSaga';
import categoriesSaga from './categoriesSaga';
import categoriesByBrandSaga from './categoriesByBrandSaga';
import brandsSaga from './brandsSaga';
import categoryProductsSaga from './categoryProductsSaga';
import productsSaga from './productsSaga';
import productSaga from './productSaga';
import sellProductSaga from './sellProductSaga';
import cartSaga from './cartSaga';
import cartInfoSaga from './cartInfoSaga';
import cartAddSaga from './cartAddSaga';
import promoSaga from './promoSaga';
import cartDeleteSaga from "./cartDeleteSaga";
import paySaga from "./paySaga";
import cartAddAddressSaga from "./cartAddAddressSaga";
import payMethodSaga from "./payMethodSaga";
import sellerSaga from "./sellerSaga";
import sellerEditSaga from "./sellerEditSaga";
import cartCustomerSaga from "./cartCustomerSaga";
import watchListInfoSaga from "./watchListInfoSaga";
import watchListAddSaga from "./watchListAddSaga";
import watchListDeleteSaga from "./watchListDeleteSaga";
import customerSaga from "./customerSaga";
import customerChangeAddressSaga from "./customerChangeAddressSaga";
import customerDeleteAddressSaga from "./customerDeleteAddressSaga";

export default function* appSaga() {
    yield all([
        regSaga(),
        signInApiSaga(),
        signInFbSaga(),
        changeUserDataSaga(),
        categoriesSaga(),
        categoriesByBrandSaga(),
        brandsSaga(),
        categoryProductsSaga(),
        productsSaga(),
        productSaga(),
        sellProductSaga(),
        cartSaga(),
        cartInfoSaga(),
        cartAddSaga(),
        cartDeleteSaga(),
        promoSaga(),
        paySaga(),
        cartAddAddressSaga(),
        payMethodSaga(),
        sellerSaga(),
        sellerEditSaga(),
        cartCustomerSaga(),
        watchListInfoSaga(),
        watchListAddSaga(),
        watchListDeleteSaga(),
        customerSaga(),
        customerChangeAddressSaga(),
        customerDeleteAddressSaga()
    ]);
}