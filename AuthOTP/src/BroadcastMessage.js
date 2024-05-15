import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const BroadcastMessage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userDocument = await firestore()
            .collection("users")
            .doc(currentUser.uid)
            .get();
          const userData = userDocument.data();
          console.log("User Data:", userData); // Log user data to check if it contains the expected fields
          if (userData) {
            setUserName(userData.name || "");
            setRegisterNumber(userData.registerNumber || "");
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await firestore()
          .collection("broadcast_messages")
          .orderBy("createdAt", "desc") // Order messages by createdAt in descending order
          .get();
        const fetchedMessages = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(fetchedMessages);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (currentUser) {
      fetchUserData();
      fetchMessages(); // Call fetchMessages
    }
  }, [currentUser]);

  const getUsernameColor = (userId) => {
    // Generate a color based on the user ID
    const hash = userId.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360; // Generate hue value between 0 and 360
    return `hsl(${hue}, 50%, 70%)`; // Set saturation and lightness to fixed values
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const messageData = {
        text: newMessage.trim(),
        senderId: currentUser.uid,
        senderName: userName,
        senderRegisterNumber: registerNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore()
        .collection("broadcast_messages")
        .add(messageData);
      setNewMessage("");
      console.log("Message sent successfully!");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, { backgroundColor: getUsernameColor(item.senderId) }, currentUser.uid === item.senderId ? styles.senderMessage : styles.receiverMessage]}>
            <Text style={styles.username}>{item.senderName} ({item.senderRegisterNumber})</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{new Date(item.createdAt.seconds * 1000).toLocaleString()}</Text>
          </View>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
    alignSelf: "flex-end",
  },
  senderMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  receiverMessage: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  username: {
    fontWeight: 'bold',
    color: "#fff",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    color: "#007BFF",
    fontWeight: "bold"
  },
});

export default BroadcastMessage;
