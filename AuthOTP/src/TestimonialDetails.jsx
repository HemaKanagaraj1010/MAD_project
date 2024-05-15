import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TestimonialDetails = ({ route }) => {
  const { testimonialId } = route.params;
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const doc = await firestore().collection('testimonials').doc(testimonialId).get();
        if (doc.exists) {
          setTestimonial({ id: doc.id, ...doc.data() });
        } else {
          console.log('No such testimonial!');
        }
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };

    fetchTestimonial();

    return () => {
      // Cleanup
    };
  }, [testimonialId]);

  if (!testimonial) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('./images/viewtest2.jpeg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.heading}>{testimonial.name}</Text>
          <Text style={styles.detail}>Designation: <Text style={styles.value}>{testimonial.designation}</Text></Text>
          <Text style={styles.detail}>Company: <Text style={styles.value}>{testimonial.company}</Text></Text>
          <Text style={styles.detail}>Graduation Year: <Text style={styles.value}>{testimonial.graduationYear}</Text></Text>
          <Text style={styles.detail}>Email: <Text style={styles.value}>{testimonial.email}</Text></Text>
          <Text style={styles.detail}>Testimonial:</Text>
          <Text style={[styles.detail, styles.testimonial]}>{testimonial.message}</Text>
        </View>
      </ScrollView>
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
  card: {
    backgroundColor: 'rgba(213, 214, 252, 0.6)', // Adjust the opacity or color as needed
    borderRadius: 20,
    padding: 30,
    margin: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#514bb5',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontWeight: 'bold',
  },
  testimonial: {
    marginTop: 10,
  },
});

export default TestimonialDetails;