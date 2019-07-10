import React, { Component } from 'react';
import {Item, Input, View} from 'native-base';
import Icon from './../../components/Icon';
import {connect} from 'react-redux';
import {normalize360} from "../../utilities";
import {promoCodeActionLoading} from "../../actions";


class Promotion extends Component {
    state = {
        code: ''
    };

    handleChangeCode = code => this.setState({ code });

    handlePromoSubmit = () => {
        const promo = {
            "quote_id": this.props.id,
            "coupon_code": this.state.code
        };
        this.props.promoCodeActionLoading(promo)
    };

    render() {
        return(
            <View style={{paddingHorizontal: normalize360(8)}}>
                <Item regular>
                    <Input placeholder='Promotion Code' onChangeText={this.handleChangeCode} />
                    <Icon name='add' press={this.handlePromoSubmit} />
                </Item>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
        id: state.cart.data.quote_id
    }
}

export default connect(mapStateToProps, {promoCodeActionLoading})(Promotion);