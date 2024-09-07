import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setVisibleVideoIndex(viewableItems[0].index);
    }
  }).current;

  const data = [
    { id: '1', title: 'Item 1', color: 'red', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
    { id: '2', title: 'Item 2', color: 'blue', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1698065327.mp4' },
    { id: '3', title: 'Item 3', color: 'green', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
    { id: '4', title: 'Item 4', color: 'yellow', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1698065327.mp4' },
    { id: '5', title: 'Item 5', color: 'purple', videoUri: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
  ];

  const renderItem = ({ item, index }) => (
    <View style={[styles.item, { backgroundColor: item.color }]}>
      <Text style={styles.text}>{item.title}</Text>
      <TouchableOpacity style={styles.closeButtonContainer} onPress={() => navigation.goBack()}>
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
        paused={visibleVideoIndex !== index}
        onError={(error) => console.log('Video Error: ', error)}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={Dimensions.get('window').height}
      scrollEventThrottle={16}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default DetailsScreen;
