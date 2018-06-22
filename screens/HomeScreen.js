import React from 'react';
import styles from '../constants/Style'
import color from '../constants/Colors'
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
    };

    constructor(props) {
        super(props);

    }

    render() {
        this.OS = Platform.OS === 'ios' ? 'ios' : 'android';
        const {navigate} = this.props.navigation;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <TouchableHighlight
                        onPress={() => Linking.openURL('http://www.hitec.fr/')}
                    >
                        <Image
                            source={
                                require('../assets/images/logo_hitec.jpg')
                            }
                            style={styles.welcomeImage}
                        />
                    </TouchableHighlight>
                </View>

                <View style={[{marginBottom: 40, flex:1}, styles.getStartedContainer]}>
                    <Text style={styles.getStartedText}>{text.homeL1}</Text>
                    <Text style={[{marginTop: 15}, styles.getStartedText]}>{text.homeL2}</Text>
                    <Text style={[{marginTop: 15}, styles.getStartedText]}>{text.homeL3}</Text>
                    <Text style={[{marginTop: 15, marginBottom: 30}, styles.getStartedText]}>{text.homeL4}</Text>

                    <View style={{ alignItems: 'center'}}>
                    <Button primary
                            onPress={() => navigate('Params')
                            }><Text> Commencer </Text>
                    </Button>
                    </View>
                </View>



            </ScrollView>
        );
    }
}
