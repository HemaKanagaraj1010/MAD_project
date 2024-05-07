import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import AddPost from '../AddPost';
import ProfileScreen from '../ProfileScreen';

const Menu = ({ navigation }) => { // Receive the navigation prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToAddPost = () => {
    navigation.navigate('AddPost'); // Navigate to 'AddPost' screen
    toggleMenu(); // Close the menu after navigation
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen'); // Navigate to 'ProfileScreen'
    toggleMenu(); // Close the menu after navigation
  };

  return (
    <View style={styles.container}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
        <Ionicons name={isMenuOpen ? 'close' : 'menu'} size={30} color="#000" />
      </TouchableOpacity>

      {/* Menu Content */}
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToAddPost}>
            <Text>Add Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToProfile}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Necessary for positioning the menu content
  },
  menuIcon: {
    padding: 10,
    position: 'absolute', // Position icon absolutely within the container
    left: 10, // Adjust as needed to position the icon
    top: 10, // Adjust as needed to position the icon
  },
  menu: {
    position: 'absolute',
    top: 50, // Adjust as needed to position the menu correctly
    left: 10, // Adjust as needed to position the menu correctly
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
});

export default Menu;
