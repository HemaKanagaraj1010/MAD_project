import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UsersPage = ({ route }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { batchYear } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('users')
          .where('batch', '==', batchYear.toString())
          .get();

        // Extract user data from query snapshot
        const fetchedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort users based on the last three digits of register number
        fetchedUsers.sort((a, b) => {
          const aLastThreeDigits = parseInt(a.registerNumber.slice(-3));
          const bLastThreeDigits = parseInt(b.registerNumber.slice(-3));
          return aLastThreeDigits - bLastThreeDigits;
        });

        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [batchYear]);

  const handleUserPress = (userId) => {
    // Navigate to user profile page
    navigation.navigate('UserProfile', { userId });
  };

  const filteredUsers = users.filter(user => user.registerNumber.includes(searchQuery));

  return (
    <ImageBackground source={require('./images/graduation2.jpg')} style={styles.backgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Register Number"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView style={styles.scrollView}>
          {filteredUsers.map(user => (
            <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => handleUserPress(user.id)}>
              {/* Displaying dummy profile image */}
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>{user.name.charAt(0)}</Text>
              </View>
              <View style={styles.userInfoContainer}>
                <Text style={styles.registerNumber}>{user.registerNumber}</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
              {/* Add other user details here */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#F8F6E3'
  },
  searchInput: {
    height: 40,
    backgroundColor:'lightblue', // Light gray background color with opacity
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    paddingVertical:10,
    marginTop:20,
  },
  
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  userCard: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'lightblue', // Light blue background color with opacity
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  registerNumber: {
    fontSize: 16,
  },
});

export default UsersPage;
