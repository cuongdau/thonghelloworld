import React from 'react';
import {colors} from "../../config";
import {normalize360} from "../../utilities";
import {TouchableOpacity} from "react-native";
import Icon from "../Icon";

const trashStyles = {
    color: colors.darkGrey,
    fontSize: 20
};

const TrashIcon = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name='trash' style={[trashStyles, props.style]} />
        </TouchableOpacity>
    )
};

export default TrashIcon;