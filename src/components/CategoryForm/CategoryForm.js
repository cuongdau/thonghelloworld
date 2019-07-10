import React, { Component } from "react"
import { Text, CardItem, View } from "native-base"
import Select from "./../../components/SelectSimple"
import InputText from "../../components/InputTextSimple"
import styles from "./style"
import {getRoundingNumber, normalize360} from "../../utilities";

const required = value => value ? undefined : "Required";

class CategoryForm extends Component {
    state = {
        categoryFields: [],
        attr: {},
        values: {
            name: "",
            description: "",
            price: ""
        }
    };

    componentDidMount() {
        this.initialize();
    }

    componentDidUpdate(prevProps) {
        const {category} = this.props;
        if (category !== prevProps.category) {
            this.setState({values: {
                    name: this.state.values.name,
                    description: this.state.values.description,
                    price: this.state.values.price
                }}, () => this.initialize());
        }
    }

    initialize = () => {
        const {category, listing, data} = this.props;
        category && data.attributes[category].map(item => Object.assign(
            this.state.values, {[item.attributeCode]: ''}));

        if(listing) {
            category && data.attributes[category].map(item => Object.assign(this.state.values, {[item.attributeCode]:
                    listing[item.attributeCode]}, { name: listing.name, description: listing.description,
                price: listing.regular_price_without_tax.toString() }));
        }

        return this.props.setValues(this.state.values)
    };

    getOptionsHalper = (options) => options.map(elem => elem.label);

    getForm = () => {
        let { categoryFields } = this.state;
        let { data, category, listing } = this.props;

        if (category !== "") {
            categoryFields = data.attributes[category]
        }
        return categoryFields.map(elem => {
            return <Select
                name={elem.attributeCode}
                label={elem.attributeName}
                items={this.getOptionsHalper(elem.options)}
                key={elem.attributeCode}
                defaultValue={listing ? listing[elem.attributeCode] : null}
                onChange={value => this.setState({values: {
                    ...this.state.values,
                        [elem.attributeCode]: value
                    }})}
            />
        })
    };

    getTax = () => {
        const {commission_fixed, commission_percent} = this.props.data.commission,
            price = this.state.values.price,
            percent = Number(commission_percent)/100;
        return price && Number(price) * percent > Number(commission_fixed) ?
            Number(price) * percent : Number(commission_fixed);
    };

    handleChange = key => text => this.setState({
        values: {
            ...this.state.values,
            [key]: text
        }
    }, () => this.props.setValues(this.state.values));

    getError = value => value.length < 1 ? "Required" : null;

    render() {

        const {data, submit} = this.props;
        const {values} = this.state;

        const tax = this.getTax(),
            price = values && values.price ? Number(values.price) - tax : -data.commission.commission_fixed;

        return (
            <CardItem style={{ flexDirection: "column", alignItems: "flex-start", backgroundColor: '#f7f7f7' }}>
                <InputText name="name"
                           maxLength={35}
                           label="Listing Title"
                           value={values.name}
                           error={submit ? this.getError(values.name) : null}
                           submit={submit}
                           onChange={this.handleChange('name')}
                           style={styles.inputText} />

                <InputText name="price"
                           label="List Price ($USD)"
                           style={styles.inputText}
                           value={values.price}
                           error={submit ? this.getError(values.price) : null}
                           submit={submit}
                           onChange={this.handleChange('price')}
                       keyboardType="numeric" validate={[required]} />
                <Text style={styles.small}>Your List Price is the price that will be shown to buyers. Note: Be aggressive with your price! Check the PGA Value Guide for pricing guidance. Be on the low end of the range if you want it to sell. The average listing sells for a 13% discount off its resale value. This is still a 63% premium over trade-in value.</Text>

                <View style={styles.priceWrapper}>
                    <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Text style={styles.title}>{getRoundingNumber(tax)}</Text>
                        <Text style={[styles.title, {marginTop: normalize360(10)}]}>{getRoundingNumber(price)}</Text>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'flex-start',
                        marginLeft: normalize360(20)}}>
                        <Text style={styles.title2}>Sales Fee ($USD)</Text>
                        <Text style={[styles.title2, {marginTop: normalize360(10)}]}>Your Net Payment ($USD)</Text>
                    </View>
                </View>

                {this.getForm()}

                <InputText name="description"
                           label="Describe Your Item"
                           value={values.description}
                           multiline={true} validate={[required]}
                           error={submit ? this.getError(values.description) : null}
                           submit={submit}
                           onChange={this.handleChange('description')}
                           style={styles.inputText} />
            </CardItem>
        )
    }

}


export default CategoryForm