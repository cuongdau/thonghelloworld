import React from 'react';
import { Container, View, Content } from 'native-base';
import Header from './../../components/Header';
import { SubcategoryCard } from './../../components/Card';
import { connect } from 'react-redux';
import { colors } from "../../config";
import {HOME} from "../../types";
import styles from "./style";
import Suitcase from "../../components/Suitcase";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";


const SubcategoryScreen = ({navigation, category, changeSubCategory, clearCategoryProducts, clearFilters}) => {
    const handleCategories = subcategory => {
        changeSubCategory(subcategory);
        clearCategoryProducts();
        clearFilters();
        navigation.navigate('Product');
    };

    return(
        <Container>
            {Platform.OS === "ios" && <StatusBar />}
            <Header
                leftIcon="arrow-back"
                rightIcon="search"
                headTitle={category.name}
                iconColor={colors.icon}
                leftIconPress={() => navigation.goBack()}
                rightIconPress={() => navigation.navigate('Search')}
            />

            <Content style={{flex: 1, backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>
                <View style={styles.subcategoriesWrapper}>
                    {category.children.map((subcategory, key) =>
                        <SubcategoryCard
                            key={key}
                            category={category}
                            subcategory={subcategory}
                            onPress={() => handleCategories(subcategory)}
                        />
                    )}
                </View>
            </Content>

            <Suitcase navigation={navigation} />
        </Container>
    )
};

function matchDispatchToProps(dispatch) {
    return {
        changeSubCategory: category => dispatch({type: HOME.CHANGE_SUBCATEGORY, category}),
        clearCategoryProducts: () => dispatch({type: HOME.CATEGORY_PRODUCTS_CLEAR}),
        clearFilters: () => dispatch({type: HOME.CLEAR_FILTERS})
    }
}

function mapStateToProps(state) {
    return {
        category: state.category
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(SubcategoryScreen);