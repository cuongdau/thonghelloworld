import { takeEvery, call, put } from 'redux-saga/effects';
import creditCardType from 'credit-card-type';
import { PAYMENT } from './../types';
import {getCurrentYear} from "../utilities";
import { fetchPayMethod, fetchCartInfo } from "../api";
import { setCartInfoSuccess, setCartInfoError } from "../actions";

function* handleConsoleData(action) {
    try {
        // https://www.dev.golfing.brsw.io/api/rest/restapi/cart/id/7014/store/5/payment 
        const { values, navigation, navigator, payments, cart} = action.data;
        const type = creditCardType(values.card)[0].type;
        const key = payments.map(pay => pay.title).indexOf(values.method);
        const method = payments[key].code;

        const body = {
            "po_number": null,
            "method": values.method ? method : "paypalexpress",
            "cc_cid": values.cvv,
            "cc_owner": values.name,
            "cc_number": values.card,
            "cc_type": values.method&&values.method!=="Paypal Express Payment" ? type : null,
            "cc_exp_year": values.year ? values.year : getCurrentYear().toString(),
            "cc_exp_month": values.month ? values.month : "01"
        };

        yield call(fetchPayMethod, {body, cart});
        const info = yield call(fetchCartInfo, cart);
        yield put(setCartInfoSuccess(info));
        yield navigation.navigate(navigator);
    } catch(error) {
        // dispatch error
        yield put(setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(PAYMENT.ADD_PAY_METHOD_LOADING, handleConsoleData);
}