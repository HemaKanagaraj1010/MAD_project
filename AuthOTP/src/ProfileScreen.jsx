import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import firestore
import auth from '@react-native-firebase/auth'; // Import auth

export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        name: '',
        batch: '',
        dob: '',
        email: '',
        gender: '',
        registerNumber: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userID = auth().currentUser.uid; // Retrieve the user ID
                const userRef = firestore().collection('users').doc(userID);
                const doc = await userRef.get();
                if (doc.exists) {
                    setUserData(doc.data());
                    setEditedData(doc.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            const userID = auth().currentUser.uid; // Retrieve the user ID
            await firestore().collection('users').doc(userID).update(editedData);
            setUserData(editedData);
            setEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleChange = (field, value) => {
        setEditedData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    {editing ? (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name:"
                                    value={editedData.name}
                                    onChangeText={value => handleChange('name', value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Batch:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Batch"
                                    value={editedData.batch}
                                    onChangeText={value => handleChange('batch', value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Date of Birth:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Date of Birth"
                                    value={editedData.dob}
                                    onChangeText={value => handleChange('dob', value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={editedData.email}
                                    onChangeText={value => handleChange('email', value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Gender:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Gender"
                                    value={editedData.gender}
                                    onChangeText={value => handleChange('gender', value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Register Number:</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Register Number"
                                    value={editedData.registerNumber}
                                    onChangeText={value => handleChange('registerNumber', value)}
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Name: {userData.name}</Text>
                                <Text style={styles.label}>Batch: {userData.batch}</Text>
                                <Text style={styles.label}>Date of Birth: {userData.dob}</Text>
                                <Text style={styles.label}>Email: {userData.email}</Text>
                                <Text style={styles.label}>Gender: {userData.gender}</Text>
                                <Text style={styles.label}>Register Number: {userData.registerNumber}</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#514bb5"
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',

    },
    infoContainer: {
      
        marginBottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: '#fff',
        width: '100%',
    },
    button: {
        backgroundColor: '#ffc107',
        borderRadius: 26,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#ffc107',
        borderRadius: 26,
        padding: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    editButtonText: {
        color: '#000',
        fontSize: 20,
    },
    label: {
        color: '#fff',
        marginBottom: 5,
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

