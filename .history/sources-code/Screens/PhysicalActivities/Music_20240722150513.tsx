// // import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { DrawerActions, useNavigation } from '@react-navigation/native';
// // import firestore from '@react-native-firebase/firestore'

// // const Music = () => {
// //     const navigation = useNavigation();
// //     const [SelectedMusicSection, setSelectedMusicSection] = useState('Meditation');
// //     const [listMusic, setListMusic] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     const handleActivityChange = (section) => {
// //         setSelectedMusicSection(section);
// //         setLoading(true);
// //     };


// //     useEffect(() => {
// //         const unsubscribe = firestore()
// //             .collection('Music')
// //             .where('category', '==', SelectedMusicSection)
// //             .orderBy('date', 'desc')
// //             .onSnapshot(querySnapshot => {
// //                 if (querySnapshot) {
// //                     const list = [];
// //                     querySnapshot.forEach(doc => {
// //                         const { name, link, category, artist } = doc.data();
// //                         list.push({
// //                             id: doc.id,
// //                             name,
// //                             link,
// //                             category,
// //                             artist
// //                         });
// //                     });
// //                     setListMusic(list);
// //                 } else {
// //                     console.warn("Không nhận được querySnapshot");
// //                     setListMusic([]);
// //                 }
// //                 setLoading(false);
// //             }, error => {
// //                 console.error("Lỗi khi lấy tài liệu: ", error);
// //                 setLoading(false);
// //             });

// //         return () => unsubscribe();
// //     }, [SelectedMusicSection]);

// //     // const filteredList = listMusic.filter(item =>
// //     //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
// //     // );


// //     const renderItem = ({ item }) => (
// //         <Pressable
// //             style={styles.itemContainer}>
// //             <Text style={styles.dateText}>{item.name}</Text>
// //             <Text style={styles.dateText}>{item.category}</Text>
// //             <Text style={styles.dateText}>{item.artist}</Text>
// //             {/* </TouchableOpacity> */}
// //         </Pressable>
// //     );

// //     return (
// //         <SafeAreaView style={styles.container}>
// //             <View style={styles.header}>
// //                 <TouchableOpacity onPress={() => navigation.goBack('PhysicalActivities')}>
// //                     <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
// //                 </TouchableOpacity>
// //                 <Text style={styles.headerTitle}>Music</Text>
// //             </View>

// //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
// //                 <Pressable
// //                     onPress={() => handleActivityChange('Meditation')}
// //                     style={{
// //                         flex: 1,
// //                         // backgroundColor: selectedActivity === 'Move' ? '#007bff' : '#ccc',
// //                         paddingVertical: 5,
// //                         justifyContent: 'center',
// //                         alignItems: 'center',
// //                         borderColor: '#21CE9C',
// //                         borderBottomWidth: SelectedMusicSection === 'Meditation' ? 1 : 0,
// //                     }}>
// //                     <Text style={{
// //                         color: SelectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81',
// //                         fontWeight: SelectedMusicSection === 'Meditation' ? 'bold' : 'normal',
// //                         fontSize: 16
// //                     }}>Meditation</Text>
// //                 </Pressable>
// //                 <Pressable
// //                     onPress={() => handleActivityChange('Yoga')}
// //                     style={{
// //                         flex: 1,
// //                         // backgroundColor: selectedActivity === 'Yoga' ? '#007bff' : '#ccc',
// //                         paddingVertical: 5,
// //                         alignItems: 'center',
// //                         justifyContent: 'center',
// //                         borderColor: '#21CE9C',
// //                         borderBottomWidth: SelectedMusicSection === 'Yoga' ? 1 : 0,
// //                     }}>
// //                     <Text style={{
// //                         color: SelectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81',
// //                         fontWeight: SelectedMusicSection === 'Yoga' ? 'bold' : 'normal',
// //                         fontSize: 16
// //                     }}>Yoga</Text>
// //                 </Pressable>
// //             </View>
// //             <View style={styles.listContainer}>
// //                 {loading ? (
// //                     <View style={{ flex: 1, alignSelf: 'center' }}>
// //                         <ActivityIndicator
// //                             animating={true}
// //                             size="large"
// //                             color="#432C81"
// //                             hidesWhenStopped={true} />
// //                     </View>
// //                 ) :
// //                     listMusic.length > 0 ?
// //                         (<FlatList
// //                             numColumns={2}
// //                             data={listMusic}
// //                             keyExtractor={item => item.id}
// //                             renderItem={renderItem}
// //                         />)
// //                         :
// //                         (<Text style={{ alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: 20 }}>This page is empty</Text>)
// //                 }

// //             </View>
// //         </SafeAreaView>
// //     )
// // }

// // export default Music

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: 'white'
// //     },
// //     header: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         padding: 20,
// //     },
// //     headerTitle: {
// //         fontSize: 20,
// //         color: '#432C81',
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         flex: 1,
// //         marginLeft: -20
// //     },
// // })

// import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

// const Music = () => {
//     const navigation = useNavigation();
//     const [selectedMusicSection, setSelectedMusicSection] = useState('Meditation');
//     const [listMusic, setListMusic] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const handleActivityChange = (section) => {
//         setSelectedMusicSection(section);
//         setLoading(true); // Bắt đầu tải dữ liệu mới khi thay đổi tab
//     };

    
//     const renderItem = ({ item }) => (
//         <Pressable style={styles.itemContainer}>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemText}>{item.category}</Text>
//             <Text style={styles.itemText}>{item.artist}</Text>
//         </Pressable>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Music</Text>
//             </View>

//             <View style={styles.tabContainer}>
//                 <Pressable
//                     onPress={() => handleActivityChange('Meditation')}
//                     style={[
//                         styles.tabButton,
//                         { borderBottomWidth: selectedMusicSection === 'Meditation' ? 2 : 0 }
//                     ]}>
//                     <Text style={[
//                         styles.tabText,
//                         { color: selectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81', fontWeight: selectedMusicSection === 'Meditation' ? 'bold' : 'normal' }
//                     ]}>Meditation</Text>
//                 </Pressable>
//                 <Pressable
//                     onPress={() => handleActivityChange('Yoga')}
//                     style={[
//                         styles.tabButton,
//                         { borderBottomWidth: selectedMusicSection === 'Yoga' ? 2 : 0 }
//                     ]}>
//                     <Text style={[
//                         styles.tabText,
//                         { color: selectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81', fontWeight: selectedMusicSection === 'Yoga' ? 'bold' : 'normal' }
//                     ]}>Yoga</Text>
//                 </Pressable>
//             </View>
            
//             <View style={styles.listContainer}>
//                 {loading ? (
//                     <View style={styles.loadingContainer}>
//                         <ActivityIndicator size="large" color="#432C81" />
//                     </View>
//                 ) : listMusic.length > 0 ? (
//                     <FlatList
//                         numColumns={2}
//                         data={listMusic}
//                         keyExtractor={item => item.id}
//                         renderItem={renderItem}
//                     />
//                 ) : (
//                     <Text style={styles.emptyText}>This page is empty</Text>
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// }

// export default Music;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 20,
//     },
//     headerTitle: {
//         fontSize: 20,
//         color: '#432C81',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         flex: 1,
//         marginLeft: -34 // Adjust this value to properly center the title
//     },
//     tabContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     tabButton: {
//         flex: 1,
//         paddingVertical: 10,
//         alignItems: 'center',
//         borderBottomColor: '#21CE9C',
//     },
//     tabText: {
//         fontSize: 16,
//     },
//     listContainer: {
//         flex: 1,
//         padding: 10,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     itemContainer: {
//         flex: 1,
//         margin: 5,
//         padding: 10,
//         backgroundColor: '#f9f9f9',
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     itemText: {
//         fontSize: 16,
//         color: '#432C81',
//     },
//     emptyText: {
//         alignSelf: 'center',
//         textAlignVertical: 'center',
//         flex: 1,
//         fontSize: 20,
//     },
// });import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Music = () => {
    const navigation = useNavigation();
    const [selectedMusicSection, setSelectedMusicSection] = useState('Meditation');
    const [listMusic, setListMusic] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleActivityChange = (section) => {
        setSelectedMusicSection(section);
        setLoading(true); // Bắt đầu tải dữ liệu mới khi thay đổi tab
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Music')
            .where('category', '==', selectedMusicSection)
            .orderBy('date', 'desc')
            .onSnapshot(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    console.log('Document data:', data); // Debugging: kiểm tra dữ liệu tài liệu
                    const { name, link, category, artist } = data;
                    list.push({
                        id: doc.id,
                        name,
                        link,
                        category,
                        artist
                    });
                });
                console.log('Music list:', list); // Debugging: kiểm tra danh sách nhạc
                setListMusic(list);
                setLoading(false);
            }, error => {
                console.error("Lỗi khi lấy tài liệu: ", error);
                setListMusic([]);
                setLoading(false);
            });

        return () => unsubscribe();
    }, [selectedMusicSection]);

    const renderItem = ({ item }) => (
        <Pressable style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.category}</Text>
            <Text style={styles.itemText}>{item.artist}</Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ width: 34, height: 34 }} source={require('../../image/ic_arrow_left.png')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Music</Text>
            </View>

            <View style={styles.tabContainer}>
                <Pressable
                    onPress={() => handleActivityChange('Meditation')}
                    style={[
                        styles.tabButton,
                        { borderBottomWidth: selectedMusicSection === 'Meditation' ? 2 : 0 }
                    ]}>
                    <Text style={[
                        styles.tabText,
                        { color: selectedMusicSection === 'Meditation' ? '#21CE9C' : '#432C81', fontWeight: selectedMusicSection === 'Meditation' ? 'bold' : 'normal' }
                    ]}>Meditation</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleActivityChange('Yoga')}
                    style={[
                        styles.tabButton,
                        { borderBottomWidth: selectedMusicSection === 'Yoga' ? 2 : 0 }
                    ]}>
                    <Text style={[
                        styles.tabText,
                        { color: selectedMusicSection === 'Yoga' ? '#21CE9C' : '#432C81', fontWeight: selectedMusicSection === 'Yoga' ? 'bold' : 'normal' }
                    ]}>Yoga</Text>
                </Pressable>
            </View>
            
            <View style={styles.listContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#432C81" />
                    </View>
                ) : listMusic.length > 0 ? (
                    <FlatList
                        numColumns={2}
                        data={listMusic}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={styles.emptyText}>This page is empty</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

export default Music;

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
        marginLeft: -34 // Adjust this value to properly center the title
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomColor: '#21CE9C',
    },
    tabText: {
        fontSize: 16,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        color: '#432C81',
    },
    emptyText: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1,
        fontSize: 20,
    },
});
