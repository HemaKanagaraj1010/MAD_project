import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobSnapshot = await firestore().collection('jobs').get();
        const fetchedJobs = await Promise.all(jobSnapshot.docs.map(async (doc) => {
          const jobData = doc.data();
          const userData = await firestore().collection('users').doc(jobData.userID).get();
          const userDataExists = userData.exists;
          const userDataObject = userData.data();
          return {
            id: doc.id,
            ...jobData,
            postedBy: userDataExists ? userDataObject.name : "Unknown", // Default to "Unknown" if user data not found
            registerNumber: userDataExists ? userDataObject.registerNumber : "N/A" // Default to "N/A" if register number not found
          };
        }));
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        Alert.alert('Error', 'Failed to fetch jobs. Please try again later.');
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleDescription = (job) => {
    navigation.navigate('JobDescription', { job });
  };

  const filteredJobs = jobs.filter(job => {
    const { companyName, jobTitle, positionType, requiredSkills } = job;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      companyName.toLowerCase().includes(lowerCaseQuery) ||
      jobTitle.toLowerCase().includes(lowerCaseQuery) ||
      positionType.toLowerCase().includes(lowerCaseQuery) ||
      requiredSkills.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
       <View style={styles.jobTag}>
      <Text style={styles.jobTagText}>{item.positionType}</Text>
    </View>
    <Card.Content>
      <Title>{item.jobTitle}</Title>
      <Paragraph style={styles.boldText}>{item.companyName}</Paragraph>
      <Paragraph style={styles.boldText}>Eligibility: <Text style={styles.regularText}>{item.eligibility}</Text></Paragraph>
      <Paragraph style={styles.boldText}>Position Type: <Text style={styles.regularText}>{item.positionType}</Text></Paragraph>
      <Paragraph style={styles.boldText}>Required Skills: <Text style={styles.regularText}>{item.requiredSkills}</Text></Paragraph>
      <Paragraph style={styles.boldText}>Application Deadline: <Text style={styles.regularText}>{item.applicationDeadline}</Text></Paragraph>
      <Paragraph style={styles.smallText}>Posted By: {item.postedBy} ({item.registerNumber})</Paragraph>
      <TouchableOpacity onPress={() => handleDescription(item)} style={styles.descriptionButton}>
        <Text style={styles.descriptionButtonText}>View More</Text>
      </TouchableOpacity>
    </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search job..."
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor:"#d5d6fc"
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#514bb5',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor:'#fff'
  },
  descriptionButton: {
    backgroundColor: '#514bb5',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  descriptionButtonText: {
    color: '#FFF',
  },
  jobTag: {
   position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  jobTagText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  regularText: {
    fontWeight: 'normal',
  },
  smallText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default Explore;
