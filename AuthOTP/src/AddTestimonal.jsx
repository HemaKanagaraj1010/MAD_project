// TestimonialForm.js

import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const TestimonialForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await firestore().collection('testimonials').add({
        name,
        email,
        message,
        timestamp: firestore.FieldValue.serverTimestamp()
      });
      Alert.alert('Success', 'Testimonial submitted successfully!');
      // Optionally, clear the form after submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting testimonial: ', error);
      Alert.alert('Error', 'Failed to submit testimonial. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Register Number"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top', // Ensure the message input expands vertically
  },
});

export default TestimonialForm;


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
