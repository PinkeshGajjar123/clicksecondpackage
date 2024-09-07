import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, Modal, Animated, Easing, PanResponder } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const previewCount = 0.5;
const itemWidth = width / (previewCount + 0.5);
const startScroll = (itemWidth * 3) / 4;

const NewDetailsScreen = ({ videoUri, closeParentModal }) => {
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;

  const data = [
    { id: '1', title: 'Item 1', color: 'orange', videoUri },
    { id: '2', title: 'Item 2', color: 'blue', videoUri },
    { id: '3', title: 'Item 3', color: 'red', videoUri },
    // Add more items as needed
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 150) {
          closeModal();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={() => {
        if (playingVideoIndex === index) {
          setPlayingVideoIndex(null); // Pause the video if it's currently playing
        } else {
          setPlayingVideoIndex(index); // Play the video if it's not playing
        }
      }}
    >
      <Text style={styles.text}>{item.title}</Text>
      <TouchableOpacity style={styles.closeButtonContainer} onPress={closeParentModal}>
        <Image
          source={require('../assets/icons/close_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Video
        source={{ uri: item.videoUri }}
        style={styles.video}
        controls={false}
        resizeMode="cover"
        repeat={true}
        paused={playingVideoIndex !== index} // Paused if not the currently playing index
      />
      {playingVideoIndex !== index && (
        <View style={styles.playPauseContainer}>
          <Image
            source={require('../assets/icons/play_player.png')}
            style={styles.playPauseIcon}
          />
        </View>
      )}
      <FlatList
        data={[...Array(24).keys()]} // Customize data per vertical item if needed
        renderItem={({ item: horizontalItem }) => (
          <TouchableOpacity style={styles.horizontalView} onPress={openModal}>
            <Text style={styles.text}>{horizontalItem}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        decelerationRate={0}
        snapToOffsets={[...Array(24).keys()].map((_, i) => i * itemWidth)}
        snapToAlignment="center"
        style={styles.horizontalList}
        contentContainerStyle={styles.horizontalListContent}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').height}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            setVisibleVideoIndex(index);
          }
        }}
        style={styles.verticalList}
      />
      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.overlayTouchable} onPress={closeModal} />
            <Animated.View
              style={[styles.modalContainer, { transform: [{ translateY }] }]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.modalText}>This is a modal!</Text>
            </Animated.View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  playPauseContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseIcon: {
    width: 50,
    height: 50,
  },
  horizontalList: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  horizontalListContent: {
    paddingBottom: 20,
  },
  horizontalView: {
    backgroundColor: '#eee',
    width: itemWidth - 20,
    margin: 10,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalList: {
    backgroundColor: 'lightgray',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    height: 300,
    backgroundColor: 'darkgray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default NewDetailsScreen;
