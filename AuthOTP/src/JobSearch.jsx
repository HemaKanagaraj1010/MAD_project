import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([
    {
      id: 1,
      companyName: 'Example Company',
      jobTitle: 'Software Engineer',
      eligibility: 'Bachelor\'s Degree in Computer Science',
      positionType: 'Full-Time',
      applicationDeadline: 'April 30, 2024'
    },
    {
      id: 2,
      companyName: 'Another Company',
      jobTitle: 'Data Analyst',
      eligibility: 'Bachelor\'s Degree in Statistics or related field',
      positionType: 'Contract',
      applicationDeadline: 'May 15, 2024'
    },
    // Add more job objects as needed
  ]);

  const filteredJobs = jobs.filter(job =>
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderJobItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.jobTitle}</Text>
      <Text>Company: {item.companyName}</Text>
      <Text>Eligibility: {item.eligibility}</Text>
      <Text>Position Type: {item.positionType}</Text>
      <Text>Application Deadline: {item.applicationDeadline}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for jobs..."
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredJobs}
        renderItem={renderJobItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
