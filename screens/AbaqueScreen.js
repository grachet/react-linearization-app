import React from 'react';
import s from '../constants/Style'
import c from '../constants/Colors'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
    FlatList,
    Alert,
} from 'react-native';
import text from "../constants/Text";
import {Button, Input, Item, Text} from 'native-base';
import Modal from "react-native-modal";
import {Icon} from 'expo';
import t from 'tcomb-form-native';
import ListItem from '../components/ListItem'
import {connect} from 'react-redux'

const width = Dimensions.get('window').width;

//Issue was fixed for me by removing a space I had between my tags.
//I've had the same problem for a while until I realized that in order to make a line break between 2 paragraphs, I had this {`\n`} between 2 Text components. Removing it fixed this issue for me
// I had a semi colon somewhere it shouldn't have been. return <View><Text>Hi!</Text>;</View>;
//https://github.com/facebook/react-native/issues/18773


var Form = t.form.Form;

const Point = t.struct({
    volume: t.Number,
    hauteur: t.Number,
});

t.form.Form.stylesheet.formGroup.normal.width = width - 100;
t.form.Form.stylesheet.formGroup.error.width = width - 100;


const options = {
    auto: 'placeholders',
    fields: {
        volume: {
            placeholder: text.abaqueModalInput1,
            error: text.abaqueModalError1,
        },
        hauteur: {
            placeholder: text.abaqueModalInput2,
            error: text.abaqueModalError2,
        },
    },
};

class AbaqueScreen extends React.Component {


    constructor(props) {
        super(props);
        this.headerTable = {
            "col1": 'Volume (m3 ou L)\t',
            "col2": 'Hauteur (m)'
        };
        this.state = {
            showModal: false,
            points: [],
            indexRow: null,
        };

    }

    static navigationOptions = {
        title: 'Abaque',
        headerStyle: {
            backgroundColor: c.blueSky,
        },
        headerTintColor: c.white,

    };


    showModal = () => {
        this.setState({showModal: true});
    }

    hideModal = () => {
        this.setState({showModal: false, indexRow: null});
    }

    addPoint = () => {


        const index = this.state.indexRow;

        console.log(index);

        const value = this._form.getValue();

        if (value && !index) {
            this.hideModal();
            const action = {type: "ADD_POINT", value: value};
            this.props.dispatch(action)
        }

        if (value && index) {
            this.hideModal();
            const action = {type: "MOD_POINT", value: value, index: index};
            this.props.dispatch(action)
        }

        this.setState({indexRow: null});

    }

    askDeletePoint = (index) => {

        Alert.alert(
            'Quelle action ?',
            '',
            [
                {text: 'Modifier', onPress: () => this.modifierPoint(index)},
                {text: 'Supprimer', onPress: () => this.deletePoint(index)},
                {text: 'Annuler'},
            ],
            {cancelable: false}
        )

    }

    modifierPoint = (index) => {
        this.setState({indexRow: index + 1});
        this.showModal();
    }

    deletePoint = (index) => {
        const action = {type: "DELETE_POINT", index: index}
        this.props.dispatch(action)
    }

    renderButton = () => {
        const addIconName = Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle';
        return (<View style={[s.actionButton]}>
            <TouchableOpacity
                onPress={() => this.showModal()
                }>
                <Icon.Ionicons
                    name={addIconName}
                    size={60}
                    color={c.blueSky}
                />
            </TouchableOpacity>
        </View>)
    }

    render() {

        const points = this.props.points;
        const noPoints = (points === {} || points.length === 0 || points === null)
        const noParams = !this.props.volume;

        const {navigate} = this.props.navigation;
        return (

            <View style={[s.container, s.center]}>

                {noParams &&
                <Text style={[s.textCenter, s.m_md, s.mt_lg]}>{text.noParams}</Text>
                }

                {noParams &&
                <View style={[s.center, s.mt_md]}>
                    <Button info
                            onPress={() => navigate('Params')}>
                        <Text> Ajouter </Text>
                    </Button>
                </View>
                }

                {noPoints && !noParams &&
                <Text style={[s.m_md, s.text]}>{text.abaqueHelp1}</Text>}

                {!noPoints &&
                <View style={[s.center, s.mt_lg, s.mb_lg]}>
                    <View>
                        <Button info
                                onPress={() => navigate('Result')}>
                            <Text>Résultats</Text>
                        </Button>
                    </View>
                </View>}


                <View style={[s.container, s.center]}>


                    {!noPoints &&
                    <ListItem
                        type={'header'}
                        values={this.headerTable}
                        index={''}
                    />}
                    <ScrollView style={s.container}>
                        <FlatList
                            data={points}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <ListItem
                                    type={'abaque'}
                                    onDelete={this.askDeletePoint}
                                    values={item}
                                    index={index}
                                />
                            )}
                        />

                    </ScrollView>

                    <View>
                        <Modal
                            isVisible={this.state.showModal}
                            backdropOpacity={0.3}
                            onBackButtonPress={() => this.hideModal()}
                            onBackdropPress={() => this.hideModal()}
                            onSwipe={() => this.hideModal()}
                            swipeDirection="right"
                            style={s.modalContainer}
                            avoidKeyboard={true}
                        >
                            <View style={[s.modalView, s.center]}>


                                <Form type={Point} ref={c => this._form = c} options={options}/>

                                <View style={[s.row, s.center]}>
                                    <View style={{marginRight: 5}}>
                                        <Button info
                                                onPress={() => this.addPoint()
                                                }><Text>Ajouter</Text>
                                        </Button>
                                    </View>
                                    <View style={{marginLeft: 5}}>
                                        <Button danger
                                                onPress={() => this.hideModal()
                                                }><Text>Annuler</Text>
                                        </Button>
                                    </View>
                                </View>

                            </View>
                        </Modal>
                    </View>


                </View>


                {!noParams && this.renderButton()}


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

export default connect(mapStateToProps, mapDispatchToProps)(AbaqueScreen)
