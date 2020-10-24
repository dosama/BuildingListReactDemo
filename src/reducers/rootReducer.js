import _ from 'lodash';
import actions from '../actions/actions';
import buildings from '../data/buildings.json';
const initialState = {
    buildings: buildings,
    user: null
}

export default function rootReducer(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, user: action.payload
            };
        case 'ADD_BUILDING':
            return {
                ...state, 
                buildings: [...state.buildings, action.payload]
            };
        case 'EDIT_BUILDING':
           
            const buildingDetails = newState.buildings.find((o)=> o.id == action.payload.id );
            buildingDetails.name = action.payload.name;
            buildingDetails.location = action.payload.location;
            return newState;
        case 'RREMOVE_BUILDING':
            _.remove(newState.buildings,  (o)=> o.id == action.payload );
           
            return newState;
        default:
            return state;
    }
}