import React from 'react';
import {View} from 'react-native';
import {normalize360, rgba} from "../../utilities";


const styles = {
    hr: {
        borderTopWidth: 1,
        borderColor: rgba("#707070", 30),
        marginVertical: normalize360(16)
    }
};

const Hr = () => (

    <View style={styles.hr} />
);

export default Hr;