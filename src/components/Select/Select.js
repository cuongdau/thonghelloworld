import React from 'react';
import { View, Label } from 'native-base';
import { Select, Option } from 'react-native-select-lists';
import styles from './style';


const SelectExample = ({ input: { onChange, value }, label, items, defaultValue }) => {
    return (
        <View style={styles.container}>
            <Label style={styles.label}>{label}</Label>
            <Select default={defaultValue} caret="down"
                    caretSize={styles.caret.size}
                    caretColor={styles.caret.color}
                    selectTextStyle={styles.text}
                    selectStyle={styles.input}
                    onSelect={(value) => onChange(items[value])}>
                {
                    items.map((item, key) => <Option key={key} value={key}>{item}</Option>)
                }
            </Select>
        </View>
    )
};

export default SelectExample;

