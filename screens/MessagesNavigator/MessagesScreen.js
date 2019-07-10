import React, { Component } from 'react';
import {Image, Platform} from 'react-native';
import { Container, Text, Tabs, Tab, List, ListItem, View} from 'native-base';
import Header from './../../components/Header';
import StatusBar from "../../components/StatusBar";
import styles from './style';
import {colors} from "../../config";
import { list } from "../../data";


const MessageItem = ({ navigation }) => (
    <List>
        <ListItem style={styles.messageItemWrapper}
                  noBorder={true} onPress={() => navigation.navigate('Chat')}>
            <Image source={list.products[1].uri} style={styles.thumbnail} />
            <View style={styles.infoMessageItem}>
                <View style={styles.titleItemWrapper}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.itemPoint}>&#8226;</Text>
                        <Text style={styles.itemShopName}>Nike</Text>
                    </View>
                    <View>
                        <Text style={styles.itemBackTime}>1 min ago</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.itemMessage}>
                        Greyhound divisively hello coldly wonderfully marginally far…
                    </Text>
                </View>
            </View>
        </ListItem>
    </List>
);

class MessagesScreen extends Component {

    render() {
        const { navigation } = this.props;

        return(
            <Container style={{backgroundColor: '#f7f7f7'}}>
                {Platform.OS === "ios" && <StatusBar/>}

                <Header
                    rightIcon="search"
                    headTitle="Messages"
                    iconColor={colors.icon}
                    containerStyle={{elevation: 0, borderBottomColor: 'transparent'}}
                    rightIconPress={() => navigation.navigate('Search')}
                />

                <Tabs style={styles.myShopTabsWrapper} tabBarUnderlineStyle={styles.underlineStyle}>
                    <Tab heading={'UNREAD'}
                         activeTabStyle={styles.activeMyShopTabStyle}
                         tabStyle={styles.tabMyShopStyle}
                         textStyle={styles.tabTextStyle}
                         activeTextStyle={styles.activeMyShopTabTextStyle}
                    >
                        <MessageItem navigation={navigation} />
                    </Tab>

                    <Tab heading={'ALL'}
                         activeTabStyle={styles.activeMyShopTabStyle}
                         tabStyle={styles.tabMyShopStyle}
                         textStyle={styles.tabTextStyle}
                         activeTextStyle={styles.activeMyShopTabTextStyle}
                    >
                        <MessageItem navigation={navigation} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default MessagesScreen;