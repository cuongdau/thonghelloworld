import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import styles from "./style";
import {colors} from "../../config";
import {connect} from 'react-redux';
import Header from "../../components/Header";
import tabsStyles from "../../styles/TabsStyles";
import Feedback from "../../components/Feedback";
import StatusBar from "../../components/StatusBar";

const FeedbackScreen = ({ navigation, shop }) => {
    const changeFeedbackPage = item => item === 'SENT' ?
        <Feedback navigation={navigation} review={shop.seller_sent_review}/> :
        <Feedback navigation={navigation} review={shop.seller_received_review}/>;

    const leftIconPress = () => navigation.goBack();

    return(
        <Container>
            {Platform.OS === "ios" && <StatusBar />}

            <Header
                containerStyle={{elevation: 0, borderBottomColor: 'transparent'}}
                leftIcon="arrow-back"
                headTitle="Feedback"
                iconColor={colors.icon}
                leftIconPress={leftIconPress}
            />

            <Tabs initialPage={0}
                  tabBarUnderlineStyle={styles.underlineStyle}>
                {
                    ['SENT', 'RECEIVED'].map((item, key) =>
                        <Tab key={key} heading={item}
                             activeTabStyle={tabsStyles.activeSellersTabStyle}
                             tabStyle={tabsStyles.tabSellersStyle}
                             textStyle={styles.tabTextStyle}
                             activeTextStyle={styles.activeMyShopTabTextStyle}
                        >
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{width: '100%', height: '100%'}}>
                                { changeFeedbackPage(item) }
                            </ScrollView>
                        </Tab>
                    )
                }
            </Tabs>
        </Container>
    )
};

function mapStateToProps(state) {
    return {
        shop: state.seller.data
    }
}

export default connect(mapStateToProps)(FeedbackScreen);




