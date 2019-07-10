import { SELL } from './../types';

export const sellProductData = values => ({
    type: SELL.PRODUCT_LOADING,
    values
});
