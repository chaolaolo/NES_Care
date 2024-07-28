import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/Store/store'
import App from './App'
import Move from './PhysicalActivities/Move'

export default function AppRun() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <App/>
        <Move/>
      {/* </NavigationContainer> */}
    </Provider>
  )
}