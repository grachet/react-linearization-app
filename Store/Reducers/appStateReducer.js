const initialState = {echelle: null, hauteur: null, volume: null, isCylinder: false, points: []};

function setAppState(state = initialState, action) {
    let nextState
    switch (action.type) {

        case 'DELETE_POINT':
            nextState = {
                ...state,
                points: state.points.filter((item, index) => index !== action.index)
            };
            return nextState || state;

        case 'ADD_POINT':
            nextState = {
                ...state,
                points: [...state.points, action.value]
            };
            return nextState || state;

        case 'MOD_POINT':
            let data = JSON.parse(JSON.stringify(state.points));
            data[action.index - 1] = action.value;
            nextState = {
                ...state,
                points: data
            };
            return nextState || state;

        case 'SET_POINTS':
            nextState = {
                ...state,
                points: [...action.value]
            };
            return nextState || state;

        case 'SET_PARAMS':
            nextState = {
                ...state,
                echelle: action.value[0].echelle,
                hauteur: action.value[0].hauteur,
                volume: action.value[0].volume,
                isCylinder: action.value[1].isCylinder,
            };
            return nextState || state;

        default:
            return state
    }
}

export default setAppState

