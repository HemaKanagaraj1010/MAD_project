import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function ChatApplication() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState("");
    const [messageCounts, setMessageCounts] = useState({});
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const currentUser = auth().currentUser;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await firestore().collection("users").get();
                const usersData = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Fetch message counts for each user and sort them
                await fetchMessageCounts(usersData);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        const fetchUserName = async () => {
            try {
                if (currentUser) {
                    const userDocument = await firestore()
                        .collection("users")
                        .doc(currentUser.uid)
                        .get();
                    setUserName(userDocument.data()?.name || "");
                }
            } catch (error) {
                console.log("Error fetching user's name: ", error);
            }
        };

        if (isFocused) {
            fetchUsers();
            fetchUserName();
        }
    }, [isFocused, currentUser]);

    const fetchMessageCounts = async (usersData) => {
        try {
            const counts = {};
            for (const user of usersData) {
                const messagesSnapshot = await firestore()
                    .collection("messages")
                    .where("receiverId", "==", user.id)
                    .orderBy("timestamp", "desc")
                    .limit(1)
                    .get();
                const message = messagesSnapshot.docs[0]?.data();
                if (message) {
                    const lastSeen = message.lastSeen || 0;
                    const unreadMessages = await firestore()
                        .collection("messages")
                        .where("receiverId", "==", user.id)
                        .where("timestamp", ">", lastSeen)
                        .get();
                    counts[user.id] = unreadMessages.size;
                } else {
                    counts[user.id] = 0;
                }
            }
            setMessageCounts(counts);

            // Sort users based on the time of the most recent message received
            const sortedUsers = usersData.sort((a, b) => {
                const lastMessageTimeA = counts[a.id] ? -Infinity : 0;
                const lastMessageTimeB = counts[b.id] ? -Infinity : 0;
                return lastMessageTimeB - lastMessageTimeA;
            });
            setUsers(sortedUsers);
        } catch (error) {
            console.log("Error fetching message counts:", error);
        }
    };

    const navigateToChat = async (userId, userName) => {
        try {
            await firestore()
                .collection("messages")
                .where("receiverId", "==", currentUser.uid)
                .where("senderId", "==", userId)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.update({ lastSeen: Date.now() });
                    });
                });
            navigation.navigate("ChatScreen", {
                userId, // Pass the recipient's user ID
                userName, // Pass the recipient's user name
            });
        } catch (error) {
            console.log("Error updating last seen:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate("Login");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    const getMessageCount = (userId) => {
        return messageCounts[userId] || 0;
    };

    const broadcastMessage = async () => {
        try {
            navigation.navigate("BroadcastMessage");
        } catch (error) {
            console.log("Error navigating to BroadcastMessage:", error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
            <View style={{ flex: 1, backgroundColor: "#000", position: "absolute", top: 0, left: 0, right: 0, height: "20%", justifyContent: "center" }}>
                <Text style={{ fontSize: 32, fontWeight: "bold", margin: 10, color: "#fff" }}>Home</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 24, color: "#fff", margin: 10 }}>Welcome, {userName}!</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={{ fontSize: 24, color: "#43A047", margin: 10, fontWeight: "bold" }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.gradientBackground}>
                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        const messageCount = getMessageCount(item.id);
                        return (
                            <TouchableOpacity
                                onPress={() => navigateToChat(item.id, item.name)}
                                style={{ marginBottom: 5, borderRadius: 5, overflow: "hidden" }}
                            >
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                    {messageCount > 0 && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>{messageCount}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <TouchableOpacity
                    onPress={broadcastMessage}
                    style={styles.broadcastButton}
                >
                    <Text style={styles.broadcastButtonText}>Broadcast Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        backgroundColor: "#ADD8E6",
        padding: 5,
        borderTopRightRadius: 100,
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        bottom: 0,
    },
    itemContainer: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: "rgba(0,0,0,1)",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    badge: {
        backgroundColor: "red",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    badgeText: {
        color: "white",
        fontSize: 12,
    },
    broadcastButton: {
        backgroundColor: "#43A047",
        borderRadius: 30,
        padding: 15,
        margin: 20,
        alignItems: "center",
    },
    broadcastButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});




//backup
// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import { useNavigation, useIsFocused } from "@react-navigation/native";

// export default function ChatApplication() {
//     const [users, setUsers] = useState([]);
//     const [userName, setUserName] = useState("");
//     const navigation = useNavigation();
//     const isFocused = useIsFocused();
//     const currentUser = auth().currentUser;

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const usersSnapshot = await firestore().collection("users").get();
//                 const usersData = usersSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setUsers(usersData);
//             } catch (error) {
//                 console.log("Error fetching users:", error);
//             }
//         };

//         const fetchUserName = async () => {
//             try {
//                 if (currentUser) {
//                     const userDocument = await firestore()
//                         .collection("users")
//                         .doc(currentUser.uid)
//                         .get();
//                     setUserName(userDocument.data()?.name || "");
//                 }
//             } catch (error) {
//                 console.log("Error fetching user's name: ", error);
//             }
//         };

//         if (isFocused) {
//             fetchUsers();
//             fetchUserName();
//         }
//     }, [isFocused, currentUser]);

//     const navigateToChat = (userId, userName) => {
//         navigation.navigate("ChatScreen", {
//             userId, // Pass the recipient's user ID
//             userName, // Pass the recipient's user name
//         });
//     };

//     const handleLogout = async () => {
//         try {
//             await auth().signOut();
//             navigation.navigate("Login");
//         } catch (error) {
//             console.log("Error logging out:", error);
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
//             <View style={{ flex: 1, backgroundColor: "#000", position: "absolute", top: 0, left: 0, right: 0, height: "20%", justifyContent: "center" }}>
//                 <Text style={{ fontSize: 32, fontWeight: "bold", margin: 10, color: "#fff" }}>Home</Text>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                     <Text style={{ fontSize: 24, color: "#fff", margin: 10 }}>Welcome, {userName}!</Text>
//                     <TouchableOpacity onPress={handleLogout}>
//                         <Text style={{ fontSize: 24, color: "#43A047", margin: 10, fontWeight: "bold" }}>Logout</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={styles.gradientBackground}>
//                 <FlatList
//                     data={users}
//                     keyExtractor={item => item.id}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity
//                             onPress={() => navigateToChat(item.id, item.name)}
//                             style={{ marginBottom: 5, borderRadius: 5, overflow: "hidden" }}
//                         >
//                             <View style={styles.itemContainer}>
//                                 <Text style={styles.itemText}>{item.name}</Text>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     gradientBackground: {
//         flex: 1,
//         backgroundColor: "#ADD8E6",
//         padding: 5,
//         borderTopRightRadius: 100,
//         position: "absolute",
//         top: "20%",
//         left: 0,
//         right: 0,
//         bottom: 0,
//     },
//     itemContainer: {
//         padding: 15,
//         borderRadius: 30,
//         backgroundColor: "rgba(0,0,0,1)",
//     },
//     itemText: {
//         color: "white",
//         fontSize: 20,
//         fontWeight: "bold",
//     },
// });







// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import { useNavigation, useIsFocused } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function ChatApplication() {
//     const [users, setUsers] = useState([]);
//     const [userName, setUserName] = useState("");
//     const navigation = useNavigation();
//     const isFocused = useIsFocused();

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const usersSnapshot = await firestore().collection("users").get();
//                 const usersData = usersSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setUsers(usersData);
//             } catch (error) {
//                 console.log("Error fetching users:", error);
//             }
//         };

//         const fetchUserName = async () => {
//             try {
//                 const currentUser = auth().currentUser;
//                 if (currentUser) {
//                     const userDocument = await firestore()
//                         .collection("users")
//                         .doc(currentUser.uid)
//                         .get();
//                     setUserName(userDocument.data()?.name || "");
//                 }
//             } catch (error) {
//                 console.log("Error fetching user's name: ", error);
//             }
//         };

//         if (isFocused) {
//             fetchUsers();
//             fetchUserName();
//         }
//     }, [isFocused]);

//     const navigateToChat = (userId, userName) => {
//         navigation.navigate("ChatScreen", {
//             userId,
//             userName,
//         });
//     };

//     const handleLogout = async () => {
//         try {
//             await auth().signOut();
//             navigation.navigate("Login");
//         } catch (error) {
//             console.log("Error logging out:", error);
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
//             <View style={{ flex: 1, backgroundColor: "#000", position: "absolute", top: 0, left: 0, right: 0, height: "20%", justifyContent: "center" }}>
//                 <Text style={{ fontSize: 32, fontWeight: "bold", margin: 10, color: "#fff" }}>Home</Text>
//                 <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//                     <Text style={{ fontSize: 24, color: "#fff", margin: 10 }}>Welcome, {userName}!</Text>
//                     <TouchableOpacity onPress={handleLogout}>
//                         <Text style={{ fontSize: 24, color: "#43A047", margin: 10, fontWeight: "bold" }}>Logout</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={{ flex: 1, backgroundColor: "#ADD8E6", padding: 5, borderTopRightRadius: 100, position: "absolute", top: "20%", left: 0, right: 0, bottom: 0 }}>
//                 <FlatList
//                     data={users}
//                     keyExtractor={item => item.id}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity
//                             onPress={() => navigateToChat(item.id, item.name)}
//                             style={{ marginBottom: 5, borderRadius: 5, overflow: "hidden" }}
//                         >
//                             <LinearGradient
//                                 colors={["rgba(0,0,0,1)", "rgba(128,128,0)"]}
//                                 style={{ padding: 15, borderRadius: 30 }}
//                                 start={{ x: 0, y: 0 }}
//                                 end={{ x: 1, y: 0 }}
//                             >
//                                 <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
//                             </LinearGradient>
//                         </TouchableOpacity>
//                     )}
//                 />
//             </View>
//         </View>
//     );
// }
