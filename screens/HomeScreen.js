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
    TouchableHighlight, Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


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

            <View style={[s.container]}>

                <View style={[s.center, {flex: 0.30, backgroundColor: c.white}]}>
                    <TouchableHighlight
                        onPress={() => Linking.openURL('http://www.hitec.fr/')}
                    >
                        <Image
                            source={
                                require('../assets/images/logo_hitec.jpg')
                            }
                            style={s.image}
                        />
                    </TouchableHighlight>
                </View>

                <ScrollView style={s.container}>
                    <View style={[s.center, {flex: 0.75, paddingHorizontal: 15, paddingTop : 8}]}>
                        <Text style={s.stext}>{text.homeL1}</Text>
                        <Text style={[s.stext]}>{text.homeL2}</Text>
                        <Text style={[s.stext]}>{text.homeL3}</Text>
                        <Text style={[s.stext, s.mb_md]}>{text.homeL4}</Text>
                    </View>
                </ScrollView>

                <View style={[s.center, {flex: 0.20, justifyContent: 'center'}]}>
                    <View style={[s.center]}>
                        <Button info
                                small={height < 600}
                                onPress={() => navigate('Params')
                                }><Text> Commencer </Text>
                        </Button>
                    </View>
                </View>

            </View>
        );
    }
}
