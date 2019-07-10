import React from 'react';
import {Text, View} from "native-base";
import styles from "./style";
import {Image, TouchableOpacity} from "react-native";
import TrashIcon from "../TrashIcon";
import Condition from "../Condition";
import {UppercaseTextButton} from "../Button/Button";
import {getRoundingNumber, normalize360} from "../../utilities";

const OldPrice = ({value, style}) => <Text style={style}>${value}</Text>;

const NewPrice = (props) => <Text style={styles.newPrice}>
    ${props.value} <Text style={{color: '#0071bc', fontWeight: 'bold'}}>&darr;</Text></Text>;

const WatchlistItem = ({image, title, onTrashPress, oldPrice, newPrice, quality, onAddToCartPress, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.watchListItem}>
                <Image source={{uri: image}} style={styles.thumbnail} />

                <View style={styles.description}>
                    <View style={styles.descriptionTop}>
                        <Text style={styles.itemTitle}>{title}</Text>
                        <TrashIcon style={styles.trashIcon} onPress={onTrashPress} />
                    </View>
                    <View>
                        <View style={styles.priceWrapper}>
                            <View style={{marginRight: normalize360(29)}}>
                                <Condition quality={quality} />
                            </View>
                            <OldPrice value={getRoundingNumber(oldPrice)}
                                      style={oldPrice !== newPrice ? styles.oldPrice : styles.newPrice} />

                            {oldPrice !== newPrice &&
                            <NewPrice value={getRoundingNumber(newPrice)} />}
                        </View>
                        <View style={styles.descriptionBottom}>
                            <UppercaseTextButton
                                name="Add To Cart"
                                press={onAddToCartPress}
                                style={styles.button}/>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default WatchlistItem;