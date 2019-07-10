import React from 'react';
import {Image} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {normalize360, resetNavigationPage} from "./utilities";
import { colors, icons } from "./config";

// AuthNavigator
import WelcomeScreen from './screens/AuthNavigator/WelcomeScreen';
import SignUpScreen from './screens/AuthNavigator/SignUpScreen';
import PasswordRecoveryScreen from './screens/AuthNavigator/PasswordRecoveryScreen';
import SignInScreen from './screens/AuthNavigator/SignInScreen';
import WebScreen from './screens/AuthNavigator/WebScreen';

// HomePageNavigator
import HomepageScreen from './screens/HomePageNavigator/HomepageScreen';
import RecentListingScreen from './screens/HomePageNavigator/RecentListingScreen';
import CategoryScreen from './screens/HomePageNavigator/CategoryScreen';
import SubcategoryScreen from './screens/HomePageNavigator/SubcategoryScreen';
import ProductScreen from './screens/HomePageNavigator/ProductScreen';
import DescriptionScreen from './screens/HomePageNavigator/DescriptionScreen';
import ReportScreen from './screens/HomePageNavigator/ReportScreen';
import SearchScreen from './screens/HomePageNavigator/SearchScreen';
import PolicyScreen from './screens/HomePageNavigator/PolicyScreen';
import SellersScreen from './screens/HomePageNavigator/SellersScreen';
import BrandScreen from './screens/HomePageNavigator/BrandScreen';
import AddFeedbackScreen from './screens/HomePageNavigator/AddFeedbackScreen';

// WishListNavigator
import WishListScreen from './screens/WishListNavigator/WishListScreen';

// SellNavigator
import SellScreen from './screens/SellNavigator/SellScreen';
import PostedScreen from './screens/SellNavigator/PostedScreen';
import AfterEditScreen from './screens/SellNavigator/AfterEditScreen';

// MessagesNavigator
import MessagesScreen from './screens/MessagesNavigator/MessagesScreen';
import ChatScreen from './screens/MessagesNavigator/ChatScreen';

// PersonalNavigator
import PersonalScreen from './screens/PersonalNavigator/PersonalScreen';
import ListingScreen from './screens/PersonalNavigator/ListingScreen';
import FeedbackScreen from './screens/PersonalNavigator/FeedbackScreen';
import OrdersScreen from './screens/PersonalNavigator/OrdersScreen';
import PurchasesScreen from './screens/PersonalNavigator/PurchasesScreen';
import OrderDetailsScreen from './screens/PersonalNavigator/OrderDetailsScreen';
import PurchaseDetailsScreen from './screens/PersonalNavigator/PurchaseDetailsScreen';
import MyShopScreen from './screens/PersonalNavigator/MyShopScreen';
import EditMyShopScreen from './screens/PersonalNavigator/EditMyShopScreen';
import EditPolicyScreen from './screens/PersonalNavigator/EditPolicyScreen';
import RecentlyViewedScreen from './screens/PersonalNavigator/RecentlyViewedScreen';
import OffersScreen from './screens/PersonalNavigator/OffersScreen';
import OfferHistoryScreen from './screens/PersonalNavigator/OfferHistoryScreen';
import MyDetailsScreen from './screens/PersonalNavigator/MyDetailsScreen';
import MyDetailsEditScreen from './screens/PersonalNavigator/MyDetailsEditScreen';
import PasswordScreen from './screens/PersonalNavigator/PasswordScreen';

// CartNavigator
import CartScreen from './screens/CartNavigator/CartScreen';
import ShippingScreen from './screens/CartNavigator/ShippingScreen';
import GuestShippingScreen from './screens/CartNavigator/GuestShippingScreen';
import PayScreen from './screens/CartNavigator/PayScreen';
import PayMethodScreen from './screens/CartNavigator/PayMethodScreen';
import SummaryScreen from './screens/CartNavigator/SummaryScreen';
import ExitCartScreen from './screens/CartNavigator/ExitCartScreen';
import AddNewAddressScreen from './screens/CartNavigator/AddNewAddressScreen';


import Icon from './components/Icon';
import {rgba} from "./utilities";

const styles = {
    icon: {
        width: normalize360(20),
        height: normalize360(20)
    }
};

const HomePageNavigator = StackNavigator({
        Homepage: {
            screen: HomepageScreen,
            navigationOptions: {
                headerTitle: 'Golfing'
            }
        },
        RecentListing: {
            screen: RecentListingScreen
        },
        Category: {
            screen: CategoryScreen
        },
        Subcategory: {
            screen: SubcategoryScreen
        },
        Product: {
            screen: ProductScreen
        },
        Description: {
            screen: DescriptionScreen
        },
        Report: {
            screen: ReportScreen
        },
        Search: {
            screen: SearchScreen
        },
        Policy: {
            screen: PolicyScreen
        },
        Sellers: {
            screen: SellersScreen
        },
        Brand: {
            screen: BrandScreen
        },
        HomeChat: {
            screen: ChatScreen
        }
    },
    {
        initialRouteName: 'Homepage',
        headerMode: 'none',
        transitionConfig: (currentState: any) => {
            return {
                screenInterpolator: CardStackStyleInterpolator.forHorizontal
            };
        }
    }
);

const WishListNavigator = StackNavigator({
        WishList: {
            screen: WishListScreen,
            navigationOptions: {
                headerTitle: 'WishList'
            }
        }
    },
    {
        headerMode: 'none',
        transitionConfig: (currentState: any) => {
            return {
                screenInterpolator: CardStackStyleInterpolator.forHorizontal
            };
        }
    }
);

const SellNavigator = StackNavigator({
        Sellpage: {
            screen: SellScreen,
            navigationOptions: {
                headerTitle: 'Sell'
            }
        }
    },
    {
        headerMode: 'none',
        transitionConfig: (currentState: any) => {
            return {
                screenInterpolator: CardStackStyleInterpolator.forHorizontal
            };
        }
    }
);

const MessagesNavigator = StackNavigator({
        Messages: {
            screen: MessagesScreen,
            navigationOptions: {
                headerTitle: 'Messages'
            }
        },
        Chat: {
            screen: ChatScreen
        }
    },
    {
        headerMode: 'none'
    }
);

const PersonalNavigator = StackNavigator({
        Personal: {
            screen: PersonalScreen,
            navigationOptions: {
                headerTitle: 'Personal'
            }
        },
        Listing: {
            screen: ListingScreen
        },
        Feedback: {
            screen: FeedbackScreen
        },
        Orders: {
            screen: OrdersScreen
        },
        OrderDetails: {
            screen: OrderDetailsScreen
        },
        Purchases: {
            screen: PurchasesScreen
        },
        PurchaseDetails: {
            screen: PurchaseDetailsScreen
        },
        MyShop: {
            screen: MyShopScreen
        },
        RecentlyViewed: {
            screen: RecentlyViewedScreen
        },
        Offers: {
            screen: OffersScreen
        },
        OfferHistory: {
            screen: OfferHistoryScreen
        },
        MyDetails: {
            screen: MyDetailsScreen
        },
        MyDetailsEdit: {
            screen: MyDetailsEditScreen
        },
        Password: {
            screen: PasswordScreen
        }
    },
    {
        headerMode: 'none',
        transitionConfig: (currentState: any) => {
            return {
                screenInterpolator: CardStackStyleInterpolator.forHorizontal
            };
        }
    }
);

const CartNavigator = StackNavigator({
        Cart: {
            screen: CartScreen
        },
        Shipping: {
            screen: ShippingScreen
        },
        GuestShipping: {
            screen: GuestShippingScreen
        },
        Pay: {
            screen: PayScreen
        },
        PayMethod: {
            screen: PayMethodScreen
        },
        Summary: {
            screen: SummaryScreen
        },
        ExitCart: {
            screen: ExitCartScreen
        },
        AddNewAddress: {
            screen: AddNewAddressScreen
        }
    },
    {
        headerMode: 'none'
    }
);

const MainNavigator = TabNavigator({
        Home: {
            screen: HomePageNavigator,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({focused}) => {
                    return <Image style={styles.icon} source={focused ? icons.bluehome : icons.greyhome}/>;
                },
                tabBarOnPress: ({scene, jumpToIndex}) => resetNavigationPage(navigation),
            }),
        },
        WishList: {
            screen: WishListNavigator,
            navigationOptions: {
                tabBarLabel: 'Watchlist',
                tabBarIcon: ({focused}) => {
                    return <Image style={styles.icon} source={focused ? icons.bluestar : icons.greystar}/>;
                },
            }
        },
        Sell: {
            screen: SellNavigator,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Sell',
                tabBarIcon: ({focused}) => {
                    return <Image style={styles.icon} source={focused ? icons.bluetag : icons.greytag}/>;
                },
                //tabBarOnPress: ({scene, jumpToIndex}) => resetNavigationPage(navigation, 'Sellpage'),
            })
        },
        Messages: {
            screen: MessagesNavigator,
            navigationOptions: {
                tabBarLabel: 'Messages',
                tabBarIcon: ({focused}) => {
                    return <Image style={styles.icon} source={focused ? icons.bluechat : icons.greychat}/>;
                },
            }
        },
        Profile: {
            screen: PersonalNavigator,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({focused}) => {
                    return <Image style={styles.icon} source={focused ? icons.blueuser : icons.greyuser}/>;
                },
            }
        }
}, {
    tabBarOptions: {
        activeTintColor: colors.primary,
        tintColor: '#ebebeb',
        style: {
            backgroundColor: "#f7f7f7",
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false
});

const AppNavigator = StackNavigator({
        Welcome: {
            screen: WelcomeScreen,
            navigationOptions: {
                header: null
            },
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
                headerTitle: 'Registration',
            },
        },
        SignIn: {
            screen: SignInScreen,
            navigationOptions: {
                headerTitle: 'Login',
            },
        },
        Web: {
            screen: WebScreen,
            navigationOptions: {
                headerTitle: 'Web Screen',
            },
        },
        PasswordRecovery: {
            screen: PasswordRecoveryScreen,
            navigationOptions: {
                headerTitle: 'Password Recovery',
            },
        },
        Homepage: {
            screen: MainNavigator,
            navigationOptions: {
                header: null,
                gesturesEnabled:false
            }
        },
        Sellpage: {
            screen: SellNavigator,
            navigationOptions: {
                header: null,
                gesturesEnabled:false
            }
        },
        Posted: {
            screen: PostedScreen,
            navigationOptions: {
                header: null,
            }
        },
        AfterEdit: {
            screen: AfterEditScreen,
            navigationOptions: {
                header: null,
            }
        },
        AddFeedback: {
            screen: AddFeedbackScreen,
            navigationOptions: {
                header: null,
            }
        },
        Cart: {
            screen: CartNavigator,
            navigationOptions: {
                header: null,
            }
        },
        EditMyShop: {
            screen: EditMyShopScreen,
            navigationOptions: {
                header: null,
            }
        },
        EditPolicy: {
            screen: EditPolicyScreen,
            navigationOptions: {
                header: null,
            }
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Homepage',
        transitionConfig: (currentState: any) => {
            return {
                screenInterpolator: CardStackStyleInterpolator.forHorizontal
            };
        }
    }
);

export default AppNavigator;