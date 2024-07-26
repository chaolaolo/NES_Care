import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/Store/store'
import { NavigationContainer } from '@react-navigation/native'
import App from './App'

export default function AppRun() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <App/>
      {/* </NavigationContainer> */}
    </Provider>
  )
}