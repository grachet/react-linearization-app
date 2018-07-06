import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {Dimensions, ScrollView, View} from 'react-native';
import {Button, Text} from 'native-base';
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
    parse: value => {
        if (value)
            value = value.replace(/,/g, '.');
        var n = parseFloat(value);
        var isNumeric = (value - n + 1) >= 0;
        return isNumeric ? n : toNull(value);
    }
};
const width = Dimensions.get('window').width;

// Globally set number transformer
t.form.Textbox.numberTransformer = myNumberTransformer;

// clone the default stylesheet
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// Globally change style of form
stylesheet.textbox.normal.backgroundColor = c.whiteGrey;
stylesheet.textbox.error.backgroundColor = c.whiteGrey;
stylesheet.textbox.normal.height = 30;
stylesheet.textbox.error.height = 30;
stylesheet.controlLabel.normal.fontSize = 16;
stylesheet.controlLabel.error.fontSize = 16;
stylesheet.errorBlock.fontSize = 14;
stylesheet.errorBlock.marginBottom = 8;
stylesheet.fieldset.width = width;
stylesheet.fieldset.paddingHorizontal = 30;
stylesheet.textbox.normal.width = width - 60;
stylesheet.textbox.error.width = width - 60;

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
    return value === null ? text.longNoHauteur : isNaN(value) ? text.notNumber : value > 9999 ? text.tooBigHauteur : text.longNoHauteur;
};
volumeType.getValidationErrorMessage = function (value, path, context) {
    return value === null ? text.longNoVolume : isNaN(value) ? text.notNumber : value > 9999 ? text.tooBigVolume : text.longNoVolume;
};

const Params = t.struct({
    echelle: echelleType,
    hauteur: hauteurType,
    volume: volumeType,
});

const options = {
    stylesheet: stylesheet,
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
    };

    _setParams = (value) => {
        const action = {type: "SET_PARAMS", value: value}
        this.props.dispatch(action)
    };
    _setPoints = (value) => {
        const action = {type: "SET_POINTS", value: value};
        this.props.dispatch(action)
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={[s.container, s.center]}>

                <View style={[{flex: 1}, s.mt_md]}>
                    <ScrollView style={s.container}>
                        <Form type={Params} ref={c => this._form = c}
                              value={{
                                  volume: this.props.volume,
                                  hauteur: this.props.hauteur,
                                  echelle: this.props.echelle,
                              }}
                              options={options}
                        />
                    </ScrollView>
                </View>

                <View style={[{marginVertical: 15,}, s.row, s.center]}>
                    <View style={s.center}>
                        <Button
                            style={{
                                backgroundColor: !this.props.volume ? c.tabIconDefault : this.props.isCylinder ? c.tabIconDefault : c.blueSky,
                                marginRight: 4
                            }}
                            onPress={() => this.submitParam('divers')
                            }><Text
                            style={{
                                color: !this.props.volume ? c.lgreyText : this.props.isCylinder ? c.lgreyText : c.white
                            }}>Cuve
                            diverse</Text>
                        </Button>
                    </View>
                    <View style={[s.center]}>
                        <Button
                            style={{
                                backgroundColor: this.props.isCylinder ? c.blueSky : c.tabIconDefault,
                                marginLeft: 4
                            }}
                            onPress={() => this.submitParam('cylindrique')
                            }><Text style={{color: this.props.isCylinder ? c.white : c.lgreyText}}>Cylindrique</Text>
                        </Button>
                    </View>
                </View>
            </View>
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

