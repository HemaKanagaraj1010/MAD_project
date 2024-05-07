import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export default function ChatScreen({ route }) {
    const { userId, userName } = route.params;
    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const chatRoomId = generateChatRoomId(currentUser.uid, userId);
                const messagesSnapshot = await firestore()
                    .collection("messages")
                    .doc(chatRoomId)
                    .collection("messages")
                    .orderBy("createdAt")
                    .get();
                const messagesData = messagesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(messagesData);
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        if (currentUser) {
            fetchMessages();
        }
    }, [userId, currentUser]);

    const generateChatRoomId = (userId1, userId2) => {
        return [userId1, userId2].sort().join("_");
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return;

        try {
            const chatRoomId = generateChatRoomId(currentUser.uid, userId);
            const messageData = {
                text: newMessage.trim(),
                senderId: currentUser.uid,
                receiverId: userId,
                createdAt: firestore.FieldValue.serverTimestamp(),
            };
            // Add the new message to the Firestore collection
            await firestore()
                .collection("messages")
                .doc(chatRoomId)
                .collection("messages")
                .add(messageData);
            // Update the local state with the new message
            setMessages([...messages, messageData]); // Add the new message to the existing messages array
            setNewMessage(""); // Clear the input field after sending the message
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={item.senderId === currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
                            <Text style={styles.messageText}>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
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
}

const styles = StyleSheet.create({
    sentMessage: {
        backgroundColor: "#DCF8C6",
        alignSelf: "flex-end",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    receivedMessage: {
        backgroundColor: "#E8E8E8",
        alignSelf: "flex-start",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
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
        fontWeight: "bold",
    },
});

// import React, { useState, useEffect } from "react";
// import { View, Platform, KeyboardAvoidingView, Text } from "react-native";
// import { Bubble, GiftedChat } from "@react-native-gifted-chat";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { formatTimestamp } from "./utils/helpers";

// export default function ChatScreen() {
//     const [messages, setMessages] = useState([]);
//     const { userId, userName } = useRoute().params;
//     const currentUser = auth().currentUser;
//     const navigation = useNavigation();

//     useEffect(() => {
//         const chatId = [currentUser.uid, userId].sort().join("_");
//         const chatReference = firestore().collection("chats").doc(chatId);
//         const unsubscribe = chatReference.onSnapshot((snapshot) => {
//             if (snapshot.exists) {
//                 const chatData = snapshot.data();
//                 setMessages(chatData.messages);
//             }
//         });
//         return () => unsubscribe();
//     }, [userId, currentUser.uid]);

//     const onSend = async (newMessages = []) => {
//         const chatId = [currentUser.uid, userId].sort().join("_");
//         const chatReference = firestore().collection("chats").doc(chatId);

//         const formattedMessages = newMessages.map((message) => ({
//             ...message,
//             createdAt: new Date(message.createdAt),
//         }));

//         try {
//             await chatReference.set(
//                 {
//                     messages: GiftedChat.append(messages, formattedMessages),
//                 },
//                 { merge: true }
//             );
//         } catch (error) {
//             console.log("Error updating messages: ", error);
//         }
//     };

//     const renderBubble = (props) => {
//         const { currentMessage } = props;
//         const isReceived = currentMessage.user._id !== currentUser.uid;
//         return (
//             <Bubble
//                 {...props}
//                 wrapperStyle={{
//                     right: {
//                         backgroundColor: "#4CAF50",
//                     },
//                     left: {
//                         backgroundColor: "#2196F3",
//                         marginLeft: isReceived ? 0 : 10,
//                     },
//                 }}
//                 containerStyle={{
//                     left: {
//                         marginLeft: isReceived ? -40 : 0,
//                     },
//                 }}
//             />
//         );
//     };

//     const renderChatFooter = () => {
//         return <View style={{ height: 20 }} />;
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000" }}>
//             <GiftedChat
//                 messages={messages}
//                 onSend={(newMessages) => onSend(newMessages)}
//                 user={{ _id: currentUser.uid, name: currentUser.displayName }}
//                 renderTime={(props) => (
//                     <View style={props.containerStyle}>
//                         <Text
//                             style={{
//                                 marginHorizontal: 10,
//                                 marginBottom: 5,
//                                 fontSize: 10,
//                                 color: props.position === "left" ? "black" : "white",
//                             }}
//                         >
//                             {`${props.currentMessage.createdAt instanceof Date
//                                 ? props.currentMessage.createdAt.toLocaleString("en-US", {
//                                     hour: "numeric",
//                                     minute: "numeric",
//                                     hour12: true,
//                                 })
//                                 : formatTimestamp(props.currentMessage.createdAt)
//                             }`}
//                         </Text>
//                     </View>
//                 )}
//                 renderDay={() => null}
//                 renderBubble={renderBubble}
//                 renderChatFooter={renderChatFooter}
//                 placeholder="Type a message..."
//                 textInputStyle={{ color: "white" }}
//                 renderUsernameOnMessage
//                 containerStyle={{
//                     backgroundColor: "#000",
//                     padding: 5,
//                     height: "100%",
//                     multiline: true,
//                 }}
//             />
//             {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
//         </View>
//     );
// }







// import React, { useState, useEffect } from "react";
// import { View, Platform, KeyboardAvoidingView, Text } from "react-native";
// import { Bubble, GiftedChat } from "@react-native-gifted-chat";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firestore/auth";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { formatTimestamp } from "./utils/helpers";
// import { LinearGradient } from "expo-linear-gradient";

// export default function ChatScreen() {
//     const [messages, setMessages] = useState([]);
//     const { userId, userName } = useRoute().params;
//     const currentUser = auth().currentUser;
//     const navigation = useNavigation();

//     useEffect(() => {
//         const chatId = [currentUser.uid, userId].sort().join("_");
//         const chatReference = firestore().collection("chats").doc(chatId);
//         const unsubscribe = chatReference.onSnapshot((snapshot) => {
//             if (snapshot.exists) {
//                 const chatData = snapshot.data();
//                 setMessages(chatData.messages);
//             }
//         });
//         return () => unsubscribe();
//     }, [userId, currentUser.uid]);

//     const onSend = async (newMessages = []) => {
//         const chatId = [currentUser.uid, userId].sort().join("_");
//         const chatReference = firestore().collection("chats").doc(chatId);

//         const formattedMessages = newMessages.map((message) => ({
//             ...message,
//             createdAt: new Date(message.createdAt),
//         }));

//         try {
//             await chatReference.set(
//                 {
//                     messages: GiftedChat.append(messages, formattedMessages),
//                 },
//                 { merge: true }
//             );
//         } catch (error) {
//             console.log("Error updating messages: ", error);
//         }
//     };

//     const renderBubble = (props) => {
//         const { currentMessage } = props;
//         const isReceived = currentMessage.user._id !== currentUser.uid;
//         return (
//             <Bubble
//                 {...props}
//                 wrapperStyle={{
//                     right: {
//                         backgroundColor: "#4CAF50",
//                     },
//                     left: {
//                         backgroundColor: "#2196F3",
//                         marginLeft: isReceived ? 0 : 10,
//                     },
//                 }}
//                 containerStyle={{
//                     left: {
//                         marginLeft: isReceived ? -40 : 0,
//                     },
//                 }}
//             />
//         );
//     };

//     const renderChatFooter = () => {
//         return <View style={{ height: 20 }} />;
//     };

//     return (
//         <LinearGradient colors={["#000", "#FFF"]} style={{ flex: 1 }}>
//             <GiftedChat
//                 messages={messages}
//                 onSend={(newMessages) => onSend(newMessages)} // Fixed syntax error here
//                 user={{ _id: currentUser.uid, name: currentUser.displayName }}
//                 renderTime={(props) => (
//                     <View style={props.containerStyle}>
//                         <Text
//                             style={{
//                                 marginHorizontal: 10,
//                                 marginBottom: 5,
//                                 fontSize: 10,
//                                 color: props.position === "left" ? "black" : "white",
//                             }}
//                         >
//                             {`${props.currentMessage.createdAt instanceof Date
//                                 ? props.currentMessage.createdAt.toLocaleString("en-US", {
//                                     hour: "numeric",
//                                     minute: "numeric",
//                                     hour12: true,
//                                 })
//                                 : formatTimestamp(props.currentMessage.createdAt)
//                                 }`}
//                         </Text>
//                     </View>
//                 )}
//                 renderDay={() => null}
//                 renderBubble={renderBubble}
//                 renderChatFooter={renderChatFooter}
//                 placeholder="Type a message..."
//                 textInputStyle={{ color: "white" }}
//                 renderUsernameOnMessage6
//                 containerStyle={{
//                     backgroundColor: "black",
//                     padding: 5,
//                     height: 70,
//                     multiline: true,
//                 }}
//             />
//             {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
//         </LinearGradient>
//     );
// }




// import React,{useState,useEffect} from "react";
// import { View, Platform, KeyboardAvoidingView } from "react-native";
// import {
//     Bubble,
//     GiftedChat,
// } from "@react-native-gifted-chat";
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firestore/auth";
// import {useNavigation,useRoute} from "@react-navigation/native";
// import { formatTimestamp } from "./utils/helpers";
// import {LinearGradient} from "expo-linear-gradient";
// export default function ChatScreen(){
//     const [messages,setMessages]=useState([]);
//     const {userId,userName}=useRoute().params;
//     const currentUser=auth().currentUser;
//     const navigation=useNavigation();
//     useEffect(()=>{
//         const chatId=[currentUser.uid,userId].sort().join("_");
//         const chatReference=firestore().collection("chats").doc(chatId);
//         const unsubscribe=chatReference.onSnapshot((snapshot)=>{
//             if(snapshot.exists){
//                 const chatData=snapshot.data();
//                 setMessages(chatData.messages);
//             }
//         });
//         return()=>unsubscribe();

//     },[userId,currentUser.uid]);
//     const onSend=async (newMessages=[])=>{
//         const chatId=[currentUser.uid,userId].sort().join("_");
//         const chatReference = firestore().collection("chats").doc(chatId);
        


//         const formattedMessages=newMessages.map((message)=>({
//             ...message,
//             createdAt: new Date(message.createdAt),
//         }));

//         try{
//             await chatReference.set(
//                 {
//                     messages: GiftedChat.append(messages,formattedMessages),
//                 },
//                 {merge:true}
//             )
//         }catch(error){
//             console.log("Error updating messages: ",error);
//         }
//     };
//     const renderBubble=(props)=>{
//         const {currentMessage}=props;
//         const isReceived = currentMessage.user._id !==currentUser.uid;
//         return (
//             <Bubble{...props}
//             wrapperStyle={{
//                 right:{
//                     backgroundColor:"#4CAF50",

//                 },
//                 left:{
//                     backgroundColor:"#2196F3",
//                     marginLeft: isReceived ? 0:10,
//                 },
//              }}
//              containerStyle={{
//                 left:{
//                     marginLeft: isReceived? -40 : 0,
//                 },

//              }}
//              />
//         );
//     };
//     const renderChatFooter=()=>{
//         return <View style={{height:20}}/>;
//     }
//     return (
//         <LinearGradient colors={["#000","#FFF"]} style={{flex:1}}>
//             <GiftedChat
//             messages={messages}
//             onSend={{newMessages}=>onSend(newMessages)}
//             user={{_id:currentUser.uid,name:currentUser.displayName}}
//             renderTime={(props)=>(
//                 <View style={props.containerStyle}>
//                     <Text
//                     style={{
//                         marginHorizontail:10,
//                         marginBottom:5,
//                         fontSize:10,
//                         color:props.position==="left"?"black":"white",

//                     }}
//                     >
//                         {`${
//                             props.currentMessage.createdAt instanceof Date
//                             ? props.currentMessage.createdAt.toLocaleString("en-US",{
//                                 hour:"numeric",
//                                 minute:"numeric",
//                                 hour12:true,
//                             })
//                             :formatTimestamp(props.currentMessage.createdAt)
//                         }`}
//                     </Text>
//                 </View>
//             )}
//             renderDay={()=>null}
//             renderBubble={renderBubble}
//             renderChatFooter={renderChatFooter}
//             placeholder="Type a message..."
//             textInputStyle={{color:"white"}}
//             renderUsernameOnMessage6
//             containerStyle={{
//                 backgroudColor:"black",
//                 padding:5,
//                 height:70,
//                 multiline:true,
//             }}
//             />
//             {Platform.OS==="android" && <KeyboardAvoidingView behavior="padding"/>}
//                     </LinearGradient>
//     );