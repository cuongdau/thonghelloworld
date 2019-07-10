import React, { Component } from 'react';
import { Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import {Container, Content, View, Text} from 'native-base';
import { drawers } from "../../config";
import styles from './style';


class DrawerBar extends Component {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        Alert.alert(
            'Logout App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });
        return true;
    };

    render() {
        return(
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <TouchableOpacity style={styles.button} onPress={() => alert('News')}>
                        <View style={styles.view}>
                            <Image source={drawers.news} style={styles.image} />
                            <Text style={styles.text}>News</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => alert('Updates')}>
                        <View style={styles.view}>
                            <Image source={drawers.updates} style={styles.image} />
                            <Text style={styles.text}>Updates</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleBackButtonClick}>
                        <View style={styles.view}>
                            <Image source={drawers.logout} style={styles.image} />
                            <Text style={styles.text}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default DrawerBar;