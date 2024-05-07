// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import NewsCard from './NewsCard';

// const News = ({ navigation }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'https://newsdata.io/api/1/news?apikey=pub_399110ccc6597edb64299b53b97580389fcdb&country=in,jp,gb,us,wo&language=en&category=technology'
//         );
//         setArticles(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePress = (headline, description, imageUrl) => {
//     navigation.navigate('NewsDetail', { headline, description, imageUrl });
//   };

//   const renderNewsCard = ({ item }) => (
//     <NewsCard
//       article={item}
//       onPress={() => handlePress(item.title, item.description, item.image_url)}
//     />
//   );

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={articles}
//         keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
//         renderItem={renderNewsCard}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default News;

import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Animated, Easing, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import axios from 'axios';
import NewsCard from './NewsCard';

const News = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRotationAnimation = useRef(new Animated.Value(0)).current; // Initial rotation value for header
  const cardBounceAnimation = useRef(new Animated.Value(0)).current; // Initial scale value for news cards

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://newsdata.io/api/1/news?apikey=pub_399110ccc6597edb64299b53b97580389fcdb&country=in,jp,gb,us,wo&language=en&category=technology'
        );
        // Filter articles with description
        const articlesWithDescription = response.data.results.filter(article => article.description);
        setArticles(articlesWithDescription);
        setLoading(false);
        // Trigger animations after data is fetched
        Animated.parallel([
          Animated.timing(headerRotationAnimation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(cardBounceAnimation, {
            toValue: 1,
            friction: 2,
            tension: 40,
            useNativeDriver: true,
          })
        ]).start();
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = (headline, description, imageUrl) => {
    navigation.navigate('NewsDetail', { headline, description, imageUrl });
  };

  const renderNewsCard = ({ item, index }) => {
    const cardScale = cardBounceAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    });

    return (
      <Animated.View style={{ transform: [{ scale: cardScale }] }}>
        <TouchableOpacity onPress={() => handlePress(item.title, item.description, item.image_url)}>
          <NewsCard article={item} navigation={navigation} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ rotateZ: headerRotationAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}>
        <ImageBackground source={require('../assets/newshead1.jpg')} style={styles.headerImage} imageStyle={{ resizeMode: 'cover' }}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Tech News Hub</Text>
            <Text style={styles.quote}>Stay Informed, Stay Ahead!</Text>
          </View>
        </ImageBackground>
        <View style={styles.headerShape} />
      </Animated.View>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        renderItem={renderNewsCard}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfe',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 160, // Adjust the height as needed
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  headerTextContainer: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Lighter background color with opacity
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DFC7f9',
    marginBottom: 8,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#DFC8F9',
  },
  headerShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: windowWidth,
    backgroundColor: '#f0f8ff', // Background color of the header
    transform: [{ translateY: -50 }],
    zIndex: -1,
    borderBottomLeftRadius: windowWidth,
    borderBottomRightRadius: windowWidth,
  },
});

export default News;