import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlumniSearch = () => {
  const navigation = useNavigation();

  const handleYearPress = (year) => {
    navigation.navigate('UsersPage', { batchYear: year }); // Passing batchYear parameter
  };

  // Generate years from 1991 to 2025
  const years = Array.from({ length: 2023 - 1989 + 1 }, (_, index) => 1989 + index).reverse();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.heading}>Alumni Search</Text>
        <Text style={styles.quote}>"Explore the alumni network by batch year"</Text>
      </View>
      <View style={styles.cardsContainer}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={styles.card}
            onPress={() => handleYearPress(year)}>
            <Text>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F8F6E3'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:20
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
});

export default AlumniSearch;
