import { combineReducers } from 'redux';
import form from "./formReducer";
import registration from "./signUpReducer";
import login from "./signInApiReducer";
import categories from "./categoriesReducer";
import categoriesByBrand from "./categoriesByBrandReducer";
import category from "./categoryReducer";
import subcategory from "./subcategoryReducer";
import categoryProducts from "./categoryProductsReducer";
import allBrands from "./brandsReducer";
import products from "./productsReducer";
import product from "./productReducer";
import filters from "./filterReducer";
import search from "./searchReducer";
import degree from "./degreesReducer";
import cart from "./cartReducer";
import payment from "./payReducer";
import check from "./checkReducer";
import seller from "./sellerReducer";
import customer from "./customerReducer";
import watchlist from "./watchListReducer";
import listing from "./listingReducer";

const appReducer = combineReducers({
    form,
    registration,
    login,
    categories,
    categoriesByBrand,
    category,
    subcategory,
    categoryProducts,
    allBrands,
    products,
    product,
    search,
    degree,
    cart,
    payment,
    check,
    seller,
    customer,
    watchlist,
    filters,
    listing
});

export default appReducer;