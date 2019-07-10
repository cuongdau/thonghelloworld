import React from 'react';
import {Platform, ScrollView} from 'react-native';
import { Container, Header, Content, Left, Right, H2, View, Text } from 'native-base';
import Icon from './../../components/Icon';
import styles from './style';
import {colors} from "../../config";
import StatusBar from "../../components/StatusBar";


const Policy = ({ navigation }) => (
    <Container>
        {Platform.OS === "ios" && <StatusBar />}
        <Header>
            <Left style={styles.iconLeftPolicy}>
                <Icon name="close" color={colors.white} press={() => navigation.goBack()} />
            </Left>

            <Right  style={styles.iconRightPolicy}>
                <Icon name="search" color={colors.white} press={() => navigation.navigate('Search')} />
            </Right>
        </Header>

        <Content>
            <H2 style={styles.h2Policy}>Private Policy</H2>
            <ScrollView>
                <View style={styles.wrapperPolicy}>
                    <Text>
                        This privacy policy sets out how Online.
                        Exchages uses and protects any information that you provide than
                        you use this website.
                        Online Exchanges is committed to ensuring that your privacy is protected.
                        Should we ask you to provide certain information by which you can be
                        identified when using this website, the you can be assured that it will only
                        be used in accordance with this privacy statement. Online Exchanges may
                        change this policy from time to time by updating this page. You should check
                        this page from time to time to ensure that you are happy with any changes.
                    </Text>
                </View>

                <View style={styles.wrapperPolicy}>
                    <Text style={[{color: colors.primary}, styles.title]}>WHAT WE COLLECT</Text>

                    <Text style={styles.textPolicy}>
                        We may collect the following information:
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>Name</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            Contact information including email address
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            Demografic information such as postcode, preferences and interests
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            Other information relevant to customer surveys and/or offers
                        </Text>
                    </View>
                </View>

                <View style={styles.wrapperPolicy}>
                    <Text style={[{color: colors.primary}, styles.title]}>WHAT WE COLLECT</Text>

                    <Text style={styles.textPolicy}>
                        We require this information to understand your needs and provide you with
                        a better service, and particular with a following resons:
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            Internal record keeping.
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                           We may use the information to improve our products and services.
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            We may periodically send promotional emails about new products, special offers
                            or other information which we think you may find interesting using the email
                            address which you have provided.
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text>&#8226;</Text>
                        <Text style={styles.itemListPolicy}>
                            From time to time, we may also use your information to contact you for market
                            research purposes. We may contact you by email, phone or mail. We may use the
                            information to customize the website according to your interests.
                        </Text>
                    </View>
                </View>

                <View style={styles.wrapperPolicy}>
                    <Text style={[{color: colors.primary}, styles.title]}>WHAT WE COLLECT</Text>

                    <Text style={styles.textPolicy}>
                        We are committed to ensuring that your information is secure. In order to prevent
                        unauthorised access or disclosure, we have put in place suitable physical,
                        electronic and managerial procedures to safeguard and secure the information
                        we collect online.
                    </Text>
                </View>
            </ScrollView>
        </Content>
    </Container>
);

export default Policy;