import React, { Component } from 'react';
import {Image, View, TouchableOpacity, Platform} from 'react-native';
import { Container, Content, H3, Text } from 'native-base';
import { CustomButton } from "../../components/Button";
import Share from "../../components/Share";
import Icon from "../../components/Icon";
import {colors, logo} from "../../config";
import {width, height, normalize360, resetNavigationPage} from "../../utilities";
import { connect } from 'react-redux';
import {getProductsLoading} from "./../../actions";
import StatusBar from "../../components/StatusBar";

const styles = {
    content: {
        width,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
    },
    button: {
        backgroundColor: colors.primary,
        width: '80%',
        borderRadius: normalize360(10),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: normalize360(13),
        marginBottom: normalize360(15)
    },
    logo: {
        width: normalize360(112),
        height: normalize360(92),
        marginTop: normalize360(30),
        marginBottom: normalize360(62)
    },
    title: {
        fontWeight: 'bold',
        marginBottom: normalize360(20)
    },
    text: {
        fontSize: normalize360(15)
    },
    view: {
        marginTop: normalize360(70),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconButtonWrapper: {
        width: '100%',
        alignItems: 'flex-end',
        padding: normalize360(10)
    },
    icon: {
        margin: normalize360(10)
    }
};

class Posted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentWillMount(): void {
        const {getProductsLoading} = this.props;

        getProductsLoading();
    }

    getTitle = title => title.toLowerCase().split(' ').join('-');

    toggleShare() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {navigation} = this.props;
        const myProduct = Object.values(this.props.products),
            length = myProduct.length - 1,
            id = myProduct[length].entity_id,
            title = this.getTitle(myProduct[length].meta_title);
        const url = `https://www.dev.golfing.brsw.io/index.php/catalog/product/view/id/${id}/s/${title}/`;

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Content contentContainerStyle={styles.content}  style={{backgroundColor: colors.white}} showsVerticalScrollIndicator={false}>
                    <View style={styles.iconButtonWrapper}>
                        <TouchableOpacity onPress={() => navigation.navigate('Listing')}>
                            <Icon name="close" color={colors.primary} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <Image source={logo} style={styles.logo} />

                    <H3 style={styles.title}>Congratulations</H3>
                    <Text style={styles.text}>
                        Your Listing is now active on the Exchange.
                    </Text>

                    <View style={styles.view}>
                        <CustomButton
                            name="Add Another Listing"
                            color={colors.white}
                            style={styles.button}
                            press={() => resetNavigationPage(navigation, 'Sellpage')}
                        />

                        <CustomButton
                            name="Share Your Listing"
                            color={colors.white}
                            style={styles.button}
                            press={this.toggleShare.bind(this)}
                        />
                    </View>
                </Content>

                <Share visible={this.state.visible} toggle={this.toggleShare.bind(this)} url={url} />
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.data
    }
}

export default connect(mapStateToProps, {getProductsLoading})(Posted);