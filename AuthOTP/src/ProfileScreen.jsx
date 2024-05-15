import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import firestore
import auth from '@react-native-firebase/auth'; // Import auth

export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userID = auth().currentUser.uid; // Retrieve the user ID
                const userRef = firestore().collection('users').doc(userID);
                const doc = await userRef.get();
                if (doc.exists) {
                    const userDataFromFirestore = doc.data();
                    setUserData(userDataFromFirestore);
                    setEditedData(userDataFromFirestore);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditSave = () => {
        if (isEditing) {
            // Save changes
            firestore().collection('users').doc(auth().currentUser.uid).update(editedData)
                .then(() => {
                    setUserData(editedData);
                    setIsEditing(false);
                })
                .catch(error => console.error('Error updating user data:', error));
        } else {
            // Enter edit mode
            setEditedData(userData);
            setIsEditing(true);
        }
    };

    const handleChange = (field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const avatarImageSource = () => {
        if (userData && userData.gender === 'male') {
            return require('../assets/male_avatar.png');
        } else if (userData && userData.gender === 'female') {
            return require('../assets/female_avatar.png');
        } else {
            // Default avatar if gender is not specified or invalid
            return require('../assets/other_avatar.jpg');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userData && (
                <>
                    <View style={styles.profileHeader}>
                        <Image source={avatarImageSource()} style={styles.avatarImage} />
                        <Text style={styles.profileName}>{userData.name}</Text>
                        <Text style={styles.profileSubtext}>{userData.role === 'alumni' ? 'Alumni' : 'Student'}</Text>
                    </View>
                        
                    <View style={styles.profileDetails}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Register Number:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Register Number"
                                value={isEditing ? editedData.registerNumber : userData.registerNumber}
                                onChangeText={value => handleChange('registerNumber', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Batch:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Batch"
                                value={isEditing ? editedData.batch : userData.batch}
                                onChangeText={value => handleChange('batch', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Gender:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Gender"
                                value={isEditing ? editedData.gender : userData.gender}
                                onChangeText={value => handleChange('gender', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={isEditing ? editedData.email : userData.email}
                                onChangeText={value => handleChange('email', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Date of Birth:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Date of Birth"
                                value={isEditing ? editedData.dob : userData.dob}
                                onChangeText={value => handleChange('dob', value)}
                                editable={isEditing}
                            />
                        </View>
                       
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Major/Field of Study:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Major/Field of Study"
                                value={isEditing ? editedData.major : userData.major}
                                onChangeText={value => handleChange('major', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Graduation Year:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Graduation Year"
                                value={isEditing ? editedData.graduationYear : userData.graduationYear}
                                onChangeText={value => handleChange('graduationYear', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Alumni Association:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Alumni Association"
                                value={isEditing ? editedData.alumniAssociation : userData.alumniAssociation}
                                onChangeText={value => handleChange('alumniAssociation', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Job Title:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Current Job Title"
                                value={isEditing ? editedData.jobTitle : userData.jobTitle}
                                onChangeText={value => handleChange('jobTitle', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Company/Organization:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Current Company/Organization"
                                value={isEditing ? editedData.companyName : userData.companyName}
                                onChangeText={value => handleChange('companyName', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Location:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Location"
                                value={isEditing ? editedData.location : userData.location}
                                onChangeText={value => handleChange('location', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Contact Information:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contact Information"
                                value={isEditing ? editedData.contactInfo : userData.contactInfo}
                                onChangeText={value => handleChange('contactInfo', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Skills/Expertise:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Skills/Expertise"
                                value={isEditing ? editedData.skills : userData.skills}
                                onChangeText={value => handleChange('skills', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Interests/Hobbies:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Interests/Hobbies"
                                value={isEditing ? editedData.interests : userData.interests}
                                onChangeText={value => handleChange('interests', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Professional Experience:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Professional Experience"
                                value={isEditing ? editedData.professionalExperience : userData.professionalExperience}
                                onChangeText={value => handleChange('professionalExperience', value)}
                                editable={isEditing}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Projects/Accomplishments:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Projects/Accomplishments"
                                value={isEditing ? editedData.projects : userData.projects}
                                onChangeText={value => handleChange('projects', value)}
                                editable={isEditing}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditSave}>
                        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#AD88C6', // Set background color for the page
        padding: 30, // Add padding for better spacing
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    profileSubtext: {
        fontSize: 16,
        color: '#666',
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        marginTop: 15,
    },
    profileDetails: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10, // Add border radius for a card-like appearance
        marginBottom: 20, // Add margin bottom for spacing
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333', // Set label color
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: '#333',
        backgroundColor: '#F0F3FF', // Set input background color
    },
    editButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});











// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import firestore from '@react-native-firebase/firestore'; // Import firestore
// import auth from '@react-native-firebase/auth'; // Import auth

// export default function ProfileScreen() {
//     const [userData, setUserData] = useState(null);
//     const [editing, setEditing] = useState(false);
//     const [editedData, setEditedData] = useState({
//         name: '',
//         batch: '',
//         dob: '',
//         email: '',
//         gender: '',
//         registerNumber: ''
//     });

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userID = auth().currentUser.uid; // Retrieve the user ID
//                 const userRef = firestore().collection('users').doc(userID);
//                 const doc = await userRef.get();
//                 if (doc.exists) {
//                     setUserData(doc.data());
//                     setEditedData(doc.data());
//                 } else {
//                     console.log('No such document!');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleEdit = () => {
//         setEditing(true);
//     };

//     const handleSave = async () => {
//         try {
//             const userID = auth().currentUser.uid; // Retrieve the user ID
//             await firestore().collection('users').doc(userID).update(editedData);
//             setUserData(editedData);
//             setEditing(false);
//         } catch (error) {
//             console.error('Error updating user data:', error);
//         }
//     };

//     const handleChange = (field, value) => {
//         setEditedData(prevData => ({
//             ...prevData,
//             [field]: value
//         }));
//     };

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {userData ? (
//                 <>
//                     <Text>User ID: {auth().currentUser.uid}</Text>
//                     {editing ? (
//                         <>
//                             <TextInput
//                                 placeholder="Name"
//                                 value={editedData.name}
//                                 onChangeText={value => handleChange('name', value)}
//                             />
//                             <TextInput
//                                 placeholder="Batch"
//                                 value={editedData.batch}
//                                 onChangeText={value => handleChange('batch', value)}
//                             />
//                             <TextInput
//                                 placeholder="Date of Birth"
//                                 value={editedData.dob}
//                                 onChangeText={value => handleChange('dob', value)}
//                             />
//                             <TextInput
//                                 placeholder="Email"
//                                 value={editedData.email}
//                                 onChangeText={value => handleChange('email', value)}
//                             />
//                             <TextInput
//                                 placeholder="Gender"
//                                 value={editedData.gender}
//                                 onChangeText={value => handleChange('gender', value)}
//                             />
//                             <TextInput
//                                 placeholder="Register Number"
//                                 value={editedData.registerNumber}
//                                 onChangeText={value => handleChange('registerNumber', value)}
//                             />
//                             <Button title="Save" onPress={handleSave} />
//                         </>
//                     ) : (
//                         <>
//                             <Text>Name: {userData.name}</Text>
//                             <Text>Batch: {userData.batch}</Text>
//                             <Text>Date of Birth: {userData.dob}</Text>
//                             <Text>Email: {userData.email}</Text>
//                             <Text>Gender: {userData.gender}</Text>
//                             <Text>Register Number: {userData.registerNumber}</Text>
//                             <Button title="Edit" onPress={handleEdit} />
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <Text>Loading...</Text>
//             )}
//         </View>
//     );
// }

