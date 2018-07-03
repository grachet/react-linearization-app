import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {
    Image, Linking,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Switch, Dimensions
} from 'react-native';
import {Container, Header, Content, H1, H2, H3, Button, Text, Item, Input} from 'native-base';
import text from "../constants/Text";
import fn from "../functions/calcul";
import t from 'tcomb-form-native';
import {connect} from 'react-redux'


var Form = t.form.Form;
const width = Dimensions.get('window').width;
const Params = t.struct({
    echelle: t.Number,
    hauteur: t.Number,
    volume: t.Number,
});

t.form.Form.stylesheet.textboxView.normal.marginBottom = 15;
t.form.Form.stylesheet.textbox.normal.backgroundColor = c.whiteGrey;
t.form.Form.stylesheet.textbox.error.backgroundColor = c.whiteGrey;
t.form.Form.stylesheet.controlLabel.normal.marginTop = 10;
t.form.Form.stylesheet.controlLabel.error.marginTop = 15;

const options = {
    fields: {
        echelle: {
            label: text.paramInput1,
            error: text.paramInputError1,
        },
        hauteur: {
            label: text.paramInput2,
            error: text.paramInputError2,
        },
        volume: {
            label: text.paramInput3,
            error: text.paramInputError2,
        },
    },
};


class ParamsScreen extends React.Component {
    static navigationOptions = {
        title: 'Dimension de la cuve',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,
    };

    constructor(props) {
        super(props);
    }


    submitParam = (type) => {
        const {navigate} = this.props.navigation;
        let value = this._form.getValue();
        if (type === 'cylindrique') {
            if (value) {
                this._setParams([].concat(value, {isCylinder: true}));
                const data = fn.getAbaqueCylinder(value);
                this._setPoints(data);
                navigate('Result')
            }

        }
        if (type === 'divers') {
            if (value) {
                this._setParams([].concat(value, {isCylinder: false}));
                this._setPoints([]);
                navigate('Abaque')
            }

        }
    }

    _setParams = (value) => {
        const action = {type: "SET_PARAMS", value: value}
        this.props.dispatch(action)
    };

    _setPoints = (value) => {
        const action = {type: "SET_POINTS", value: value};
        this.props.dispatch(action)
    };


    render() {
        const {navigate} = this.props.navigation;
        return (


            <ScrollView style={s.container}>

                <View style={[s.container, s.center, s.m_md]}>


                    <Form type={Params} ref={c => this._form = c} value={{
                        volume: this.props.volume,
                        hauteur: this.props.hauteur,
                        echelle: this.props.echelle,
                    }} options={options}/>


                    <View style={{marginTop: 15, alignItems: 'center'}}>
                        <Button
                            style={{backgroundColor: !this.props.volume ? c.tabIconDefault : this.props.isCylinder ? c.tabIconDefault : c.blueSky}}
                                onPress={() => this.submitParam('divers')
                                }><Text   style={{color: !this.props.volume ? c.greyText  : this.props.isCylinder ? c.greyText : c.white}}> Cuve divers </Text>
                        </Button>
                    </View>
                    <View style={[s.mb_lg, s.center, s.mt_md]}>
                        <Button
                            style={{backgroundColor: this.props.isCylinder ? c.blueSky : c.tabIconDefault}}
                                onPress={() => this.submitParam('cylindrique')
                                }><Text   style={{color: this.props.isCylinder ? c.white : c.greyText}}> Cuve cylindrique </Text>
                        </Button>
                    </View>

                    <Text
                        style={[s.mb_lg, s.text]}>{text.paramCylinderText}</Text>
                </View>


            </ScrollView>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ParamsScreen)

