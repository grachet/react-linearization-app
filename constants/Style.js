import {Dimensions, Platform} from 'react-native';
import c from './Colors'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {

    row: {
        flexDirection: 'row'
    },
    center: {
        alignItems: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: c.mainBackgroundApp
    },
    m_md: {
        marginHorizontal: 25,
        marginTop: 15,
        marginBottom: 25,
    },
    mb_pixel: {
        marginBottom: 1,
    },
    mt_md: {
        marginTop: 15,
    },
    mt_lg: {
        marginTop: 30,
    },
    mb_md: {
        marginBottom: 15,
    },
    mb_lg: {
        marginBottom: 30,
    },
    actionButton: {
        position: 'absolute',
        bottom: 25,
        right:25,
        zIndex:1000,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    image: {
        width: width,
        height: 0.45 * width,
        resizeMode: 'contain',
        marginTop: 3,
        marginHorizontal: 10,
    },
    modalContainer: {
        justifyContent: 'flex-start',
       marginTop: 40,
       // marginHorizontal: 30,
    },

    modalView: {
        backgroundColor: c.white,
        borderRadius: 20,
        padding: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

    text: {
        fontSize: 17,
        color: c.greyText,
        lineHeight: 24,
        textAlign: Platform.OS === 'ios' ? 'justify' : 'center',
        marginTop: 15,
    },
    boldText: {
        fontSize: 17,
        color: c.greyText,
        lineHeight: 24,
        textAlign: Platform.OS === 'ios' ? 'justify' : 'center',
        marginTop: 15,
        fontWeight: "bold",
        backgroundColor: c.blueSky
    },
    sm_text: {
        fontSize: 15,
        color: c.greyText,
        lineHeight: 24,
        textAlign: Platform.OS === 'ios' ? 'justify' : 'center',
    },
    backgroundWhite: {
        backgroundColor: c.whiteGrey,
    }

};
