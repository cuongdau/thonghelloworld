import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Container, Tab, Tabs, List, ListItem} from "native-base";
import WatchlistItem from "../../components/WatchlistItem";
import Header from "../../components/Header";
import {colors} from "../../config";
import tabsStyles from './../../styles/TabsStyles';
import {list} from './../../data/';

const TabContent = ({navigation, data}) => (
    <ScrollView>
        <List>
        {data.map((item, index) =>(
            <ListItem key={index} noBorder={true} style={{paddingTop: 0, paddingBottom: 0, marginLeft: 0, paddingRight: 0}}>
                <WatchlistItem image={item.uri}
                               title={item.title}
                               oldPrice={item.oldPrice}
                               newPrice={item.newPrice}
                               quality={item.quality}
                               onPress={() => navigation.navigate('Description')}
                               onTrashPress={() => alert('Trash')}
                               onAddToCartPress={() => {alert('Add to cart')}}
                />
            </ListItem>
        ))}
        </List>
    </ScrollView>
);

class RecentlyViewedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: list.products.slice(2, 3),
            perWeek: list.products.slice(1, 4),
            perMonth: list.products
        }
    }

    render () {
        return (
            <Container>
                <Header
                    containerStyle={{elevation: 0}}
                    leftIcon="arrow-back"
                    headTitle="Recently Viewed"
                    iconColor={colors.white}
                    leftIconPress={() => this.props.navigation.goBack()}
                />
                <Tabs>
                    <Tab heading='TODAY'
                         activeTabStyle={tabsStyles.activeSellersTabStyle}
                         tabStyle={tabsStyles.tabSellersStyle}
                         textStyle={tabsStyles.tabTextStyle}
                         activeTextStyle={tabsStyles.activeSellersTabTextStyle}
                    >
                        <TabContent navigation={this.props.navigation} data={this.state.today}/>
                    </Tab>

                    <Tab heading='PER WEEK'
                         activeTabStyle={tabsStyles.activeSellersTabStyle}
                         tabStyle={tabsStyles.tabSellersStyle}
                         textStyle={tabsStyles.tabTextStyle}
                         activeTextStyle={tabsStyles.activeSellersTabTextStyle}
                    >
                        <TabContent navigation={this.props.navigation} data={this.state.perWeek}/>
                    </Tab>

                    <Tab heading='PER MONTH'
                         activeTabStyle={tabsStyles.activeSellersTabStyle}
                         tabStyle={tabsStyles.tabSellersStyle}
                         textStyle={tabsStyles.tabTextStyle}
                         activeTextStyle={tabsStyles.activeSellersTabTextStyle}
                    >
                        <TabContent navigation={this.props.navigation} data={this.state.perMonth}/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default RecentlyViewedScreen;
