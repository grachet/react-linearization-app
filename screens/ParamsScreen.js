import React from 'react';
import styles from '../constants/Style'
import {
    Image, Linking,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Switch
} from 'react-native';
import {Container, Header,  Content, H1, H2, H3, Button, Text, Item, Input} from 'native-base';
import text from "../constants/Text";

export default class ParamsScreen extends React.Component {
    static navigationOptions = {
        title: 'Dimension de la cuve',
    };

    constructor(props) {
        super(props);
    }


    render() {
        const {navigate} = this.props.navigation;
        return (


            <ScrollView style={styles.container}>

                <View style={[{marginBottom: 40, marginTop: 30}, styles.getStartedContainer]}>


                    <Text style={styles.getStartedText}>{text.paramInput1}</Text>

                    <Item rounded>
                        <Input/>
                    </Item>

                    <Text style={[{marginTop: 15}, styles.getStartedText]}>{text.paramInput2}</Text>

                    <Item rounded>
                        <Input/>
                    </Item>

                    <Text style={[{marginTop: 15}, styles.getStartedText]}>{text.paramInput3}</Text>

                    <Item rounded>
                        <Input/>
                    </Item>

                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Button primary
                                onPress={() => navigate('Abaque')
                        }><Text> Cuve diverse </Text>
                        </Button>
                    </View>
                    <View style={{marginTop: 15, alignItems: 'center'}}>
                        <Button primary
                                onPress={() => navigate('Result')
                        }><Text> Cuve cylindrique </Text>
                        </Button>
                    </View>

                    <Text
                        style={[{
                            marginTop: 20,
                            marginBottom: 30,
                            fontSize: 9
                        }, styles.getStartedText]}>{text.paramCylinderText}</Text>
                </View>


            </ScrollView>
        );
    }
}
