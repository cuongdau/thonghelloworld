import React, { Component } from 'react';
import {Image, TouchableOpacity,Platform, View} from 'react-native';
import StatusBar from './../../components/StatusBar';
import Icon from './../../components/Icon';
import {colors} from "../../config";
import styles from './style';
import Swiper from 'react-native-swiper';
import {normalize360} from "../../utilities";


class Gallery extends Component {
    render() {
        const {images, goBack} = this.props;

        return(
            <View style={{flex: 1, position: 'relative'}}>
                {Platform.OS === "ios" && <StatusBar />}

                <TouchableOpacity onPress={goBack} style={styles.button}>
                    <Icon name="arrow-back" color={colors.primary} />
                </TouchableOpacity>

                <View style={styles.image}>
                    <Swiper showsButtons={false} loop={true}
                            dotStyle={{marginBottom: normalize360(30)}}
                            activeDotStyle={{marginBottom: normalize360(30)}}
                            activeDotColor={colors.primary}
                    >
                        {images.map((item, key) => {
                            return (
                                <Image key={key}
                                       source={{uri: item}}
                                       style={{width: '100%', height: '100%'}} />
                            )
                        })}
                    </Swiper>
                </View>
            </View>
        )
    }
}

export default Gallery;