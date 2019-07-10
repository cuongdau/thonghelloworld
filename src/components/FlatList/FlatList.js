import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { FLItemHomeHead, FLItemHomeBody, FLItemHomeFoot, FLItemSubcategory, FLItemHomeBrands,
    FLItemProductDegrees, FLItemProducts } from "../FlatListItem";
import {HOME} from "../../types";

const FlatListComponent = props => {
    const _keyExtractor = item => JSON.stringify(item);

    const handleCategories = category => {
        props.changeCategory(category);
        if(props.categoriesByBrand) {
            props.clearCategoriesByBrand();
        }
        if(category.children.length > 0)
            props.navigation.navigate('Subcategory');
        else {
            props.clearCategoryProducts();
            props.clearFilters();
            if(props.subcategory) props.changeSubCategory(null);
            props.navigation.navigate('Product', {parent: 'Product'});
        }
    };

    const handleProduct = product => {
        props.changeProduct(product, props.navigation);
    };

    const handleBrand = brand => {
        props.addBrand(brand.name);
        props.getCategoriesByBrand(brand.id, props.navigation);
    };

    const _renderItem = ({item}) => {
        switch(props.type) {
            case "home_head":
                return <FLItemHomeHead item={item} press={() => handleCategories(item)} />;
            case "home_body":
                return <FLItemHomeBody item={item[1]} press={() => handleProduct(item[0])} />;
            case "products":
                return <FLItemProducts item={item[1]} press={() => handleProduct(item[0])} />;
            case "home_foot":
                return <FLItemHomeFoot item={item} press={() => handleCategories(item)} />;
            case 'subcategory':
                return <FLItemSubcategory item={item} key={item.id} />;
            case "brands":
                return <FLItemHomeBrands item={item} press={() => handleBrand(item)} />;
            case "degrees":
                return <FLItemProductDegrees item={item} degree={props.degree}
                                             press={() => props.press(item)} />
        }
    };

    return (
        <FlatList
            data={props.data}
            extraData={props}
            horizontal={true}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            showsHorizontalScrollIndicator={false}
        />
    )
};

function matchDispatchToProps(dispatch) {
    return {
        changeCategory: category => dispatch({type: HOME.CHANGE_CATEGORY, category}),
        changeSubCategory: category => dispatch({type: HOME.CHANGE_SUBCATEGORY, category}),
        changeProduct: (id, navigation, navigator) => dispatch({type: HOME.CHANGE_PRODUCT, id, navigation, navigator}),
        clearCategoryProducts: () => dispatch({type: HOME.CATEGORY_PRODUCTS_CLEAR}),
        addBrand: payload => dispatch({type: HOME.ADD_BRAND, payload}),
        getCategoriesByBrand: (id, navigation) => dispatch({type: HOME.CATEGORIES_BY_BRAND_LOADING, id, navigation}),
        clearFilters: () => dispatch({type: HOME.CLEAR_FILTERS}),
        clearCategoriesByBrand: () => dispatch({type: HOME.CLEAR_CATEGORIES_BY_BRAND})
    }
}

function mapStateToProps(state) {
    return {
        degree: state.degree,
        category: state.category,
        subcategory: state.subcategory,
        categoriesByBrand: state.categoriesByBrand.data.category,
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(FlatListComponent);