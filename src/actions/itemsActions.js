import * as types from './actionTypes';
import ItemApi from '../api/ItemApi';

export function loadItemsSuccess(items){
    return {type: types.LOAD_ITEMS_SUCCESS, items};
}

export function loadItems(query){
    return function(dispatch){
        return ItemApi.searchItems(query).then( items=>{
            dispatch(loadItemsSuccess(items));
        }).catch( error => {
            console.log(error);
        });
    }
}

export function loadItemDetailSuccess(itemDetail){
    return {type: types.LOAD_ITEM_DETAIL_SUCCESS, itemDetail};
}

export function loadItemDetail(id){
    return function(dispatch){
        return ItemApi.findItemById(id).then( itemDetail=>{
            dispatch(loadItemDetailSuccess(itemDetail));
        }).catch( error => {
            console.log(error);
        });
    }
}