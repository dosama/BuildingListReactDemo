import _ from 'lodash';
import buildings from '../data/buildings.json';
const initialState = {
    buildings: buildings,
    user: {}
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, user: action.payload
            };
        case 'ADD_USER_BUILDING':
            return {
                ...state, 
                buildings: [...state.buildings, action.payload],
                user: { ...state.user, buildings: [...state.user.buildings, action.payload] }
            };
        case 'RREMOVE_USER_BUILDING':
            const newState = {...state};
            _.remove(newState.buildings,  action.payload );
            _.remove(newState.user.buildings, action.payload );
            return newState;
        default:
            return state;
    }
}