import React, {Component} from 'react'
import styles from './style.js';
import {TextButton} from "../Button";
import Modal from "react-native-modal";
import {H3, View} from "native-base";
import {colors, conditionDescription} from "../../config";
import {Text} from "react-native";

class Condition extends Component {
    state = {
        isModalVisible: false,
        condition: 'Good'
    };

    _toggleModal = condition => this.setState({
        isModalVisible: !this.state.isModalVisible,
        condition: condition ? condition : this.state.condition
    });

    getColor = name => {
        switch (name) {
            case 'New':
                return colors.new;
            case 'Good':
                return colors.good;
            case 'Great':
                return colors.great;
            case 'Fair':
                return colors.fair;
            default:
                return colors.good
        }
    };

    render () {
        const { isModalVisible, condition } = this.state;
        const { quality, style, desc } = this.props;

        return (
            <View style={style}>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContent}>
                            <View>
                                <H3 style={styles.title}>ITEM CONDITION</H3>
                                <Text style={[styles.condition, {color: this.getColor(condition)}]}>{condition}</Text>
                                <Text style={styles.text}>{conditionDescription[condition].description}</Text>
                            </View>
                            <View style={styles.modalSubmitButton}>
                                <TextButton name="OK" color={colors.primary}
                                            style={styles.textButton}
                                            press={this._toggleModal} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <TextButton color={this.getColor(quality)}
                            style={desc ? styles.desc : styles.quality}
                            name={quality}
                            press={() => this._toggleModal(quality)}/>
            </View>
        )
    }
}

export default Condition;