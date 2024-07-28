// import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import HeaderComponent from '../../../components/Header/HeaderComponent';
// import firestore from '@react-native-firebase/firestore';

// const ChatScreen = ({ route }) => {
//     const navigation = useNavigation();
//     const { uid, fullName, avatar } = route.params;

//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const unsubscribe = firestore()
//             .collection('Messages')
//             .where('chatId', '==', uid)
//             .orderBy('createdAt', 'asc')
//             .onSnapshot(querySnapshot => {
//                 if (querySnapshot) {
//                     const messages = querySnapshot.docs.map(doc => {
//                         const data = doc.data();
//                         return {
//                             ...data,
//                             createdAt: data.createdAt.toDate(),
//                         };
//                     });
//                     setMessages(messages);
//                 }
//             });

//         return () => unsubscribe();
//     }, [uid]);

//     const sendMessage = async () => {
//         if (message.trim()) {
//             await firestore().collection('Messages').add({
//                 text: message,
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//                 chatId: uid,
//                 user: {
//                     uid, // User ID
//                     fullName,
//                 },
//             });
//             setMessage('');
//         }
//     };

//     const renderItem = ({ item }) => (
//         <View style={styles.messageContainer}>
//             <Text style={styles.messageUser}>{item.user.fullName}</Text>
//             <Text style={styles.messageText}>{item.text}</Text>
//         </View>
//     );

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}>
//             <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Image source={require('../../image/ic_arrow_left.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
//                 </TouchableOpacity>
//                 <Image source={{ uri: avatar }} style={styles.avatar} />
//                 <Text style={styles.headerTitle}>{fullName}</Text>
//             </HeaderComponent>

//             <FlatList
//                 data={messages}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={{ paddingTop: 100, paddingBottom: 60 }}
//             />

//             <View style={styles.boxInput}>
//                 <TextInput
//                     placeholder='Type message here...'
//                     style={styles.inputMessage}
//                     value={message}
//                     onChangeText={setMessage}
//                 />
//                 <TouchableOpacity onPress={sendMessage}>
//                     <Image source={require('../../image/ic_send.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
//                 </TouchableOpacity>
//             </View>

//             <Text>{fullName}</Text>
//         </KeyboardAvoidingView>
//     )
// }

// export default ChatScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     }, headerContainer: {
//         // backgroundColor: '#E4F9F3',
//         width: '100%',
//         backgroundColor: 'white',
//         position: 'absolute',
//         top: 0,
//         zIndex: 2,
//         flexDirection: 'row',
//         alignItems: 'center',
//         // justifyContent: 'space-between'
//     },
//     headerTitle: {
//         fontSize: 20,
//         color: '#432C81',
//         fontWeight: 'bold',
//         flex: 1,
//         // backgroundColor: '#E4F9F3',
//         marginLeft: 10
//     },
//     avatar: {
//         backgroundColor: '#EDECF4',
//         borderRadius: 100,
//         width: 50, height: 50
//     },
//     boxInput: {
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 10,
//         alignItems: 'center',
//         borderTopWidth: 0.5,
//         borderTopColor: 'lightgreen'
//     },
//     inputMessage: {
//         backgroundColor: '#F3F6F6',
//         borderRadius: 10,
//         width: '80%',
//         paddingHorizontal: 10,
//         height: 70
//     },
//     messageContainer: {
//         backgroundColor: '#E4F9F3',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 10,
//     },
//     messageUser: {
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color: 'black'
//     },
//     messageText: {
//         fontSize: 16,
//         color: 'black'
//     },
// })

import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const { uid, fullName, avatar, chatId } = route.params;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Messages')
            .where('chatId', '==', chatId)
            .orderBy('createdAt', 'asc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const messages = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            ...data,
                            createdAt: data.createdAt.toDate(),
                        };
                    });
                    setMessages(messages);
                }
            });

        return () => unsubscribe();
    }, [uid]);

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                createdAt: new Date(),
                chatId: chatId,
                user: {
                    uid, // User ID
                    fullName,
                },
            };

            try {
                await firestore().collection('Messages').add({
                    ...newMessage,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });

                // Update local state immediately
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    const renderItem = ({ item }) => (
        <View style={item.user.uid === uid ? styles.messageContainerRight : styles.messageContainerLeft}>
            <Text style={styles.messageUser}>{item.user.fullName}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
                </TouchableOpacity>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.headerTitle}>{fullName}</Text>
            </HeaderComponent>

            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingTop: 100, paddingBottom: 60 }}
            />

            <View style={styles.boxInput}>
                <TextInput
                    placeholder='Type message here...'
                    style={styles.inputMessage}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Image source={require('../../image/ic_send.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },
    avatar: {
        backgroundColor: '#EDECF4',
        borderRadius: 100,
        width: 50,
        height: 50,
    },
    boxInput: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: 'lightgreen',
    },
    inputMessage: {
        backgroundColor: '#F3F6F6',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 10,
        height: 70,
    },
    messageContainerLeft: {
        backgroundColor: '#E4F9F3',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        alignSelf: 'flex-start',
    },
    messageContainerRight: {
        backgroundColor: '#D4E6F1',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        alignSelf: 'flex-end',
    },
    messageUser: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    messageText: {
        fontSize: 16,
        color: 'black',
    },
});
