import React, { Component } from "react"
import { ScrollView, TouchableOpacity, Image } from "react-native"
import { View, Text } from "native-base"
import CheckBox from "../CheckBox"
import styles from "./style"
import {plus} from "../../config";


class CategoryList extends Component {
    state = {
        main: [],
        apparel: {
            checked: false,
            title: "Apparel",
            dropping:
                []
        },
        otherGear: {
            checked: false,
            title: "Other Gear",
            dropping: []
        },
        initial: {
            categories: null,
            item: null,
            index: null
        }
    };

    componentDidMount() {
        const { main, apparel, otherGear } = this.state;
        const { edit } = this.props;
        const allCategories = this.objectToArray(this.props.data.categories);

        allCategories.forEach((item) => {
            if (!item["golf-apparel"] && !item["other-golf-gear"]) {
                main.push({ lable: Object.keys(item)[0], title: Object.values(item)[0], checked: false })
                if (edit && edit.label !== "golf-apparel" && edit.label !== "other-golf-gear") {
                    const key = main.find(item => item.title.indexOf(edit.title) > -1);
                    if (key)
                        this.setState({
                            initial: {
                                ...this.state.initial,
                                categories: main,
                                item: key,
                                index: main.indexOf(key)
                            }
                        }, () => this.handleCategoryPress(this.state.initial.categories,
                            this.state.initial.item, this.state.initial.index));
                }
            } else if (item["golf-apparel"]) {
                const apparelCategories = this.objectToArray(item.children);
                apparelCategories.forEach(item => {
                    apparel.dropping.push({ lable: Object.keys(item)[0], title: Object.values(item)[0], checked: false });
                    if (edit && edit.label === "golf-apparel") {
                        apparel.checked = true;
                        const key = apparel.dropping.find(item => item.title.indexOf(edit.title) > -1);
                        if (key)
                            this.setState({
                                initial: {
                                    ...this.state.initial,
                                    categories: apparel.dropping,
                                    item: key,
                                    index: apparel.dropping.indexOf(key)
                                }
                            }, () => this.handleCategoryPress(this.state.initial.categories,
                                this.state.initial.item, this.state.initial.index));
                    }
                })
            } else {
                const otherGearCategories = this.objectToArray(item.children);
                otherGearCategories.forEach(item => {
                    if (item["other-golf-items"] || item["golf-artwork-books-dvds"] || item["golf-memorabilia"]) {
                        otherGear.dropping.push({ lable: "", title: Object.values(item)[0], checked: false })
                    } else {
                        otherGear.dropping.push({ lable: Object.keys(item)[0], title: Object.values(item)[0], checked: false })
                    }

                    if (edit && edit.label === "other-golf-gear") {
                        otherGear.checked = true;
                        const key = otherGear.dropping.find(item => item.title.indexOf(edit.title) > -1);
                        if (key)
                            this.setState({
                                initial: {
                                    ...this.state.initial,
                                    categories: otherGear.dropping,
                                    item: key,
                                    index: otherGear.dropping.indexOf(key)
                                }
                            }, () => this.handleCategoryPress(this.state.initial.categories,
                                this.state.initial.item, this.state.initial.index));
                    }
                })
            }
        });


        if(!edit) this.setState({ main, apparel, otherGear }, () =>
             this.handleCategoryPress(main, main[0], 0));
    }

    objectToArray = obj => {
        const array = [];
        for (let key in obj) {
            array.push(obj[key])
        }
        return array
    };

    clearChecks = () => {
        const { main, apparel, otherGear } = this.state;
        main.map(elem => elem.checked = false);
        apparel.dropping.map(elem => elem.checked = false);
        otherGear.dropping.map(elem => elem.checked = false);
        this.setState({ main, apparel, otherGear })
    };

    handleCategoryPress = (categories, item, index) => {
        this.clearChecks();
        if (item.checked === false) {
            categories[index].checked = true
        } else {
            categories[index].checked = false
        }
        this.setState({ categories });
        this.props.getCategory(item)
    };

    openSubcategoryPress = (catigory) => {
        catigory.checked = !catigory.checked;
        this.setState({ catigory })
    };

    render() {
        const { main, apparel, otherGear } = this.state;
        return (
            <ScrollView style={styles.categoryWrapper}>
                {main.map((item, index) =>
                    <View key={index}>
                        <View style={styles.categoryItem}>
                            <CheckBox
                                checked={item.checked}
                                press={() => this.handleCategoryPress(main, item, index)}
                            />
                            <Text style={styles.categoryItemText}>{item.title}</Text>
                        </View>
                    </View>)}
                <View style={styles.categoryItem}>
                    <TouchableOpacity onPress={() => this.openSubcategoryPress(apparel)}>
                        <Image source={plus} style={styles.categoryOtherItem}/>
                    </TouchableOpacity>
                    <Text style={styles.categoryItemText2}>{apparel.title}</Text>
                </View>
                {apparel.checked &&
                    apparel.dropping.map((item, index) =>
                        <View key={index}>
                            <View style={styles.subcategoryItem}>
                                <CheckBox
                                    checked={item.checked}
                                    press={() => this.handleCategoryPress(apparel.dropping, item, index)}
                                />
                                <Text style={styles.categoryItemText}>{item.title}</Text>
                            </View>
                        </View>)}
                <View style={styles.categoryItem}>
                    <TouchableOpacity onPress={() => this.openSubcategoryPress(otherGear)}>
                        <Image source={plus} style={styles.categoryOtherItem}/>
                    </TouchableOpacity>
                    <Text style={styles.categoryItemText2}>{otherGear.title}</Text>
                </View>
                {otherGear.checked &&
                    otherGear.dropping.map((item, index) =>
                        <View key={index}>
                            <View style={styles.subcategoryItem}>
                                <CheckBox
                                    checked={item.checked}
                                    press={() => this.handleCategoryPress(otherGear.dropping, item, index)}
                                />
                                <Text style={styles.categoryItemText}>{item.title}</Text>
                            </View>
                        </View>)}
            </ScrollView>
        )
    }
}

export default CategoryList