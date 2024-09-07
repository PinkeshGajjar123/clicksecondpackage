import React from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import localImage from '../assets/icons/temp.png';

const HomeScreen = ({ navigation }) => {
  // Get the device's width
  const { width } = Dimensions.get('window');
  
  // Calculate the item width and height
  const itemWidth = (width / 2) - 10;
  const itemHeight = (itemWidth * 16) / 9;

  // Dummy data for FlatList
  const data = [
    { id: '1', image: 'https://fastly.picsum.photos/id/113/200/300.jpg?hmac=DvsBBpPushDywwuMaEX4gQacembMMccz2r-xKWuO82k',  video: 'https://d1g3m9ml694eqp.cloudfront.net/1698065327.mp4' },
    { id: '2', image: 'https://www.kasandbox.org/programming-images/avatars/leaf-red.png', video: 'https://d1g3m9ml694eqp.cloudfront.net/1702889929.mp4' },
    // Add more items as needed
  ];

  const handlePress = (item) => {
    navigation.navigate('Details', { video: item.video });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          //source={{ uri: 'https://fastly.picsum.photos/id/808/300/200.jpg?hmac=GhrvVqhvi-YWyNtrtCTGw805gEWHd22reK48kzxd1Os' }}
          source={localImage}
          style={styles.headerImage}
        />
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={[styles.itemContainer, { width: itemWidth, height: itemHeight }]}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  viewflatList: {
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  headerImage: {
    width: '100%',
    height: 200, // 16:9 aspect ratio
    resizeMode: 'cover',
  },
  itemContainer: {
    margin: 5, // Add some margin between items
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default HomeScreen;
