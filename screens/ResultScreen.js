import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList
} from 'react-native';
import text from "../constants/Text";
import ListItem from '../components/ListItem'
import {connect} from 'react-redux'
import {Button, Input, Item, Text} from 'native-base';
import fn from "../functions/calcul";

class ResultScreen extends React.Component {
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


    }

    /*
    componentDidUpdate() {
        console.log("componentDidUpdate : ");
        console.log(this.props.echelle, 'echelle');
        console.log(this.props.hauteur, 'hauteur');
        console.log(this.props.volume, 'volume');
        console.log(this.props.points, 'points');
    }*/

    getData(value) {

        const data = [];
        let hauteur = value.hauteur;
        let volume = value.volume;
        let points = value.points;
        console.log(points.length, 'caca');

        console.log(Math.max.apply(Math, value.map(function (o) {
            return o.volume;
        })));
        const maxVolume = Math.max.apply(Math, value.map(function (o) {
            return o.volume;
        }));

        for (var i = 0; i < 10; i++) {
            data.push({
                hauteur: 1,
                affichage: fn.format4dig(points.volume,maxVolume)
            })
        }

        console.log(pointsAbaque);
        return data;

    }


    render() {
        const {navigate} = this.props.navigation;
        const noParams = (!this.props.volume);
        const noData = !noParams && (this.props.points === {} || this.props.points.length === 0 || this.props.points === null);


        return (


            <View style={[s.container, s.center]}>


                {noData &&
                <Text style={[s.text, s.m_md, s.mt_lg]}>{text.noData}</Text>
                }

                {noParams &&
                <Text style={[s.textCenter, s.m_md, s.mt_lg]}>{text.noParams}</Text>
                }

                {(noParams || noData) &&
                <View style={[s.center, s.mt_md]}>
                    <Button info
                            onPress={noParams ? () => navigate('Params') : () => navigate('Abaque')
                            }><Text> Ajouter </Text>
                    </Button>
                </View>
                }

                {!noData && !noParams &&
                <Text style={[s.text, s.m_md]}>{text.resultText}</Text>
                }

                {!noData && !noParams &&
                <ListItem
                    type={'header'}
                    values={this.headerTable}
                    index={''}
                />}


                <ScrollView style={s.container}>
                    <FlatList
                        data={this.getData(this.props.points)}
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


const mapStateToProps = (state) => {
    return state
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
