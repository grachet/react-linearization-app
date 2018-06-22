import React from 'react';
import styles from '../constants/Style'
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
    };



    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={[{marginBottom: 40, marginTop: 30}, styles.getStartedContainer]}>


                    <Text style={styles.getStartedText}>{text.resultText}</Text>





                </View>


            </ScrollView>
        );
    }
};
