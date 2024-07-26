import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

const Music = () => {
    const navigation = useNavigation();
    const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
    const [listMusic, setListMusic] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
    };

    // useEffect(() => {
    //     const fetchMusic = async () => {
    //         setLoading(true);
    //         try {
    //             const musicList = [];
    //             const querySnapshot = await firestore()
    //                 .collection('Music')
    //                 .where('category', '==', SelectedMusicSection)
    //                 .get();
    //             querySnapshot.forEach(documentSnapshot => {
    //                 musicList.push({
    //                     ...documentSnapshot.data(),
    //                     key: documentSnapshot.id,
    //                 });
    //             });
    //             setListMusic(musicList);
    //         } catch (error) {
    //             console.error("Error fetching music: ", error);
    //         }
    //         setLoading(false);
    //     };

    //     fetchMusic();
    // }, [SelectedMusicSection]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Music')
            .where('category', '==', SelectedMusicSection)
            .orderBy('name', 'desc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const list = [];
                    querySnapshot.forEach(doc => {
                        const { name, artist, link, category } = doc.data();
                        list.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                    setListMusic(list);
                } else {
                    console.warn("Không nhận được querySnapshot");
                    setListMusic([]);
                }
                setLoading(false);
            }, error => {
                console.error("Lỗi khi lấy tài liệu: ", error);
                setLoading(false);
            });

        return () => unsubscribe();
    }, [setSelectedMusicSection]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack('PhysicalActivities')}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Music</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Pressable
                    onPress={() => handleActivityChange('Meditation')}
                    style={{
                        flex: 1,
                        // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
                        paddingVertical: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#21CE9C',
                        borderBottomWidth: SelectedMusicSection === 'Meditation' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: SelectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81',
                        fontWeight: SelectedMusicSection === 'Meditation' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Meditation</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleActivityChange('Yoga')}
                    style={{
                        flex: 1,
                        // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
                        paddingVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#21CE9C',
                        borderBottomWidth: SelectedMusicSection === 'Yoga' ? 1 : 0,
                    }}>
                    <Text style={{
                        color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
                        fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
                        fontSize: 16
                    }}>Yoga</Text>
                </Pressable>
            </View>
            {loading ? (
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color="#21CE9C"
                        hidesWhenStopped={true} />
                </View>
            ) : listMusic.length > 0 ? (
                <FlatList
                    data={listMusic}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    contentContainerStyle={styles.list}
                />
            )
                :
                (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
            }
        </SafeAreaView>
    )
}

export default Music

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: '#432C81',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -20
    },
})
