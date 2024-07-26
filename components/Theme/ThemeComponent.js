import { StyleSheet, Text, View } from 'react-native'
import React, {createContext, useContext, useState } from 'react'

const ThemContext = createContext();

export const useTheme = () => useContext(ThemContext);

export const ThemeComponent = ({children}) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    console.log('Theme using: ' + theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log('Theme changed to: ' + theme);
  }

  return (
    <ThemContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemContext.Provider>
  )
}

// export default ThemeComponent

const styles = StyleSheet.create({})