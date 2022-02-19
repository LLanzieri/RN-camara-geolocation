// navigation
import MainNavigator from './src/navigation/index.js'
import {
  Provider
} from 'react-redux'
import React from 'react';
import store from './src/store/index.js'

export default function App() {
  return (
    <Provider store={store} >
      < MainNavigator />
    </Provider>
  );
}