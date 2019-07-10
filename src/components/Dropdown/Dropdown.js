import React from 'react';
import {View, TouchableOpacity, Text, Image} from "react-native";
import styles from "./style";
import {dropdown} from "../../config";


const DropdownList = ({values, onBackdropPress, onChangeText, itemStyle, itemTextStyle}) => {

    return (
        <TouchableOpacity style={styles.dropWrapper} onPress={onBackdropPress}>
            <View style={styles.dropdown}>
                {values.map((item, key) =>
                    <TouchableOpacity key={key} onPress={() => onChangeText(item)}
                        style={itemStyle}>
                        <Text style={itemTextStyle}>{item.value}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    )
};

const DropdownButton = ({name, onPress, fontSize, textColor, buttonStyle, iconStyle}) => {
    const style = {
        fontSize,
        color: textColor
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={style}>{name}</Text>
            <Image source={dropdown} style={iconStyle}/>
        </TouchableOpacity>
    )
};

export { DropdownList, DropdownButton };