import React from 'react';
import {Provider} from 'react-redux'
import './index.css';
import App from './components/App';
import * as ReactDOMClient from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers';
import thunk from 'redux-thunk';

// const logger = function ({dispatch, getState}){
//     return function (next) {
//         return function (action) {
//             //middleware code
//             console.log('ACTION_TYPE', action.type);
//             next(action);
//         }
//     }
// }
const logger = ({dispatch, getState}) => (next) => (action) => {
    if (typeof action !== 'function'){
        console.log('ACTION_TYPE=', action.type);
    }
    next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//     if(typeof action === 'function'){
//         action(dispatch);
//         return;
//     }
//     next(action);
// }

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
const store = createStore(combineReducers, applyMiddleware(logger, thunk));

console.log('store', store);
// export const storeContext = createContext();
// console.log('storecontect',storeContext)

// class Provider extends React.Component{
//     render(){
//         const {store} = this.props;
//         return <storeContext.Provider value={store}>
//             {this.props.children}
//         </storeContext.Provider>;
//     }
// }

// export function connect (callback) {
//     return function (Component) {
//         class ConnectedComponent extends React.Component{
//             constructor(props){
//                 super(props);
//                 this.props.store.subscribe(()=> this.forceUpdate());
//             }
//             render () {
//                 const {store} = this.props;
//                 const state = store.getState();
//                 const dataToBePass = callback(state);
//                 return (
//                     <Component {...dataToBePass} dispatch={store.dispatch} />
//                 );
//             }
//         };
//         class connectComponentWrapper extends React.Component{
//             render(){
//                 return(
//                     <storeContext.Consumer>
//                         {(store) => <ConnectedComponent store={store}/>}
//                     </storeContext.Consumer>
//                 )
//             }
//         }
//         return connectComponentWrapper;
//     };
// }
// console.log('BEFORE_STATE', store.getState());
// store.dispatch({
//     type: 'ADD_MOVIES',
//     movies: [{name: 'superman'}]
// });
// console.log('AFTER_STATE', store.getState());


root.render(
    <Provider store={store}>
        <App store={store} />
    </Provider>
);

