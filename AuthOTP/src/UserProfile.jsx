import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const UserProfile = ({ route }) => {
  const [user, setUser] = useState(null);
  const { userId } = route.params;
  const [buttonAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = await firestore().collection('users').doc(userId).get();
        if (userRef.exists) {
          const userData = userRef.data();
          // Exclude fields like contact information and location
          const { contactInfo, location, ...filteredUserData } = userData;
          setUser(filteredUserData);
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
    // Navigate to ChatScreen with userId and userName as params
    navigation.navigate('ChatScreen', { userId: userId, userName: user.name });
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

  const getAvatarSource = (gender) => {
    return gender === 'Male'
      ? require('../assets/male_avatar.png')
      : require('../assets/female_avatar.png');
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
          <Image source={getAvatarSource(user.gender)} style={styles.profileImage} />
          <View style={styles.userInfo}>
            {Object.keys(user).map((field, index) => (
              <View key={index}>
                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}:</Text>
                <Text style={styles.info}>{user[field]}</Text>
              </View>
            ))}
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
            <Image source={require('../assets/chat.png')} style={styles.chatIcon} />
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
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  chatIcon: {
    width: 70,
    height: 70,
  },
});

export default UserProfile;
