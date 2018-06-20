import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import userReducer from './store/reducers/user'
import postReducer from './store/reducers/post'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    userPreCombine: userReducer,
    post: postReducer
})

const logger = store => {
    return next => {
        return action => {
            console.log('[middleware]',action)
            const result = next(action)
            console.log('[middleware]', store.getState())
            return result
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
