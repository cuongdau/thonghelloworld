import React from 'react';
import { Container, Content, View, Text } from 'native-base';
import { colors } from "../../config";
import styles from "./style";
import Header from "../../components/Header";
import {normalize360} from "../../utilities";
import {Platform} from "react-native";
import StatusBar from "../../components/StatusBar";

const EditPolicy = ({ navigation }) => (
    <Container>
        {Platform.OS === "ios" && <StatusBar />}

        <Header
            containerStyle={{elevation: 0}}
            leftIcon="close"
            rightIcon="search"
            iconColor={colors.icon}
            leftIconPress={() => navigation.goBack()}
            rightIconPress={() => navigation.navigate('Search', {navigator: 'Profile'})}
        />

        <Content style={styles.editPolicyContainer} showsVerticalScrollIndicator={false}>
            <View>
                <Text style={{fontSize: normalize360(20), color: '#343434'}}>Privacy Policy</Text>
                <Text style={[styles.editPolicyTextWrapper, {marginTop: normalize360(16)}]}>
                    This privacy policy sets out how Online Exchanges uses and protects any information that you provide when you use this website. Online Exchanges is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. Online Exchanges may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                </Text>
            </View>

            <View style={{marginTop: normalize360(67)}}>
                <Text style={styles.title}>WHAT WE COLLECT</Text>
                <Text style={styles.editPolicyTextWrapper}>We may collect the following information:</Text>
                <View>
                    <View style={{flexDirection: 'row', marginTop: normalize360(8)}}>
                        <View style={styles.editPointPolicy}/>
                        <View style={{width: normalize360(301)}}>
                            <Text style={styles.editPolicyTextWrapper}>Name</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View style={{width: normalize360(301)}}>
                            <Text style={styles.editPolicyTextWrapper}>Contact information including email address</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View style={{width: normalize360(301)}}>
                            <Text style={styles.editPolicyTextWrapper}>Demographic information such as postcode, preferences and interests</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View style={{width: normalize360(301)}}>
                            <Text style={styles.editPolicyTextWrapper}>Other information relevant to customer surveys and/or offers</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{marginTop: normalize360(67)}}>
                <Text style={styles.title}>WHAT WE COLLECT</Text>
                <Text style={styles.editPolicyTextWrapper}>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</Text>
                <View>
                    <View style={{flexDirection: 'row', marginTop: normalize360(8)}}>
                        <View style={styles.editPointPolicy}/>
                        <View style={{width: normalize360(301)}}>
                            <Text style={styles.editPolicyTextWrapper}>Internal record keeping.</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View>
                            <Text style={styles.editPolicyTextWrapper}>We may use the information to improve our products and services.</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View>
                            <Text style={styles.editPolicyTextWrapper}>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.editPointPolicy}/>
                        <View>
                            <Text style={styles.editPolicyTextWrapper}>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests.</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{marginTop: normalize360(67), paddingBottom: normalize360(16)}}>
                <Text style={styles.title}>WHAT WE COLLECT</Text>
                <Text style={styles.editPolicyTextWrapper}>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</Text>
            </View>
        </Content>
    </Container>
);

export default EditPolicy;