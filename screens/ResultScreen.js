import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import text from "../constants/Text";

export default class ResultScreen extends React.Component {
    static navigationOptions = {
        title: 'Résultat',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,
    };



    render() {
        return (
            <ScrollView style={s.container}>

                <View style={[s.container, s.center, s.m_md]}>


                    <Text style={s.text}>{text.resultText}</Text>





                </View>


            </ScrollView>
        );
    }
};
