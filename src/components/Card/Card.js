import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import Icon from './../Icon';
import styles from './style';
import {categories} from "../../config";


const CategoryCard = ({category, onPress}) => (
    <TouchableOpacity onPress={() => onPress()} activeOpacity={0.7}>
        <View style={styles.categoryBody}>
                    <Image source={categories[category.category_id]} style={styles.categoryImg}/>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryTitle}>{ category.name }</Text>
                    </View>
                    <Icon
                        name="arrow-dropright"
                        fontSize={styles.categoryIconRight.fontSize}
                        press={() => onPress()}
                    />
        </View>
    </TouchableOpacity>
);

const SubcategoryCard = ({subcategory, onPress}) => (
    <TouchableOpacity onPress={() => onPress()} activeOpacity={0.7}>
        <View style={styles.categoryBody}>
                    <Image source={categories[subcategory.category_id]} style={styles.categoryImg}/>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryTitle}>{ subcategory.name }</Text>
                    </View>
                    <Icon
                        name="arrow-dropright"
                        fontSize={styles.categoryIconRight.fontSize}
                        press={() => onPress()}
                    />
        </View>
    </TouchableOpacity>
);

export { CategoryCard, SubcategoryCard } ;