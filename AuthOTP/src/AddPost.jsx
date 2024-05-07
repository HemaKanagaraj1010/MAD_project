import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddPost = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('./images/mike.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Alumni Connect</Text>
        <Text style={styles.quote}>"Empowering future generations. Connecting alumni with opportunities."</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddJob')}
            style={[styles.button, { backgroundColor: 'red' }]}
          >
            <Image source={require('./images/job.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddBroadcast')}
            style={[styles.button, { backgroundColor: 'blue' }]}
          >
            <Image source={require('./images/live-streaming.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTestimonal')}
            style={[styles.button, { backgroundColor: 'green' }]}
          >
            <Image source={require('./images/testimonial.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50, // Space from the top
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 30,
    color: 'white',
  },
  iconsContainer: {
    flexDirection: 'column', // Display icons vertically
    alignItems: 'center', // Align icons at the center horizontally
  },
  button: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'blue', // Default background color
    marginBottom: 50, // Space between icons
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  gap: {
    height: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default AddPost;
