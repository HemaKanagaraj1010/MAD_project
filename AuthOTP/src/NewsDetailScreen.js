// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// const NewsDetailScreen = ({ route }) => {
//   const { headline, description, imageUrl } = route.params;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{ uri: imageUrl }} style={styles.image} />
//       <Text style={styles.headline}>{headline}</Text>
//       <View style={styles.descriptionContainer}>
//         <Text style={styles.description} numberOfLines={null}>{description}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   image: {
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   headline: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   descriptionContainer: {
//     marginBottom: 20,
//   },
//   description: {
//     fontSize: 18,
//     lineHeight: 24,
//   },
// });

// export default NewsDetailScreen;



import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, ImageBackground,Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const NewsDetailScreen = ({ route }) => {
  const { headline, description, imageUrl } = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({ headerShown: false });

      return () => {
        navigation.setOptions({ headerShown: true });
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/bk5.jpg')} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
          <Text style={styles.headline}>{headline}</Text>
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.description}
              multiline={true}
              editable={false}
              value={description}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50, // Adjust top padding to create a gap
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F4591',
    marginTop: 30,
  },
  imageContainer: {
    marginTop: 0, // Adjust margin top to remove gap
  },
  image: {
    height: 400,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color: '#555',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(235, 245, 255, 0.4)',
  },
});

export default NewsDetailScreen;