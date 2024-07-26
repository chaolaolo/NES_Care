// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React from 'react'

// const TextInputComponent = (props) => {
//   return (
//     <View>
//       {props.label && <Text style={st.label}>{props.label}</Text>}
//       <TextInput {...props}
//         placeholderTextColor={props.placeholderTextColor || 'gray'}
//         style={[props.tipStyle, st.input]}
//         numberOfLines={props.numberOfLines}
//         multiline={true}
//         value={props.value}
//         secureTextEntry={props.secureTextEntry}
//         onChangeText={props.onChangeText}
//         {...props}
//       />
//       {props.error && <Text style={st.errorText}>{props.error}</Text>}
//     </View>
//   )
// }

// export default TextInputComponent

// const st = StyleSheet.create({
//   input: {
//     padding: 10,
//     borderWidth: 1,
//     marginVertical: 5,
//     marginHorizontal: 10,
//     backgroundColor: '#F9FAFB',
//     borderRadius: 6,
//     borderColor: 'rgba(34, 31, 31, 0.1)'
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   inputError: {
//     borderColor: 'red',
//   },
//   errorText: {
//     marginHorizontal: 20,
//     color: 'red',
//     fontSize: 14,
//   },
// })


import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const TextInputComponent = ({
  secureTextEntry,
  label,
  placeholder,
  placeholderTextColor,
  tipStyle,
  numberOfLines,
  multiline,
  value,
  onChangeText,
  error,
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[tipStyle, styles.input]}
        numberOfLines={numberOfLines}
        multiline={multiline}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        editable={true}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderColor: 'rgba(34, 31, 31, 0.1)',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    marginHorizontal: 20,
    color: 'red',
    fontSize: 14,
  },
});
