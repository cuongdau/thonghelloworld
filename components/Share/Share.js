import React from 'react';
import {
    Clipboard,
    ToastAndroid,
    AlertIOS,
    Platform
} from 'react-native';
import Share, {ShareSheet, Button} from 'react-native-share';
import { SHARE } from "../../config";

const TestShare = ({toggle, visible, url}) => {

    const onCancel = () => {
        return toggle();
    };

    const shareOptions = {
        title: "Golfing",
        message: "Welcome",
        url: url,
        subject: "Share Link" //  for email
    };

    return (
        <ShareSheet onCancel={toggle} visible={visible}>
            <Button iconSrc={{ uri: SHARE.TWITTER_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "twitter"
                            }));
                        },300);
                    }}>Twitter</Button>
            <Button iconSrc={{ uri: SHARE.FACEBOOK_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "facebook"
                            }));
                        },300);
                    }}>Facebook</Button>
            <Button iconSrc={{ uri: SHARE.WHATSAPP_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "whatsapp"
                            }));
                        },300);
                    }}>Whatsapp</Button>
            <Button iconSrc={{ uri: SHARE.GOOGLE_PLUS_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "googleplus"
                            }));
                        },300);
                    }}>Google +</Button>
            <Button iconSrc={{ uri: SHARE.EMAIL_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.shareSingle(Object.assign(shareOptions, {
                                "social": "email"
                            }));
                        },300);
                    }}>Email</Button>
            <Button
                iconSrc={{ uri: SHARE.CLIPBOARD_ICON }}
                onPress={()=>{
                    onCancel();
                    setTimeout(() => {
                        if(typeof shareOptions["url"] !== undefined) {
                            Clipboard.setString(shareOptions["url"]);
                            if (Platform.OS === "android") {
                                ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
                            } else if (Platform.OS === "ios") {
                                AlertIOS.alert('Link copiado al portapapeles');
                            }
                        }
                    },300);
                }}>Copy Link</Button>
            <Button iconSrc={{ uri: SHARE.MORE_ICON }}
                    onPress={()=>{
                        onCancel();
                        setTimeout(() => {
                            Share.open(shareOptions)
                        },300);
                    }}>More</Button>
        </ShareSheet>
    )
};

export default TestShare;
