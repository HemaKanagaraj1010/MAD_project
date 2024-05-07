import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserProfile = ({ route }) => {
  const [user, setUser] = useState(null);
  const { userId } = route.params;
  const [buttonAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = await firestore().collection('users').doc(userId).get();
        if (userRef.exists) {
          setUser(userRef.data());
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChatPress = () => {
    // Handle chat button press action here
    console.log('Chat button pressed');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./images/profile_background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>User Profile</Text>
          <Image source={require('./images/profile_placeholder.jpg')} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.info}>{user.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{user.email}</Text>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.info}>{user.gender}</Text>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.info}>{user.dob}</Text>
            <Text style={styles.label}>Register Number:</Text>
            <Text style={styles.info}>{user.registerNumber}</Text>
            <Text style={styles.label}>Batch:</Text>
            <Text style={styles.info}>{user.batch}</Text>
            {/* Add other user fields here */}
          </View>
        </View>
        <Animated.View
          style={[
            styles.chatButton,
            {
              transform: [
                {
                  scale: buttonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={handleChatPress} onPressIn={animateButton}>
            <Text style={styles.chatButtonText}>Message</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userInfo: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
