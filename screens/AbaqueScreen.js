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
} from 'react-native';
import text from "../constants/Text";
import {Button, Input, Item, Text} from 'native-base';
import Modal from "react-native-modal";
import {Icon} from 'expo';
import t from 'tcomb-form-native';
import ListItem from '../components/ListItem'

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
            points: [{
                "hauteur": 3,
                "volume": 5,
            },
                {
                    "hauteur": 3,
                    "volume": 6,
                },
                {
                    "hauteur": 3,
                    "volume": 4,
                },],
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
            this.hideModal();
            this.setState(prevState => ({
                points: [...prevState.points, value]
            }));
            this.setState(prevState => ({
                points: [...prevState.points, value]
            }));
            this.setState(prevState => ({
                points: [...prevState.points, value]
            }))
        }

    }

    deletePoint = (index) => {

        this.setState(prevState => ({
            points: prevState.points.splice(index, 1)
        }));

        console.log(this.state.points)
    }

    render() {
        const points = this.state.points;
        const addIconName = Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle';
        const {navigate} = this.props.navigation;
        return (

            <View style={[s.container]}>

                {(points === {} || points === 0 || points === null) &&
                <Text style={[s.m_md, s.text]}>{text.abaqueHelp1}</Text>}
                <View style={[s.center, s.mt_lg, s.mb_lg]}>
                <View>
                    <Button info
                            onPress={() => navigate('Result')}>
                        <Text>Calculer résultat</Text>
                    </Button>
                </View>
                </View>
                <ScrollView style={s.container}>

                    <View style={[s.container, s.center]}>




                        <FlatList
                            data={points}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <ListItem
                                    type={'abaque'}
                                    onDelete={this.deletePoint}
                                    values={item}
                                    index={index}
                                />
                            )}
                        />


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


                </ScrollView>
                <View style={[s.actionButton]}>
                    <TouchableOpacity
                        onPress={() => this.showModal()
                        }>
                        <Icon.Ionicons
                            name={addIconName}
                            size={60}
                            color={c.blueSky}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
