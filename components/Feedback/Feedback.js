import React from 'react';
import {View, Text, ListItem, List} from 'native-base';
import Icon from './../../components/Icon';
import {colors} from "../../config";
import {ScrollView} from "react-native";
import styles from './style';


const Feedback = ({review}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {review ?
                <List>
                {
                    Object.values(review).map((item, key) =>
                        <ListItem style={{flexDirection: 'column'}} key={key}>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                width: '100%', alignItems: "flex-end"
                            }}>
                                {item.buyerFirstName ?
                                <Text style={styles.name}>
                                    {item.buyerFirstName} {item.buyerLastName}</Text> :
                                <Text style={styles.name}>{item.shopName}</Text>}
                                <Text style={styles.date}>{item.date.split(' ')[0]}</Text>
                            </View>

                            <View style={{width: '100%'}}>
                                <Text style={styles.message}>{item.message}</Text>
                            </View>

                            <View style={{flexDirection: 'row', width: '100%'}}>
                                {
                                    new Array(5).fill('').map((star, key) => {
                                        return <Icon
                                            key={key}
                                            name={key + 1 <= item.rating ? "md-star" : "md-star-outline"}
                                            style={styles.iconStars}
                                            color={key + 1 <= item.rating ? colors.primary : colors.grey}
                                        />
                                    })
                                }
                            </View>
                        </ListItem>
                    )
                }
            </List>:
                <Text style={{textAlign: 'center'}}>Any feedbacks not found</Text>}
        </ScrollView>
    )
};

export default Feedback;