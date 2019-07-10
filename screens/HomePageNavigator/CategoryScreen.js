import React from 'react';
import { Container, Content, View } from 'native-base';
import Header from './../../components/Header';
import { CategoryCard } from './../../components/Card';
import { connect } from 'react-redux';
import { colors } from "../../config";
import {HOME} from "../../types";
import Suitcase from "../../components/Suitcase";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";


const CategoryScreen = ({navigation, categories, brands, changeCategory, clearBrands, subcategory, clearCategoriesByBrand,
                            clearCategoryProducts, categoriesByBrand, changeSubCategory, clearFilters}) => {

    const handleCategories = category => {
        changeCategory(category);
        if(categoriesByBrand) {
            clearCategoriesByBrand();
        }
        if(category.children.length > 0)
            navigation.navigate('Subcategory');
        else {
            clearCategoryProducts();
            clearFilters();
            if(subcategory) changeSubCategory(null);
            navigation.navigate('Product');
        }
    };

    const handleCategoriesByBrand = category => {
        changeCategory(category);
        clearCategoryProducts();
        if(subcategory) changeSubCategory(null);
        navigation.navigate('Product');
    };

    return(
        <Container>
            {Platform.OS === "ios" && <StatusBar />}
            <Header
                leftIcon="arrow-back"
                rightIcon="search"
                headTitle="Category"
                iconColor={colors.icon}
                leftIconPress={() => navigation.goBack()}
                rightIconPress={() => navigation.navigate('Search')}
            />

            <Content style={{flex: 1, backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    {
                        categoriesByBrand && brands.length > 0 ?
                            Object.values(categoriesByBrand).map((category, key) =>
                                <CategoryCard
                                    key={key}
                                    category={category}
                                    onPress={() => handleCategoriesByBrand(category)}
                                />
                            ) :
                            categories.slice(0, categories.length - 2).map((category, key) =>
                                <CategoryCard
                                    key={key}
                                    category={category}
                                    onPress={() => handleCategories(category)}
                                />
                            )
                    }
                </View>
            </Content>

            <Suitcase navigation={navigation} />
        </Container>
    )
};

function matchDispatchToProps(dispatch) {
    return {
        changeCategory: category => dispatch({type: HOME.CHANGE_CATEGORY, category}),
        changeSubCategory: category => dispatch({type: HOME.CHANGE_SUBCATEGORY, category}),
        clearCategoryProducts: () => dispatch({type: HOME.CATEGORY_PRODUCTS_CLEAR}),
        clearFilters: () => dispatch({type: HOME.CLEAR_FILTERS}),
        clearCategoriesByBrand: () => dispatch({type: HOME.CLEAR_CATEGORIES_BY_BRAND})
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories.data,
        subcategory: state.subcategory,
        categoriesByBrand: state.categoriesByBrand.data.category,
        brands: state.filters.brands
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryScreen);