import React from 'react';
import { Container, Content, View } from 'native-base';
import Header from './../../components/Header';
import LoadIndicator from './../../components/LoadIndicator';
import { LightRoundedButton } from "../../components/Button";
import {colors} from "../../config";
import styles from './style';
import Suitcase from "../../components/Suitcase";
import { connect } from 'react-redux';
import {HOME} from "../../types";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";


const BrandScreen = ({ navigation, brands, addBrand, getCategoriesByBrand, loading }) => {
    const handleBrand = brand => {
        addBrand(brand.name);
        getCategoriesByBrand(brand.id, navigation);
    };

    return (
        <Container>
            {Platform.OS === "ios" && <StatusBar />}
            <Header
                leftIcon="arrow-back"
                rightIcon="search"
                headTitle="All brands"
                iconColor={colors.icon}
                leftIconPress={() => navigation.goBack()}
                rightIconPress={() => navigation.navigate('Search')}
            />

            <Content showsVerticalScrollIndicator={false}>
                <View style={styles.brandButtonWrapper}>
                    {
                        Object.values(brands).map((brand, key) =>
                            <LightRoundedButton
                                key={key}
                                item={brand.name}
                                color={colors.primary}
                                buttonStyle={styles.buttonStyle}
                                press={() => handleBrand(brand)}
                            />
                        )
                    }
                </View>
            </Content>

            <Suitcase navigation={navigation} />

            <LoadIndicator animating={loading} />
        </Container>
    )
};

function mapStateToProps(state) {
    return {
        brands: state.allBrands.data.brands,
        loading: state.categoriesByBrand.loading
    }
}

function matchDispatchToProps(dispatch) {
    return {
        addBrand: payload => dispatch({type: HOME.ADD_BRAND, payload}),
        getCategoriesByBrand: (id, navigation) => dispatch({type: HOME.CATEGORIES_BY_BRAND_LOADING, id, navigation})
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(BrandScreen);