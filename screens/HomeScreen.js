import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import text from '../constants/Text'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    WebView,
    Linking,
    TouchableHighlight
} from 'react-native';


import {Button, Text} from 'native-base';

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
            <ScrollView style={s.container}>
                <View style={[s.container, s.center,]}>
                    <TouchableHighlight
                        onPress={() => Linking.openURL('http://www.hitec.fr/')}
                    >
                        <Image
                            source={
                                require('../assets/images/logo_hitec.jpg')
                            }
                            style={s.Image}
                        />
                    </TouchableHighlight>
                </View>

                <View style={[s.container, s.center, s.m_md]}>
                    <Text style={s.text}>{text.homeL1}</Text>
                    <Text style={[s.text]}>{text.homeL2}</Text>
                    <Text style={[ s.text]}>{text.homeL3}</Text>
                    <Text style={[s.text, s.mb_lg]}>{text.homeL4}</Text>

                    <View style={[s.center,s.mb_lg]}>
                    <Button info
                            onPress={() => navigate('Params')
                            }><Text> Commencer </Text>
                    </Button>
                    </View>
                </View>

            </ScrollView>
        );
    }
}
