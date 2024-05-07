import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper'; // Import Card component

const JobDescription = ({ route }) => {
  const { job } = route.params;

  return (
    <ImageBackground source={require('./images/2.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{job.jobTitle}</Text>
            <Text style={styles.company}>{job.companyName}</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Eligibility:</Text>
                <Text style={styles.info}>{job.eligibility}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Position Type:</Text>
                <Text style={styles.info}>{job.positionType}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Required Skills:</Text>
                <Text style={styles.info}>{job.requiredSkills}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.info}>{job.jobDescription}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Application Deadline:</Text>
                <Text style={styles.info}>{job.applicationDeadline}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    borderRadius: 20,
    elevation: 3,
    marginTop:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    color: '#333', // Dark font color
  },
  company: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    color: '#333', // Dark font color
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    color: '#333', // Dark font color
  },
});

export default JobDescription;
