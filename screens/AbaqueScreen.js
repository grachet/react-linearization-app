import React from 'react';
import styles from '../constants/Style'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import text from "../constants/Text";
import {Button, Text} from 'native-base';
import Modal from "react-native-modal";
export default class AbaqueScreen extends React.Component {
    static navigationOptions = {
        title: 'Abaque',
    };

    constructor(props) {
        super(props);
        this.state = {
            showModal:false,

        };
    }

    showModal = () => {
        this.setState({ showModal:true});
    }

    hideModal = () => {
        this.setState({ showModal:false});
    }

    SavePoint = () => {

    }

    erase = () => {

    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={[{marginBottom: 40, marginTop: 30}, styles.getStartedContainer]}>


                    <Text style={styles.getStartedText}>{text.abaqueHelp1}</Text>

                    <Text style={[{marginTop: 15}, styles.getStartedText]}>{text.abaqueHelp2}</Text>

                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Button primary
                                onPress={() => navigate('Result')
                                }><Text> Calculer résultat</Text>
                        </Button>
                    </View>

                    <View style={{marginTop: 15, alignItems: 'center'}}>
                        <Button primary
                                onPress={() => this.erase()
                                }><Text> Tout effacer </Text>
                        </Button>
                    </View>

                    <View style={{ alignItems: 'center'}}>
                        <Button primary
                                onPress={() => this.showModal()
                                }><Text> Commencer </Text>
                        </Button>
                    </View>

                    <View>
                        <Modal isVisible={this.state.showModal}>
                            <View style={{ flex: 1 }}>
                                <Text>I am the modal content!</Text>
                                <Button primary
                                        onPress={() => this.hideModal()
                                        }><Text> hide </Text>
                                </Button>
                            </View>
                        </Modal>
                    </View>

                </View>


            </ScrollView>
        );
    }
}
