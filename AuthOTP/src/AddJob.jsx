// import React, { useState } from 'react';
// import { View, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
// import { TextInput, Text, Button } from 'react-native-paper';
// import { MaterialIcons } from '@expo/vector-icons';
// import firestore from '@react-native-firebase/firestore'; // Import firestore
// import auth from '@react-native-firebase/auth'; // Import auth

// const AddJob = () => {
//   const [companyName, setCompanyName] = useState('');
//   const [jobTitle, setJobTitle] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [eligibility, setEligibility] = useState('');
//   const [positionType, setPositionType] = useState('');
//   const [requiredSkills, setRequiredSkills] = useState('');
//   const [applicationDeadline, setApplicationDeadline] = useState('');

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async () => {
//     setSubmitted(true);
//     if (!validateForm()) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }
    
//     try {
//       const userID = auth().currentUser.uid; // Retrieve the user ID
//       await firestore().collection('jobs').add({
//         userID, // Associate the user ID with the job details
//         companyName,
//         jobTitle,
//         jobDescription,
//         eligibility,
//         positionType,
//         requiredSkills,
//         applicationDeadline
//       });
      
//       console.log('Job posted successfully!');
//       Alert.alert('Success', 'Job posted successfully!');
      
//       // Clear form fields after successful submission
//       setCompanyName('');
//       setJobTitle('');
//       setJobDescription('');
//       setEligibility('');
//       setPositionType('');
//       setRequiredSkills('');
//       setApplicationDeadline('');
      
//     } catch (error) {
//       console.error('Error posting job:', error);
//       Alert.alert('Error', 'Failed to post job. Please try again later.');
//     }
//   };

//   const validateForm = () => {
//     return (
//       companyName.trim() !== '' &&
//       jobTitle.trim() !== '' &&
//       jobDescription.trim() !== '' &&
//       eligibility.trim() !== '' &&
//       positionType.trim() !== '' &&
//       requiredSkills.trim() !== '' &&
//       applicationDeadline.trim() !== ''
//     );
//   };

//   const renderError = (field) => {
//     if (submitted && field.trim() === '') {
//       return 'This field is required';
//     }
//     return null;
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/job.jpg')}
//       style={styles.backgroundImage}
//     >
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.container}>
//           <Text style={styles.title}>Post Job</Text>
//           <TextInput
//             label="Company Name"
//             value={companyName}
//             onChangeText={text => setCompanyName(text)}
//             style={styles.input}
//             error={renderError(companyName)}
//           />
//           <TextInput
//             label="Job Title"
//             value={jobTitle}
//             onChangeText={text => setJobTitle(text)}
//             style={styles.input}
//             error={renderError(jobTitle)}
//           />
//           <TextInput
//             label="Job Description"
//             value={jobDescription}
//             onChangeText={text => setJobDescription(text)}
//             style={styles.input}
//             multiline={true}
//             numberOfLines={4}
//             error={renderError(jobDescription)}
//           />
//           <TextInput
//             label="Eligibility"
//             value={eligibility}
//             onChangeText={text => setEligibility(text)}
//             style={styles.input}
//             error={renderError(eligibility)}
//           />
//           <TextInput
//             label="Position Type"
//             value={positionType}
//             onChangeText={text => setPositionType(text)}
//             style={styles.input}
//             error={renderError(positionType)}
//           />
//           <TextInput
//             label="Required Skills"
//             value={requiredSkills}
//             onChangeText={text => setRequiredSkills(text)}
//             style={styles.input}
//             error={renderError(requiredSkills)}
//           />
//           <TextInput
//             label="Application Deadline"
//             value={applicationDeadline}
//             onChangeText={text => setApplicationDeadline(text)}
//             style={styles.input}
//             error={renderError(applicationDeadline)}
//           />
//           <Button 
//             mode="contained" 
//             onPress={handleSubmit} 
//             style={styles.button}
//             labelStyle={{ color: 'white' }} 
//             rippleColor="rgba(255, 255, 255, 0.5)">
//             Post
//           </Button>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginTop:50,

//     color: '#000085',
//   },
//   input: {
//     marginBottom: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#4687db',
//   },
// });

// export default AddJob;




import React, { useState } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore'; // Import firestore
import auth from '@react-native-firebase/auth'; // Import auth

const AddJob = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [positionType, setPositionType] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!validateForm()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    
    try {
      const userID = auth().currentUser.uid; // Retrieve the user ID
      await firestore().collection('jobs').add({
        userID, // Associate the user ID with the job details
        companyName,
        jobTitle,
        jobDescription,
        eligibility,
        positionType,
        requiredSkills,
        applicationDeadline
      });
      
      console.log('Job posted successfully!');
      Alert.alert('Success', 'Job posted successfully!');
      
      // Clear form fields after successful submission
      setCompanyName('');
      setJobTitle('');
      setJobDescription('');
      setEligibility('');
      setPositionType('');
      setRequiredSkills('');
      setApplicationDeadline('');
      
    } catch (error) {
      console.error('Error posting job:', error);
      Alert.alert('Error', 'Failed to post job. Please try again later.');
    }
  };

  const validateForm = () => {
    return (
      companyName.trim() !== '' &&
      jobTitle.trim() !== '' &&
      jobDescription.trim() !== '' &&
      eligibility.trim() !== '' &&
      positionType.trim() !== '' &&
      requiredSkills.trim() !== '' &&
      applicationDeadline.trim() !== ''
    );
  };

  const renderError = (field) => {
    if (submitted && field.trim() === '') {
      return 'This field is required';
    }
    return null;
  };

  return (
    <ImageBackground
      source={require('../assets/job.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Post Job</Text>
          <TextInput
            label="Company Name"
            value={companyName}
            onChangeText={text => setCompanyName(text)}
            style={styles.input}
            error={renderError(companyName)}
          />
          <TextInput
            label="Job Title"
            value={jobTitle}
            onChangeText={text => setJobTitle(text)}
            style={styles.input}
            error={renderError(jobTitle)}
          />
          <TextInput
            label="Job Description"
            value={jobDescription}
            onChangeText={text => setJobDescription(text)}
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            error={renderError(jobDescription)}
          />
          <TextInput
            label="Eligibility"
            value={eligibility}
            onChangeText={text => setEligibility(text)}
            style={styles.input}
            error={renderError(eligibility)}
          />
          <TextInput
            label="Position Type"
            value={positionType}
            onChangeText={text => setPositionType(text)}
            style={styles.input}
            error={renderError(positionType)}
          />
          <TextInput
            label="Required Skills"
            value={requiredSkills}
            onChangeText={text => setRequiredSkills(text)}
            style={styles.input}
            error={renderError(requiredSkills)}
          />
          <TextInput
            label="Application Deadline"
            value={applicationDeadline}
            onChangeText={text => setApplicationDeadline(text)}
            style={styles.input}
            error={renderError(applicationDeadline)}
          />
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            style={styles.button}
            labelStyle={{ color: 'white' }} 
            rippleColor="rgba(255, 255, 255, 0.5)">
            Post
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:50,

    color: '#000085',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4687db',
  },
});

export default AddJob;
