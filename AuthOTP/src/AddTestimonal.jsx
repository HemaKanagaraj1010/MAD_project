import React, { useState } from 'react';
import { View, Button, TextInput, Alert, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import backgroundImage from './images/addtest.jpg';

const AddTestimonial = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [linkedin, setLinkedin] = useState(''); // New state for LinkedIn account
  const [rollNo, setRollNo] = useState(''); // New state for roll number
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      if (!name || !email || !graduationYear || !designation || !company || !linkedin || !rollNo || !message) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      await firestore().collection('testimonials').add({
        name,
        email,
        graduationYear,
        designation,
        company,
        linkedin,
        rollNo,
        message,
        timestamp: firestore.FieldValue.serverTimestamp()
      });
      Alert.alert('Success', 'Testimonial submitted successfully!');
      clearForm();
    } catch (error) {
      console.error('Error submitting testimonial: ', error);
      Alert.alert('Error', 'Failed to submit testimonial. Please try again later.');
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setGraduationYear('');
    setDesignation('');
    setCompany('');
    setLinkedin('');
    setRollNo('');
    setMessage('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Your Name *"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Year of Graduation *"
          value={graduationYear}
          onChangeText={setGraduationYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Your Designation *"
          value={designation}
          onChangeText={setDesignation}
        />
          <TextInput
          style={styles.input}
          placeholder="Your Roll Number *"
          value={rollNo}
          onChangeText={setRollNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Company *"
          value={company}
          onChangeText={setCompany}
        />
        <TextInput
          style={styles.input}
          placeholder="Your LinkedIn Account *"
          value={linkedin}
          onChangeText={setLinkedin}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Testimonial *"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    paddingTop: 250, // Move the form down
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: '#5DADE2',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(215, 228, 241, 0.7)', // Semi-transparent white background
    color: '#333', // Change text color
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddTestimonial;


// import React, { useState } from 'react';
// import { View, Button, Image, Alert } from 'react-native';
// import * as firebase from 'firebase';
// import 'firebase/storage';
// import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase/firestore
// import ImagePicker from 'react-native-image-picker';

// const AddTestimonial = () => {
//   const [image, setImage] = useState(null);

//   const uploadImage = async () => {
//     try {
//       if (!image) {
//         Alert.alert('No Image Selected', 'Please select an image first.');
//         return;
//       }

//       const response = await fetch(image.uri);
//       const blob = await response.blob();
//       const imageName = new Date().getTime() + "_" + image.uri.split('/').pop();
// //please en error vantae irukrraaa...epdiyacchu work aagu error varaamaaa pls pls pls 
//       // Specify the folder name 'demoimage'
//       const storageRef = firebase.storage().ref().child('demoimage/' + imageName);
//       const uploadTask = storageRef.put(blob);

//       uploadTask.on('state_changed', 
//         (snapshot) => {
//           // Progress tracking
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('Upload is ' + progress + '% done');
//         },
//         (error) => {
//           // Handle unsuccessful upload
//           console.error('Error uploading image:', error);
//           Alert.alert('Error', 'Failed to upload image. Please try again later.');
//         },
//         () => {
//           // Handle successful upload
//           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//             console.log('File available at', downloadURL);
//             saveImageUrlToFirestore(downloadURL);
//           });
//         }
//       );
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       Alert.alert('Error', 'Failed to upload image. Please try again later.');
//     }
//   };

//   const saveImageUrlToFirestore = async (imageUrl) => {
//     try {
//       const db = firebase.firestore();
//       await db.collection('images').add({
//         imageUrl: imageUrl,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp()
//       });

//       Alert.alert('Image Uploaded!', 'Image successfully uploaded to Firebase Storage.');
//     } catch (error) {
//       console.error('Error saving image URL to Firestore:', error);
//       Alert.alert('Error', 'Failed to save image URL to Firestore. Please try again later.');
//     }
//   };

//   const selectImage = () => {
//     const options = {
//       title: 'Select Image',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         const source = { uri: response.uri };
//         setImage(source);
//       }
//     });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
//       <Button title="Select Image" onPress={selectImage} />
//       <Button title="Upload Image" onPress={uploadImage} />
//     </View>
//   );
// };

// export default AddTestimonial;
