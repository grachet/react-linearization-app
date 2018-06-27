import React from 'react';

import s from '../constants/Style'
import c from '../constants/Colors'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
    FlatList,

} from 'react-native';
import text from "../constants/Text";
import {Button, Input, Item, Text} from 'native-base';
import Modal from "react-native-modal";
import {Icon} from 'expo';
import t from 'tcomb-form-native';


const width = Dimensions.get('window').width;


export default class ListItem extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        const {type, onDelete, index, values} = this.props;
        const isHeader = type === 'header';
        console.log(onDelete)
        let col1, col2;
        if (type === 'abaque') {
            col2 = values.hauteur + '  m ';
            col1 = values.volume + '  L/m3 ';
        } else if (type === 'result') {
            col1 = values.affichage;
            col2 = values.courant + '  mA ';;
        } else if (type === 'header') {
            col1 = values.col1;
            col2 = values.col2;
        }

        return (

            <TouchableHighlight
                onPress={() => onDelete(index)}
                style={s.mb_pixel}
                disabled={type !== 'abaque' || isHeader}
            >
                <View style={[s.row, {height: 50, width: width}]}>
                    <View style={[{flex: 0.13, backgroundColor: c.lightGrey, justifyContent: 'center'}, s.center]}>
                        <Text style={{color: c.white}}>{isHeader ? '' : index+1}</Text>
                    </View>
                    <View style={[{
                        flex: 0.87,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor : isHeader ? c.lightGrey : c.white
                    }, s.row ]}>
                        <Text style={{color: isHeader ? c.white : c.greyText}}>{col1}</Text>
                        <Text style={{color:  isHeader ? c.white : c.greyText}}>{col2}</Text>
                    </View>


                </View>
            </TouchableHighlight>
        );
    }
}