'use strict';

//import React from 'react-native';
/*import ToastWebUtils from './ToastWebUtils';
const {
    ToastAndroid,
    Alert,
    Platform
} = React;*/

export function ToastShort(content) {
    console.log("11 content==" + content);

    return 
    return dispatch => {
        dispatch(snackbar(content));
    }
  


    /*if (Platform.OS === 'android') {
        ToastAndroid.show(new String(content), ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
        Alert.alert(
            '提示',
            content.toString()
        )
    } else {
        console.log("content==" + content);
    }*/
}

export function ToastLong(content) {
    console.log("11 content==" + content);
    /*if (Platform.OS === 'android') {
        ToastAndroid.show(new String(content), ToastAndroid.LONG);
    } else if (Platform.OS === 'ios') {
        Alert.alert(
            '提示',
            content.toString()
        )
    } else {
        console.log("content==" + content);
    }*/
}
