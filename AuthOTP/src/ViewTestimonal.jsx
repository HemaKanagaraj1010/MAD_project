import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snapshot = await firestore().collection('testimonials').get();
        const testimonialList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimonials(testimonialList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials: ', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testimonials</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {testimonials.map(testimonial => (
            <View key={testimonial.id} style={styles.card}>
              <Text style={styles.name}>{testimonial.name}</Text>
              <Text style={styles.email}>{testimonial.email}</Text>
              <Text style={styles.message}>{testimonial.message}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
});

export default ViewTestimonial;

