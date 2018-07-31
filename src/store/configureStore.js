import { createStore, applyMiddleware } from 'redux';
import reduxInmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducer  from '../reducers';

export default function configureStore(initialState){
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk,reduxInmutableStateInvariant())
    );
};
