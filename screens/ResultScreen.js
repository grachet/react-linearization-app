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
    FlatList
} from 'react-native';
import text from "../constants/Text";
import ListItem from '../components/ListItem'

export default class ResultScreen extends React.Component {
    static navigationOptions = {
        title: 'Résultat',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,
    };

    constructor(props) {
        super(props);
        this.headerTable = {
            "col1": 'DSC (affichage)',
            "col2": 'ISC (courant mA)'
        };
        this.state = {
            showModal: false,
            results: [{
                "affichage": 3,
                "courant": 5,
            },
                {
                    "affichage": 3,
                    "courant": 6,
                },
                {
                    "affichage": 3,
                    "courant": 4,
                }, {
                    "affichage": 3.5214,
                    "courant": 5,
                },
                {
                    "affichage": 3,
                    "courant": 6,
                },
                {
                    "affichage": 3,
                    "courant": 4,
                }, {
                    "affichage": 3,
                    "courant": 5,
                },
                {
                    "affichage": 3,
                    "courant": 6,
                },
                {
                    "affichage": 3,
                    "courant": 4,
                },],
        };

    }


    render() {
        return (


            <View style={[s.container, s.center]}>


                <Text style={[s.text, s.m_md]}>{text.resultText}</Text>


                    <ListItem
                        type={'header'}
                        values={this.headerTable}
                        index={''}
                    />
                <ScrollView style={s.container}>
                    <FlatList
                        data={this.state.results}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => (
                            <ListItem
                                type={'result'}
                                values={item}
                                index={index}
                            />
                        )}
                    />

                </ScrollView>
            </View>


        );
    }
};
