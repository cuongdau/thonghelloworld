import React, {Component} from 'react';
import {Container, Input, Text, View, Footer} from 'native-base';
import {Image, FlatList, TouchableOpacity, Platform, Alert} from 'react-native';
import Icon from './../../components/Icon';
import Header from './../../components/Header';
import StatusBar from "../../components/StatusBar";
import {colors, week} from "../../config";
import {connect} from 'react-redux';
import {loadMessages} from "../../actions";
import {width, normalize360, toDataURL} from "../../utilities";
import styles from './style';
import fire from '../../firebase';
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";


const options = {
    title: "Select Image",
    takePhotoButtonTitle: "Take image with your camera",
    chooseFromLibraryButtonTitle: "Choose image from library",
    rotation: 360
};

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            messagesList: [],
            image: null
        };
    }

    componentWillMount(): void {
        this.getListMessages();
    }

    getListMessages = () => {
        fire.database().ref('messages').child('Мячик')
            .on("value", value => {
                if (value.val()) {
                    this.setState({
                            messagesList: Object.values(value.val())
                                .filter(item => item !== []).reverse()
                        }
                    )
                }
            });
    };

    handleChangeText = text => this.setState({text});

    getResizeImage = image => {
        ImageResizer.createResizedImage(image.uri, 100, 100, 'JPEG', 80)
            .then(({uri}) => {
                //const index = uri.toString().lastIndexOf('/') + 1;
                toDataURL(uri)
                    .then(dataUrl => {
                        this.setState({
                            image: dataUrl
                        }, () => this.handleSubmitMessage());
                    });
            })
            .catch(err => {
                console.log(err);
                return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
            });
    };

    handleSelectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker")
            } else if (response.error) {
                console.log("Image Picker Error: ", response.error)
            } else {
                this.getResizeImage(response);
            }
        })
    };


    handleSubmitMessage = () => {
        const {image, text} = this.state;

        const dataMessage = {
            name: this.props.name,
            message: image ? image : text,
            date: Date.now()
        };

        this.setState({text: '', image: null});

        fire.database().ref('messages/' + `${'Мячик'}/` + dataMessage.date).set(dataMessage);
    };

    getColor = userName => this.props.name === userName ? colors.myMessage : colors.otherMessage;

    getMessagePosition = userName => this.props.name === userName ? 'flex-end' : 'flex-start';

    getWidth = message => {
        const width = message ? message.length * 3 : 0;
        return width < 12 ? '12%' : width > 60 ? '60%' : `${width}%`;
    };

    componentWillUnmount(): void {
        this.getListMessages();
    }

    renderChatItem = ({item}) => {
        const date = new Date(item.date);
        const day = week[date.getDay()];
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const chatHours = hours < 10 ? `0${hours}` : hours;
        const chatMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const time = chatHours + ':' + chatMinutes;

        return (
            <View style={{marginVertical: normalize360(18)}}>
                <View style={styles.chatDateMessageWrapper}>
                    <Text style={styles.chatDateMessage}>
                        {day} {time}
                    </Text>
                </View>

                {item.message.length > 70 ?
                    <View style={{alignItems: this.getMessagePosition(item.name)}}>
                        <Image source={{uri: item.message}} style={styles.image} />
                    </View>:
                    <View style={{width, alignItems: this.getMessagePosition(item.name)}}>
                        <View style={[styles.chatMessageTextWrapper, {
                            backgroundColor: this.getColor(item.name),
                            width: this.getWidth(item.message)
                        }]}>
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                    </View>
                }
            </View>)
    };

    keyExtractor = (item, index) => index.toString();

    render() {
        const {navigation} = this.props;
        const {text, messagesList} = this.state;

        return (
            <Container style={{backgroundColor: '#f7f7f7'}}>
                {Platform.OS === "ios" && <StatusBar/>}

                <Header
                    leftIcon="arrow-back"
                    headTitle="With Name"
                    iconColor={colors.icon}
                    containerStyle={{elevation: 0, borderBottomColor: 'transparent'}}
                    leftIconPress={() => navigation.goBack()}
                />

                <View style={styles.chatHeaderContainer}>
                    <Image source={require('./../../assets/order2.png')}
                           style={styles.chatHeaderImage}/>

                    <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                        <Text style={styles.chatProductName}>Information about product</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.chatProductName}>$220</Text>
                            <Text style={styles.chatShippingPrice}> + $13 shipping</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    inverted
                    data={messagesList}
                    renderItem={this.renderChatItem}
                    keyExtractor={this.keyExtractor}
                    showsVerticalScrollIndicator={false}
                    style={{backgroundColor: colors.white}}
                />

                <Footer style={styles.footer}>
                    <Input
                        placeholder="Your message (required)"
                        value={text}
                        style={{flex: 1}}
                        maxLength={65}
                        onChangeText={this.handleChangeText}/>

                    <View style={styles.chatButtonsWrapper}>
                        <TouchableOpacity style={{padding: 10}} onPress={this.handleSelectImage}>
                            <Icon name="image" color={colors.grey} fontSize={50}/>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={text === ''} style={{padding: 10}}
                                          onPress={this.handleSubmitMessage}>
                            <Icon name="send" color={colors.grey} fontSize={50}/>
                        </TouchableOpacity>
                    </View>
                </Footer>
            </Container>
        )
    }
}


function mapStateToProps(state) {
    return {
        name: state.login.user.firstname
    }
}

export default connect(mapStateToProps, {loadMessages})(ChatScreen);

