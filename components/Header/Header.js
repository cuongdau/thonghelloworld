import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import Icon from './../Icon';
import {colors} from '../../config'
import {normalize360} from "../../utilities";

const styles = {
    header: {
        backgroundColor: '#f7f7f7',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    }
};

const HeaderExample = (
    { leftIcon, rightIcon, headTitle, iconColor, leftIconPress, rightIconPress,
        containerStyle, headTitleStyle }) => (
    <Header style={[styles.header, containerStyle]}>
        <Left>
            <TouchableOpacity style={{padding: normalize360(13)}} onPress={leftIconPress} >
                <Icon name={leftIcon} color={iconColor} press={leftIconPress} />
            </TouchableOpacity>
        </Left>

        <Body style={Platform.select({
            ios: {
                alignItems: 'flex-start', marginLeft: normalize360(-100)
            }
        })}>
            <Title style={[{color: colors.icon}, headTitleStyle]}>{ headTitle }</Title>
        </Body>

        <Right>
            <TouchableOpacity style={{padding: normalize360(13)}} onPress={rightIconPress} >
                <Icon name={rightIcon} color={iconColor} press={rightIconPress} />
            </TouchableOpacity>
        </Right>
    </Header>
);

export default HeaderExample;