import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, Modal, Animated, StyleSheet, Dimensions } from 'react-native';
import NewDetailsScreen from './NewDetailsScreen';

const screenWidth = Dimensions.get('window').width;

const NewHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start off-screen to the right

  // const data = [
  //   { id: '1', title: 'Item 1', color: 'red', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
  //   { id: '2', title: 'Item 2', color: 'blue', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1698065327.mp4' },
  //   // Add more items as needed
  // ];

  const data = [
    { id: '1', image: 'https://fastly.picsum.photos/id/113/200/300.jpg?hmac=DvsBBpPushDywwuMaEX4gQacembMMccz2r-xKWuO82k', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1698065327.mp4' },
    { id: '2', image: 'https://www.kasandbox.org/programming-images/avatars/leaf-red.png', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
    // Add more items as needed
  ];

  const itemWidth = (screenWidth / 2) - 10;
  const itemHeight = (itemWidth * 16) / 9;

  const handlePress = (item) => {
    setSelectedVideo(item.videoUri);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide in to 0 (fully visible)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeParentModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth, // Slide out to the right
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedVideo(null);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => handlePress(item)}>
          //   <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
          //     {/* Add any item UI here */}
          //   </View>
          // </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={[styles.itemContainer, { width: itemWidth, height: itemHeight }]}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
        </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeParentModal}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          <NewDetailsScreen videoUri={selectedVideo} closeParentModal={closeParentModal} />
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    margin: 5,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: '100%',
    zIndex: 1000,
  },
});

export default NewHomeScreen;
