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

var Nil = t.Nil;
function toNull(value) {
    return (t.Str.is(value) && value.trim() === '') || Nil.is(value) ? null : value;
}

var myNumberTransformer = {
    format: value => Nil.is(value) ? null : String(value),
    parse: value =>{
        if(value)
            value = value.replace(/,/g, '.');
        var n = parseFloat(value);
        var isNumeric = (value - n + 1) >= 0;
        return isNumeric ? n : toNull(value);
    }
};
// Globally set number transformer
t.form.Textbox.numberTransformer = myNumberTransformer;

t.form.Form.stylesheet.textboxView.normal.marginBottom = 8;
t.form.Form.stylesheet.textbox.normal.backgroundColor = c.whiteGrey;
t.form.Form.stylesheet.textbox.error.backgroundColor = c.whiteGrey;
t.form.Form.stylesheet.controlLabel.normal.marginTop = 8;
t.form.Form.stylesheet.controlLabel.error.marginTop = 15;

const width = Dimensions.get('window').width;

var echelleType = t.refinement(t.Number, function (n) {
    return n >= 0 && n <= 9999;
});
var hauteurType = t.refinement(t.Number, function (n) {
    return n >= 0 && n <= 9999;
});
var volumeType = t.refinement(t.Number, function (n) {
    return n >= 0 && n <= 9999;
});

echelleType.getValidationErrorMessage = function (value, path, context) {
    return value === null ? text.longNoEchelle : isNaN(value) ? text.notNumber : value > 9999 ? text.tooBigEchelle : text.longNoEchelle;
};
hauteurType.getValidationErrorMessage = function (value, path, context) {
    return  value === null ? text.longNoHauteur : isNaN(value) ? text.notNumber : value > 9999 ? text.tooBigHauteur : text.longNoHauteur;
};
volumeType.getValidationErrorMessage = function (value, path, context) {
    return value === null ? text.longNoVolume : isNaN(value) ? text.notNumber : value > 9999 ? text.tooBigVolume : text.longNoVolume;
};


//La pleine échelle est inférieure à la hauteur de cuve. Etes-vous sûr ?...



const Params = t.struct({
    echelle: echelleType,//echelleType,
    hauteur: hauteurType,
    volume: volumeType,
});


const options = {
    fields: {
        echelle: {
            label: text.paramInput1,
        },
        hauteur: {
            label: text.paramInput2,
        },
        volume: {
            label: text.paramInput3,
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
        this.state ={};
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
                if (this.props.volume && this.props.isCylinder) {
                    this._setPoints([]);
                }

                this._setParams([].concat(value, {isCylinder: false}));
                navigate('Abaque')
            }

        }
    }

    onChangeForm(value, path) {
        let newValue = fn.clearNumber(value[path])
        value[path] = newValue;
        this.setState({value});
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

//todo KeyboardAwareScrollView 
            <ScrollView style={s.container}>

                <View style={[s.container, s.center, s.m_md]}>


                    <Form type={Params} ref={c => this._form = c}
                          value={{
                              volume: this.props.volume,
                              hauteur: this.props.hauteur,
                              echelle: this.props.echelle,
                          }}
                          options={options}
                    />


                    <View style={{marginTop: 15, alignItems: 'center'}}>
                        <Button
                            style={{backgroundColor: !this.props.volume ? c.tabIconDefault : this.props.isCylinder ? c.tabIconDefault : c.blueSky}}
                            onPress={() => this.submitParam('divers')
                            }><Text
                            style={{color: !this.props.volume ? c.lgreyText : this.props.isCylinder ? c.lgreyText : c.white}}> Cuve
                            diverse </Text>
                        </Button>
                    </View>
                    <View style={[s.mb_lg, s.center, s.mt_md]}>
                        <Button
                            style={{backgroundColor: this.props.isCylinder ? c.blueSky : c.tabIconDefault}}
                            onPress={() => this.submitParam('cylindrique')
                            }><Text style={{color: this.props.isCylinder ? c.white : c.lgreyText}}> Cuve
                            cylindrique </Text>
                        </Button>
                    </View>

                    {/*<Text style={[s.mb_lg, s.text]}>{text.paramCylinderText}</Text>*/}
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

