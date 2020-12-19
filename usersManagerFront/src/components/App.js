import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/UsersReducers';
import thunk from 'redux-thunk';
import IsLogin from './IsLogin';

const store = createStore(reducers, applyMiddleware(thunk));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <IsLogin />
      </Provider>
    );
  }
}
