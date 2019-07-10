import React from 'react';
import { ScrollView, View } from 'react-native';
import {Content, Text} from 'native-base';
import { FLItemProducts } from './../../components/FlatListItem';
import {colors} from "../../config";
import styles from './style';

const Products = ({products, handleProduct}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                products ?
                    <View style={styles.container}>
                        {Object.values(products).map((item, index) => {
                            return <View style={styles.itemWrapper} key={index}>
                                <FLItemProducts item={item} press={() => handleProduct(item.entity_id)}/>
                            </View>
                        })}
                    </View> :
                    <Text style={{textAlign: 'center'}}>No products found.</Text>
            }
        </ScrollView>
    )
};

export default Products;
