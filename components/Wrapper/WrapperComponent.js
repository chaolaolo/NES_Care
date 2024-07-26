import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WrapperComponent = ({ children, style, disableAvoidStatusBar = false, ...props }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.wrapper, style]}
      {...props}
    >
      {!disableAvoidStatusBar && <StatusBar barStyle="dark-content" backgroundColor="#61dafb" />}
      {children}
    </KeyboardAvoidingView>

  )
}

export default WrapperComponent

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // padding: 10,
    // margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    // Thêm các style mặc định khác nếu cần
  },
})