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
        setLoading(true);
    };


    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Music')
            .where('category', '==', SelectedMusicSection)
            .orderBy('date', 'desc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot) {
                    const list = [];
                    querySnapshot.forEach(doc => {
                        const { name, link, category, artist } = doc.data();
                        list.push({
                            id: doc.id,
                            name,
                            link,
                            category,
                            artist
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
    }, [SelectedMusicSection]);

    // const filteredList = listMusic.filter(item =>
    //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );


    const renderItem = ({ item }) => (
        <Pressable
            style={styles.itemContainer}>
            <Text style={styles.dateText}>{item.name}</Text>
            <Text style={styles.dateText}>{item.category}</Text>
            <Text style={styles.dateText}>{item.artist}</Text>
            {/* </TouchableOpacity> */}
        </Pressable>
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
            <View style={styles.listContainer}>
                {loading ? (
                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <ActivityIndicator
                            animating={true}
                            size="large"
                            color="#432C81"
                            hidesWhenStopped={true} />
                    </View>
                ) :
                    listMusic.length > 0 ?
                        (<FlatList
                            numColumns={2}
                            data={listMusic}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />)
                        :
                        (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
                }

            </View>
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