import React, {Component} from 'react';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import {Container, Card, CardItem, View, Text, Header, Left, Right, Title, Body} from 'native-base';
import Icon from './../../components/Icon';
import InputText from "../../components/InputTextSimple";
import LoadIndicator from "../../components/LoadIndicator";
import {normalize360, validateEmail, width} from "../../utilities";
import {colors} from './../../config';
import styles from "./style";
import {TextButton} from "../../components/Button";
import { connect } from 'react-redux';
import {submitUserData, customerAddressDelete} from '../../actions';
import StatusBar from "../../components/StatusBar";


const AddressItem = ({item, edit, remove, number}) => {
    const getItem = item =>
        `${item.firstname} ${item.lastname}\n\n${item.street}\n\n${item.city}\n\n${item.region}\n\n${item.country_id}\n\n${item.postcode}`;

    return (
        <View style={styles.itemWrapper}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Text style={styles.addressText}>{number + 1}. </Text>
                </View>
                <Text style={styles.addressText}>{getItem(item)}</Text>
            </View>
            <View style={styles.itemButtonWrapper}>
                <TouchableOpacity onPress={edit}>
                    <Icon name="create" color={colors.grey} fontSize={45} style={styles.iconButton}/>
                </TouchableOpacity>

                {item.is_default_billing === 0 && item.is_default_shipping === 0 &&
                    <TouchableOpacity onPress={remove}>
                        <Icon name="trash" color={colors.grey} fontSize={45} style={styles.iconButton}/>
                    </TouchableOpacity>}
            </View>
        </View>
    )
};


class MyDetailsScreen extends Component {
    state = {
        data: {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email: this.props.user.email
        },
        submit: false
    };

    handleChange = key => text => this.setState({
        data: {
            ...this.state.data,
            [key]: text
        }
    });

    handleSubmit = errors => {
        const {user, submitUserData} = this.props;
        this.setState({submit: true});
        Object.assign(user, this.state.data);
        const nextStep = Object.values(errors).every(error => error === null);
        nextStep ? submitUserData(user) : null;
    };

    handleAdd = () => {
        const { navigation } = this.props;
        navigation.navigate('MyDetailsEdit', {action: 'create'});
    };

    handleEdit = item => {
        const { navigation } = this.props;
        navigation.navigate('MyDetailsEdit', {item, action: 'edit'});
    };

    handleDelete = item => {
        const { user, customerAddressDelete} = this.props;
        return customerAddressDelete(user.entity_id, item.entity_id);
    };

    render() {
        const { data, submit } = this.state;
        const { navigation, customer, loading } = this.props;

        const billing = customer.filter(item => item.is_default_billing > 0);
        const shipping = customer.filter(item => item.is_default_shipping > 0);
        const others = customer.filter(item => item.is_default_billing === 0 && item.is_default_shipping === 0);

        const errors = {
            firstname: data.firstname.length < 1 ? 'Please fill first name' : null,
            lastname: data.lastname.length < 1 ? 'Please fill last name' : null,
            email: data.email.length < 1 ? 'Please fill email' : !validateEmail(data.email) ?
                'Incorrect format of email' : null
        };

        return (
            <Container>
                {Platform.OS === "ios" && <StatusBar />}

                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" color={colors.icon}/>
                        </TouchableOpacity>
                    </Left>
                    <Body style={Platform.select({
                        ios: {
                            alignItems: 'flex-start', marginLeft: normalize360(-100)
                        }
                    })}>
                        <Title style={{color: colors.icon}}>My Details</Title>
                    </Body>
                    <Right>
                        <TextButton name="SAVE" color={colors.icon}  style={styles.right}
                                    press={() => this.handleSubmit(errors)}/>
                    </Right>
                </Header>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Card style={styles.shippingFormWrapper}>
                        <CardItem style={{flexDirection: 'column', backgroundColor: '#f7f7f7'}}>
                            <InputText label='First name'
                                       name='firstname'
                                       value={data.firstname}
                                       error={submit ? errors.firstname : null}
                                       onChange={this.handleChange('firstname')}
                                       submit={submit}
                                       style={styles.inputText}/>
                            <InputText label='Last name'
                                       name='lastname'
                                       value={data.lastname}
                                       error={submit ? errors.lastname : null}
                                       onChange={this.handleChange('lastname')}
                                       submit={submit}
                                       style={styles.inputText}/>
                            <InputText label='Email address'
                                       name='email'
                                       value={data.email}
                                       error={submit ? errors.email : null}
                                       onChange={this.handleChange('email')}
                                       submit={submit}
                                       style={styles.inputText}/>
                        </CardItem>
                    </Card>


                    <Card style={styles.shippingRadioWrapper}>
                        <CardItem style={{backgroundColor: '#f7f7f7'}}>
                            <View>
                                <View style={{
                                    width: 0.85 * width,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.shippingRadioLabel}>SHIPPING ADDRESS</Text>
                                </View>

                                {shipping.length > 0 && shipping.map((item, index) =>
                                    <AddressItem
                                        key={item.entity_id}
                                        number={index}
                                        item={item}
                                        edit={() => this.handleEdit(item)}
                                    />
                                )}

                                <View style={styles.addButton}>
                                    <TextButton name="ADD NEW" color={colors.primary} style={styles.addButtonName}
                                                press={this.handleAdd}/>
                                </View>
                            </View>
                        </CardItem>
                    </Card>

                    <Card style={styles.shippingRadioWrapper}>
                        <CardItem style={{backgroundColor: '#f7f7f7'}}>
                            <View>
                                <View style={{
                                    width: 0.85 * width,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.shippingRadioLabel}>BILLING ADDRESS</Text>
                                </View>

                                {billing.length > 0 && billing.map((item, index) =>
                                    <AddressItem
                                        key={item.entity_id}
                                        number={index}
                                        item={item}
                                        edit={() => this.handleEdit(item)}
                                    />
                                )}

                                <View style={styles.addButton}>
                                    <TextButton name="ADD NEW" color={colors.primary} style={styles.addButtonName}
                                                press={this.handleAdd}/>
                                </View>
                            </View>
                        </CardItem>
                    </Card>

                    <Card style={styles.shippingRadioWrapper}>
                        <CardItem style={{backgroundColor: '#f7f7f7'}}>
                            <View>
                                <View style={{
                                    width: 0.85 * width,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={styles.shippingRadioLabel}>OTHER ADDRESSES</Text>
                                </View>

                                {others.length > 0 && others.map((item, index) =>
                                    <AddressItem
                                        key={item.entity_id}
                                        number={index}
                                        item={item}
                                        edit={() => this.handleEdit(item)}
                                        remove={() => this.handleDelete(item)}
                                    />
                                )}

                                <View style={styles.addButton}>
                                    <TextButton name="ADD NEW" color={colors.primary} style={styles.addButtonName}
                                                press={this.handleAdd}/>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                </ScrollView>

                <LoadIndicator animating={loading} />
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.login.user,
        customer: state.customer.data,
        loading: state.login.loading
    }
}

export default connect(mapStateToProps, {submitUserData, customerAddressDelete})(MyDetailsScreen);