import React, { Component } from 'react';
import {Alert, Platform, TouchableOpacity} from 'react-native';
import { Container, Header, Left, Right, View, Text, Card, CardItem, Content } from 'native-base';
import Icon from '../../components/Icon';
import InputText from '../../components/InputText';
import { TextButton } from '../../components/Button';
import { colors, store } from "../../config";
import { reduxForm, Field } from "redux-form";
import styles from "./style";
import { connect } from 'react-redux';
import {fetchAddSellerReview} from "../../api";
import { shopInfoLoading } from './../../actions';
import LoadIndicator from "../../components/LoadIndicator";
import StatusBar from "../../components/StatusBar";

const validate = value => {
    const errors = {};
    if(!value.name) {
        errors.name = 'please fill your name';
    }

    if(!value.feedback) {
        errors.feedback = 'please fill your feedback';
    }

    return errors;
};

class AddFeedback extends Component {
    state = {
        stars: 0
    };

    componentWillMount(): void {
        this.props.initialize({
            name: this.props.product.seller_profile.store_title
        });
    }

    handleEstimate = key => this.setState({stars: key});

    handleSubmitFeedback = values => {
        const {user, product, navigation, shopInfoLoading} = this.props;
        const {stars} = this.state;

        if(this.state.stars > 0) {
            Object.assign(values, {
                "rating": stars,
                "store_id": store,
                "seller_id": product.seller_profile.seller_id,
                "product_id": product.entity_id,
                "customer_id": user.entity_id
            });

            return fetchAddSellerReview(values)
                .then(response => response.json())
                .then(review => console.log(review))
                .then(() => shopInfoLoading(values.customer_id, values.seller_id, navigation))
                .catch(error => console.log(error.toString()));
        }
        Alert.alert('Please add stars!')
    };

    render() {
        const { navigation, handleSubmit, loading } = this.props;

        return(
            <Container>
                {Platform.OS === "ios" && <StatusBar />}
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="close" color={colors.icon} />
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <TextButton name="SAVE" color={colors.icon} press={handleSubmit(this.handleSubmitFeedback)} />
                    </Right>
                </Header>

                <Content>
                    <Card style={styles.feedbackWrapper}>
                        <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Text uppercase>Add your feedback</Text>
                            <Field name="name" label="Seller name" component={InputText} />
                            <Field name="feedback" label="Add your text" component={InputText} multiline={true}
                                maxLength={64} />
                            <Text style={styles.feedbackRatingText}>Add stars</Text>
                            <View style={styles.feedbackRatingWrapper}>
                                {
                                    new Array(5).fill('').map((item, key) => {
                                        return <Icon
                                            key={key}
                                            name="md-star-outline"
                                            color={key + 1 <= this.state.stars ? colors.primary :
                                                colors.black}
                                            press={() => this.handleEstimate(key + 1)}
                                        />
                                    })
                                }
                            </View>
                        </CardItem>
                    </Card>
                </Content>

                <LoadIndicator animating={loading} />
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        product: state.product.data,
        loading: state.seller.loading
    }
}

AddFeedback = connect(mapStateToProps, {shopInfoLoading})(AddFeedback);

export default reduxForm({
    form: 'addFeedback', // for unique id
    validate
})(AddFeedback);