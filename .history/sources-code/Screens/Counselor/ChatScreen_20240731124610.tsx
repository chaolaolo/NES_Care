// import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import HeaderComponent from '../../../components/Header/HeaderComponent';
// import firestore from '@react-native-firebase/firestore';
// import { Pressable } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser } from '../../redux/Reducers/userReducer';

// const ChatScreen = ({ route }) => {
//     const navigation = useNavigation();
//     const user = useSelector(state => state.user.user);
//     const dispatch = useDispatch();
//     const { uid, fullName, avatar, chatId } = route.params;

//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [isOpponentOnline, setIsOpponentOnline] = useState(false);
//     const [selectedMessageId, setSelectedMessageId] = useState(null);
//     const flatListRef = useRef(null);

//     useEffect(() => {
//         const unsubscribe = firestore()
//             .collection('Users')
//             .doc(user.uid)
//             .onSnapshot(documentSnapshot => {
//                 if (documentSnapshot.exists) {
//                     const userData = documentSnapshot.data();
//                     dispatch(setUser(userData));
//                 } else {
//                     console.log('User does not exist.');
//                 }
//             }, error => {
//                 console.log('Error fetching user data: ', error);
//             });

//         const unsubscribeMessages = firestore()
//             .collection('Messages')
//             .where('chatId', '==', chatId)
//             .orderBy('createdAt', 'asc')
//             .onSnapshot(querySnapshot => {
//                 if (querySnapshot) {
//                     // const messages = querySnapshot.docs.map(doc => {
//                     //     const data = doc.data();
//                     //     return {
//                     //         ...data,
//                     //         id: doc.id,
//                     //         createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
//                     //     };
//                     // });
//                     // setMessages(messages);
//                     const messages = [];
//                     querySnapshot.forEach(doc => {
//                         const data = doc.data();
//                         messages.push({
//                             ...data,
//                             id: doc.id,
//                             createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
//                         });
//                     });
//                     setMessages(messages);
//                     flatListRef.current?.scrollToEnd({ animated: true });
//                 }
//             });

//         const unsubscribeOpponentStatus = firestore()
//             .collection('Users')
//             .doc(uid)
//             .onSnapshot(docSnapshot => {
//                 if (docSnapshot.exists) {
//                     setIsOpponentOnline(docSnapshot.data().isOnline);
//                 }
//             });

//         return () => {
//             unsubscribe();
//             unsubscribeMessages();
//             unsubscribeOpponentStatus();
//         };
//     }, [uid, chatId, user.uid, dispatch]);

//     // useEffect(() => {
//     //     const unsubscribe = firestore()
//     //         .collection('Messages')
//     //         .where('chatId', '==', chatId)
//     //         .orderBy('createdAt', 'asc')
//     //         .onSnapshot(querySnapshot => {
//     //             if (querySnapshot) {
//     //                 const messages = querySnapshot.docs.map(doc => {
//     //                     const data = doc.data();
//     //                     return {
//     //                         ...data,
//     //                         id: doc.id,
//     //                         createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
//     //                     };
//     //                 });
//     //                 setMessages(messages);
//     //                 flatListRef.current?.scrollToEnd({ animated: true });
//     //             }
//     //         });

//     //     const unsubscribeOpponentStatus = firestore()
//     //         .collection('Users')
//     //         .doc(uid)
//     //         .onSnapshot(docSnapshot => {
//     //             if (docSnapshot.exists) {
//     //                 setIsOpponentOnline(docSnapshot.data().isOnline);
//     //             }
//     //         });

//     //     return () => { unsubscribe(); unsubscribeOpponentStatus() };
//     // }, [uid, chatId]);

//     const sendMessage = async () => {
//         if (message.trim()) {
//             const newMessage = {
//                 text: message,
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//                 chatId: chatId,
//                 receiver: uid, // ID người nhận
//                 sender: user?.uid, // ID người gửi

//             };
//             //     receiver: {
//             //         uid, // ID người nhận
//             //         fullName,
//             //     },
//             //     sender: {
//             //         uid: user?.uid, // ID người gửi
//             //         fullName: user.fullName,
//             //     },

//             try {
//                 await firestore().collection('Messages').add(
//                     newMessage,
//                     // createdAt: firestore.FieldValue.serverTimestamp(),
//                 );

//                 // Update local state immediately
//                 setMessages(prevMessages => [...prevMessages, newMessage]);
//                 setMessage('');
//                 flatListRef.current?.scrollToEnd({ animated: true });
//             } catch (error) {
//                 console.error("Error sending message: ", error);
//             }
//         }
//     };

//     const handlePressMessage = (id) => {
//         setSelectedMessageId(prevId => (prevId === id ? null : id));
//     };

//     const renderItem = ({ item }) => {
//         // const isCurrentUser = uid === user.uid;
//         const isCurrentUser = item?.sender === user?.uid;
//         const isSelected = item.id === selectedMessageId;

//         return (
//             <Pressable
//                 onPress={() => handlePressMessage(item.id)}>
//                 <View style={[styles.messageRow, isCurrentUser ? styles.messageRowRight : styles.messageRowLeft]}>
//                     {!isCurrentUser && <Image source={{ uri: avatar }} style={[styles.avatar, { width: 30, height: 30 }]} />}
//                     <View style={isCurrentUser ? styles.messageContainerRight : styles.messageContainerLeft}>
//                         {/* <Text style={styles.messageUser}>{user.fullName}</Text> */}
//                         <Text style={styles.messageText}>{item.text}</Text>
//                         {isSelected && <Text style={styles.messageTime}>{item.createdAt.toLocaleString()}</Text>}
//                     </View>
//                 </View>
//             </Pressable >
//         );
//     }

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}>
//             <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Image source={require('../../image/ic_arrow_left.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
//                 </TouchableOpacity>
//                 <Image style={styles.avatar} source={avatar ? { uri: avatar } : require('../../image/ic_LeftinputUserName.png')} />
//                 <View>
//                     <Text style={styles.headerTitle}>
//                         {fullName}
//                     </Text>
//                     <Text style={[styles.headerTitle, { fontSize: 14, fontWeight: '400' }]}>
//                         {isOpponentOnline ? <Text style={{ color: 'lightblue' }}>online</Text> : <Text style={{ color: 'pink' }}>offline</Text>}
//                     </Text>
//                     <Text>
//                     </Text>
//                 </View>
//             </HeaderComponent>

//             <View
//                 style={{ paddingTop: 100, marginBottom: 100 }}
//             >
//                 <FlatList
//                     ref={flatListRef}
//                     data={messages}
//                     renderItem={renderItem}
//                     keyExtractor={(item, index) => index.toString()}
//                     onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//                 />
//             </View>

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

//         </KeyboardAvoidingView >
//     );
// }

// export default ChatScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     headerContainer: {
//         width: '100%',
//         backgroundColor: 'rgba(0,0,0,0.05)',
//         position: 'absolute',
//         top: 0,
//         zIndex: 2,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 20,
//         color: '#432C81',
//         fontWeight: 'bold',
//         flex: 1,
//         marginLeft: 10,
//     },
//     onlineStatus: {
//         fontSize: 14,
//         color: 'green',
//     },
//     avatar: {
//         backgroundColor: '#EDECF4',
//         borderRadius: 100,
//         width: 50,
//         height: 50,
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
//         borderTopColor: 'lightgreen',
//         // backgroundColor: 'white'
//     },
//     inputMessage: {
//         backgroundColor: '#F3F6F6',
//         borderRadius: 10,
//         width: '80%',
//         paddingHorizontal: 10,
//         height: 70,
//     },
//     messageRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//         marginHorizontal: 10,
//     },
//     messageRowLeft: {
//         justifyContent: 'flex-start',
//     },
//     messageRowRight: {
//         justifyContent: 'flex-end',
//     },
//     messageContainerLeft: {
//         backgroundColor: '#E4F9F3',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 10,
//         alignSelf: 'flex-start',
//     },
//     messageContainerRight: {
//         backgroundColor: '#D4E6F1',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 10,
//         alignSelf: 'flex-end',
//     },
//     messageUser: {
//         fontWeight: 'bold',
//         marginBottom: 5,
//         color: 'black',
//     },
//     messageText: {
//         fontSize: 16,
//         color: 'black',
//     },
//     messageTime: {
//         fontSize: 12,
//         color: 'gray',
//         marginTop: 5,
//     },
// });





import React, { useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

const ChatScreen = ({ route, navigation }) => {
    const { fullName, avatar, uid, chatId } = route.params;
    const user = useSelector(state => state.user.user);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.avatar} source={avatar ? { uri: avatar } : require('../../image/ic_LeftinputUserName.png')} />
                    <Text style={styles.headerName}>{fullName}</Text>
                </View>
            ),
        });
    }, [navigation, fullName, avatar]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
        return unsubscribe;
    }, [chatId]);

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                senderId: user.uid,
                receiverId: uid,
                message: message,
                createdAt: firestore.FieldValue.serverTimestamp(),
            };

            await firestore().collection('chats').doc(chatId).collection('messages').add(newMessage);
            setMessage('');
        }
    };

    const renderItem = ({ item }) => {
        const isCurrentUser = item.senderId === user.uid;

        return (
            <View style={[styles.messageContainer, isCurrentUser && styles.currentUserMessageContainer]}>
                {!isCurrentUser && (
                    <Image style={styles.messageAvatar} source={avatar ? { uri: avatar } : require('../../image/ic_LeftinputUserName.png')} />
                )}
                <View style={[styles.messageBubble, isCurrentUser ? styles.currentUserMessageBubble : styles.otherUserMessageBubble]}>
                    <Text style={styles.messageText}>{item.message}</Text>
                    <Text style={styles.messageTimestamp}>{moment(item.createdAt.toDate()).format('LT')}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                inverted
                contentContainerStyle={styles.messagesList}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập tin nhắn...'
                        value={message}
                        onChangeText={setMessage}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EDECF4',
    },
    messagesList: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end',
    },
    currentUserMessageContainer: {
        justifyContent: 'flex-end',
    },
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#EDECF4',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
    },
    currentUserMessageBubble: {
        backgroundColor: '#DCF8C6',
    },
    otherUserMessageBubble: {
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    messageTimestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#EDEDED',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EDEDED',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#432C81',
        borderRadius: 25,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
