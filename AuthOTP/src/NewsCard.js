// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { Card } from 'react-native-elements';

// const NewsCard = ({ article, onPress }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <Card containerStyle={styles.card}>
//         <Card.Image source={{ uri: article.image_url }} style={styles.image} />
//         <Card.Title style={styles.title}>{article.title}</Card.Title>
//         <Text numberOfLines={2} style={styles.description}>{article.description}</Text>
//       </Card>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   image: {
//     height: 200,
//     resizeMode: 'cover',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//   },
// });

// export default NewsCard;



import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const NewsCard = ({ article, navigation }) => {
  const handlePress = () => {
    navigation.navigate('NewsDetail' ,{ headline: article.title, description: article.description, imageUrl: article.image_url });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card containerStyle={styles.card}>
        <Card.Image source={{ uri: article.image_url }} style={styles.image} />
        <Card.Title style={styles.title}>{article.title}</Card.Title>
        <Text numberOfLines={2} style={styles.description}>{article.description}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor:'#d5d6fc',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#522289',
  },
  description: {
    fontSize: 16,
  },
});

export default NewsCard;