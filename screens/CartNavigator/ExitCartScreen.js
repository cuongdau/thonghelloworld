import React from 'react';
import { Image } from 'react-native';
import {Container, View, H3, Text} from 'native-base';
import { CustomButton } from "../../components/Button";
import { logo, colors } from "../../config";
import styles from './style';


const ExitCart = ({ navigation }) => {
    return (
        <Container>
            <View style={styles.exitCartContainer}>
                <Image source={logo} style={styles.exitCartLogo} />
                <H3 style={styles.exitCartH3}>Thank you for your purchase!</H3>

                <Text>You will receive an order confirmation email</Text>
                <Text>with details of your <Text style={{color: colors.primary}}>order</Text> and a link</Text>
                <Text>to track its progress</Text>

                <CustomButton
                    name="Continue shopping"
                    color={colors.white}
                    style={styles.exitCartButton}
                    press={() => navigation.navigate('Homepage')}
                />
            </View>
        </Container>
    )
};

export default ExitCart;