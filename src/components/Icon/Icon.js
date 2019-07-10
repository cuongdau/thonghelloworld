import React from 'react';
import { Icon } from 'native-base';
import {normalize, normalize360} from "../../utilities";

const IconExample = props =>
    <Icon
        name={props.name}
        type={props.type}
        onPress={props.press ? props.press : null}
        style={[{fontSize: props.fontSize ? normalize(props.fontSize): normalize360(20), color: props.color}, props.style]}/>;

export default IconExample;