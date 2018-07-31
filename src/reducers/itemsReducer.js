import * as types from '../actions/actionTypes';

export function items(state={}, action) {
    switch ( action.type ) {
        case types.LOAD_ITEMS_SUCCESS: return Object.assign({},action.items); break;
        default: return state;
    }
};

export function itemDetail(state={}, action) {
    switch ( action.type ) {
        case types.LOAD_ITEM_DETAIL_SUCCESS: return Object.assign({},action.itemDetail); break;
        default: return state;
    }
};

