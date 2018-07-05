import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {FlatList, Linking, ScrollView, View} from 'react-native';
import text from "../constants/Text";
import ListItem from '../components/ListItem'
import {connect} from 'react-redux'
import {Button, Text} from 'native-base';
import fn from "../functions/calcul";
import Hyperlink from 'react-native-hyperlink'

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


    getData(value) {

        if (value.points.length === 0 || !value.points || !value.volume) {
            return []
        }

        const data = [];
        let hauteur = value.hauteur;
        let volume = value.volume;
        console.log(value)

        const maxVolume = Math.max.apply(Math, value.points.map(function (o) {
            return o.volume;
        }));

        let SigMin = 4.00;
        let SigMax = 20.00;

        for (var i = 0; i < value.points.length; i++) {
            data.push({
                courant: fn.format4dig(SigMin + value.points[i].hauteur * (SigMax - SigMin) / value.echelle, -9999),
                affichage: fn.format4dig(value.points[i].volume, maxVolume)
            })
        }

        console.log(data);
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
                <Hyperlink
                    onPress={(url, text) => Linking.openURL(url)}
                    linkStyle={[s.text, {color: c.blueLink}]}
                    linkText={url => url === 'http://www.hitec.fr/ALP842-Afficheur-4-20-mA' ? 'HITEC ALP842' : url}
                >
                    <Text style={[s.text, s.m_md]}>{text.resultText}</Text>
                </Hyperlink>
                }


                {!noData && !noParams &&
                <ListItem
                    type={'header'}
                    values={this.headerTable}
                    index={''}
                />}


                <ScrollView style={s.container}>
                    <FlatList
                        data={this.getData(this.props)}
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
