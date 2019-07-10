import {call, put, takeEvery} from "redux-saga/effects";
import {CART} from "../types";
import {fetchCartAddAddress} from "../api";
import {setCartInfoError, setCartInfoSuccess} from "../actions";

const getAddress = (values, type) => {
    return {
        "mode": type,
        "firstname": values[type + "_firstname"],
        "lastname": values[type + "_lastname"],
        "company": "Brsw",
        "street": values[type + "_street"],
        "city": values[type + "_city"],
        "region": values[type + "_region"],
        "region_id": values[type + "_region_id"],
        "postcode": values[type + "_postcode"],
        "country_id": values[type + "_country_id"],
        "telephone": values[type + "_telephone"],
        "is_default_billing": 1,
        "is_default_shipping": 1,
        "store": values.store,
        "quote_id": values.quote_id
    }
};

function* handleConsoleData (action) {
    try {
        const {values, navigation} = action;

        if(!values.check) {
            const billing = yield getAddress(values, 'billing');
            yield call (fetchCartAddAddress, billing);
        }

        const shipping = yield getAddress(values, 'shipping');
        const cart = yield call (fetchCartAddAddress, shipping);

        yield put(setCartInfoSuccess(cart));
        yield navigation.navigate('Pay');
    } catch (error) {
        yield put(setCartInfoError(error.toString()));
    }
}

export default function* watchDateLoader() {
    yield takeEvery(CART.ADD_CART_ADDRESS, handleConsoleData);
}