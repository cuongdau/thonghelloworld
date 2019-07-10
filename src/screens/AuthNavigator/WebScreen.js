import React from 'react';
import {WebView, View, Platform} from 'react-native';
import Header from "./../../components/Header";
import StatusBar from './../../components/StatusBar';
import {API_URL, colors} from "../../config";
import {getTitle} from "../../utilities";
import styles from "./style";


const WebScreen = ({navigation}) => {
    const {page} = navigation.state.params;

    return (
        <View
            style={{flex: 1}}>
            {Platform.OS === "ios" && <StatusBar />}
            <Header
                leftIcon="arrow-back"
                iconColor={colors.primary}
                headTitle={getTitle(page)}
                headTitleStyle={{color: colors.primary}}
                containerStyle={styles.headWrapper}
                leftIconPress={() => navigation.goBack()}
            />

            <WebView
                source={{uri: `${API_URL}/mobilecms/page/content/page_id/${page}`}}
            />
        </View>
    )
};

export default WebScreen;