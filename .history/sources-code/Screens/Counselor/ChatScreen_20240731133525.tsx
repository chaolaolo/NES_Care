import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import firestore from '@react-native-firebase/firestore';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Reducers/userReducer';

const ChatScreen = ({ route }) => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const { uid, fullName, avatar, chatId } = route.params;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpponentOnline, setIsOpponentOnline] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const flatListRef = useRef(null);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const userData = documentSnapshot.data();
                    dispatch(setUser(userData));
                } else {
                    console.log('User does not exist.');
                }
            }, error => {
                console.log('Error fetching user data: ', error);
            });

        const unsubscribeMessages = firestore()
            .collection('Messages')
            .where('chatId', '==', chatId)
            .orderBy('createdAt', 'asc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    // const messages = querySnapshot.docs.map(doc => {
                    //     const data = doc.data();
                    //     return {
                    //         ...data,
                    //         id: doc.id,
                    //         createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                    //     };
                    // });
                    // setMessages(messages);
                    const messages = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        messages.push({
                            ...data,
                            id: doc.id,
                            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                        });
                    });
                    setMessages(messages);
                    flatListRef.current?.scrollToEnd({ animated: true });
                }
            });

        const unsubscribeOpponentStatus = firestore()
            .collection('Users')
            .doc(uid)
            .onSnapshot(docSnapshot => {
                if (docSnapshot.exists) {
                    setIsOpponentOnline(docSnapshot.data().isOnline);
                }
            });

        return () => {
            unsubscribe();
            unsubscribeMessages();
            unsubscribeOpponentStatus();
        };
    }, [uid, chatId, user.uid, dispatch]);

    // useEffect(() => {
    //     const unsubscribe = firestore()
    //         .collection('Messages')
    //         .where('chatId', '==', chatId)
    //         .orderBy('createdAt', 'asc')
    //         .onSnapshot(querySnapshot => {
    //             if (querySnapshot) {
    //                 const messages = querySnapshot.docs.map(doc => {
    //                     const data = doc.data();
    //                     return {
    //                         ...data,
    //                         id: doc.id,
    //                         createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
    //                     };
    //                 });
    //                 setMessages(messages);
    //                 flatListRef.current?.scrollToEnd({ animated: true });
    //             }
    //         });

    //     const unsubscribeOpponentStatus = firestore()
    //         .collection('Users')
    //         .doc(uid)
    //         .onSnapshot(docSnapshot => {
    //             if (docSnapshot.exists) {
    //                 setIsOpponentOnline(docSnapshot.data().isOnline);
    //             }
    //         });

    //     return () => { unsubscribe(); unsubscribeOpponentStatus() };
    // }, [uid, chatId]);

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                createdAt: firestore.FieldValue.serverTimestamp(),
                chatId: chatId,
                receiver: uid, // ID người nhận
                sender: user?.uid, // ID người gửi
                
            };
            //     receiver: {
            //         uid, // ID người nhận
            //         fullName,
            //     },
            //     sender: {
            //         uid: user?.uid, // ID người gửi
            //         fullName: user.fullName,
            //     },
            // };

            try {
                await firestore().collection('Messages').add(
                    newMessage,
                    // createdAt: firestore.FieldValue.serverTimestamp(),
                );

                // Update local state immediately
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
                flatListRef.current?.scrollToEnd({ animated: true });
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        }
    };

    const handlePressMessage = (id) => {
        setSelectedMessageId(prevId => (prevId === id ? null : id));
    };

    const renderItem = ({ item }) => {
        // const isCurrentUser = uid === user.uid;
        const isCurrentUser = item?.sender.uid === user?.uid;
        const isSelected = item.id === selectedMessageId;

        return (
            <Pressable
                onPress={() => handlePressMessage(item.id)}>
                <View style={[styles.messageRow, isCurrentUser ? styles.messageRowRight : styles.messageRowLeft]}>
                    {!isCurrentUser && <Image source={{ uri: avatar }} style={[styles.avatar, { width: 30, height: 30 }]} />}
                    <View style={isCurrentUser ? styles.messageContainerRight : styles.messageContainerLeft}>
                        {/* <Text style={styles.messageUser}>{user.fullName}</Text> */}
                        <Text style={styles.messageText}>{item.text}</Text>
                        {isSelected && <Text style={styles.messageTime}>{item.createdAt.toLocaleString()}</Text>}
                    </View>
                </View>
            </Pressable >
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderComponent title="Eats and Drinks" style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../image/ic_arrow_left.png')} style={{ marginRight: 10, width: 50, height: 50 }} />
                </TouchableOpacity>
                <Image style={styles.avatar} source={avatar ? { uri: avatar } : require('../../image/ic_LeftinputUserName.png')} />
                <View>
                    <Text style={styles.headerTitle}>
                        {fullName}
                    </Text>
                    <Text style={[styles.headerTitle, { fontSize: 14, fontWeight: '400' }]}>
                        {isOpponentOnline ? <Text style={{ color: 'lightblue' }}>online</Text> : <Text style={{ color: 'pink' }}>offline</Text>}
                    </Text>
                    <Text>
                    </Text>
                </View>
            </HeaderComponent>

            <View
                style={{ paddingTop: 100, marginBottom: 100 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
            </View>

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

        </KeyboardAvoidingView >
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
        backgroundColor: 'rgba(0,0,0,0.05)',
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
    onlineStatus: {
        fontSize: 14,
        color: 'green',
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
        // backgroundColor: 'white'
    },
    inputMessage: {
        backgroundColor: '#F3F6F6',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 10,
        height: 70,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    messageRowLeft: {
        justifyContent: 'flex-start',
    },
    messageRowRight: {
        justifyContent: 'flex-end',
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
    messageTime: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
});

