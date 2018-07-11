import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import l from '../constants/Link'
import text from '../constants/Text'
import {Dimensions, Image, Linking, Platform, ScrollView, TouchableHighlight, View} from 'react-native';
import {Button, Text} from 'native-base';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Information',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,
    };

    constructor(props) {
        super(props);

    }

    render() {
        this.OS = Platform.OS === 'ios' ? 'ios' : 'android';
        const {navigate} = this.props.navigation;

        return (

            <View style={[s.container]}>

                <View style={[s.center, {flex: 0.30, marginBottom: 10, backgroundColor: c.white}]}>
                    <TouchableHighlight
                        onPress={() => Linking.openURL(l.linkLogoHitec)}
                    >
                        <Image
                            source={
                                require('../assets/images/logo_hitec.jpg')
                            }
                            style={s.image}
                        />
                    </TouchableHighlight>
                </View>

                <ScrollView contentContainerStyle={{flexGrow: 1}} style={[s.container]}>
                    <View style={[s.center, s.container, {justifyContent: 'center', paddingHorizontal: 15}]}>
                        <Text style={s.stext}>{text.homeL1}</Text>
                        <Text style={[s.stext]}>{text.homeL2}</Text>
                        <Text style={[s.stext]}>{text.homeL3}</Text>
                        <Text style={[s.stext, s.mb_md]}>{text.homeL4}</Text>
                    </View>
                </ScrollView>

                <View style={[s.center, {justifyContent: 'center', marginVertical: 12}]}>
                    <View style={[s.center]}>
                        <Button info
                                onPress={() => navigate('Params')
                                }><Text> Commencer </Text>
                        </Button>
                    </View>
                </View>

            </View>
        );
    }
}
