import {items, itemDetail}  from './itemsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    items,
    itemDetail
});

export default rootReducer;