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
    Dimensions
} from 'react-native';
import text from "../constants/Text";
import {Button, Input, Item, Text} from 'native-base';
import Modal from "react-native-modal";
import {Icon} from 'expo';
import t from 'tcomb-form-native';

const width = Dimensions.get('window').width;

var Form = t.form.Form;

const Point = t.struct({
    volume: t.Number,
    hauteur: t.Number,
});

t.form.Form.stylesheet.formGroup.normal.width = width-100;
t.form.Form.stylesheet.formGroup.error.width = width-100;
t.form.Form.stylesheet.textboxView.normal.marginBottom = 15;
t.form.Form.stylesheet.controlLabel.normal.marginTop = 10;
t.form.Form.stylesheet.controlLabel.error.marginTop = 15;


const options = {
    fields: {
        volume: {
            label: text.abaqueModalInput1,
            error: text.abaqueModalError1,
        },
        hauteur: {
            label: text.abaqueModalInput2,
            error: text.abaqueModalError2,
        },
    },
};

export default class AbaqueScreen extends React.Component {
    static navigationOptions = {
        title: 'Abaque',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,

    };

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            points: [],
        };

    }


    showModal = () => {
        this.setState({showModal: true});
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    addPoint = () => {

        const value = this._form.getValue();
        if (value) {
            console.log(value);
            this.hideModal();
        }

    }

    deletePoint = () => {

    }

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={[s.container]}>


                <ScrollView style={s.container}>

                    <View style={[s.container, s.center, s.m_md]}>


                        <Text style={s.text}>{text.abaqueHelp1}</Text>

                        <View style={{marginTop: 30, alignItems: 'center'}}>
                            <Button info
                                    onPress={() => navigate('Result')
                                    }><Text> Calculer résultat</Text>
                            </Button>
                        </View>


                        <View>
                            <Modal
                                isVisible={this.state.showModal}
                                backdropOpacity={0.3}
                                onBackButtonPress={() => this.hideModal()}
                                onBackdropPress={() => this.hideModal()}
                                onSwipe={() => this.hideModal()}
                                swipeDirection="right"
                                style={s.modalContainer}
                            >
                                <View style={[s.modalView, s.center]}>

                                    <Form type={Point} ref={c => this._form = c} options={options}/>

                                    <View style={[s.row, s.mt_lg, s.center]}>
                                        <View style={{marginRight: 5}}>
                                            <Button info
                                                    onPress={() => this.addPoint()
                                                    }><Text> Ajouter </Text>
                                            </Button>
                                        </View>
                                        <View style={{marginLeft: 5}}>
                                            <Button danger
                                                    onPress={() => this.hideModal()
                                                    }><Text> Annuler </Text>
                                            </Button>
                                        </View>
                                    </View>

                                </View>
                            </Modal>
                        </View>


                    </View>


                </ScrollView>

                <View style={[s.actionButton]}>
                    <TouchableOpacity
                        onPress={() => this.showModal()
                        }> <Icon.Ionicons
                        name={Platform.OS === 'ios'
                            ? 'ios-add-circle'
                            : 'md-add-circle'}
                        size={60}
                        color={c.blueSky}

                    />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
