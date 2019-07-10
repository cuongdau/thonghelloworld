import React from 'react';
import {Container, Content, View, Card, CardItem} from 'native-base';
import Header from './../../components/Header';
import Total from './../../components/Total';
import Payment from './../../components/Payment';
import {colors} from "../../config";
import styles from "./style";


const Pay = ({ navigation }) => {
    return(
        <Container>
            <Header
                leftIcon="arrow-back"
                headTitle="Pay"
                iconColor={colors.white}
                leftIconPress={() => navigation.goBack()}
            />

            <Content>
                <Card style={styles.shippingRadioWrapper}>
                    <CardItem>
                        <Payment navigation={navigation} navigator="Pay" />
                    </CardItem>
                </Card>

                <View style={styles.shippingTotalWrapper}>
                    <Total name="Continue" press={() => navigation.navigate('Summary')} />
                </View>
            </Content>
        </Container>
    )
};

export default Pay;