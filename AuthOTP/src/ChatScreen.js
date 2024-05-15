import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatScreen({ route }) {
    const { userId, userName } = route.params;
    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [editedMessageText, setEditedMessageText] = useState("");
    const [inputHeight, setInputHeight] = useState(40); // Initial height
    const flatListRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const chatRoomId = generateChatRoomId(currentUser.uid, userId);
                const messagesSnapshot = await firestore()
                    .collection("messages")
                    .doc(chatRoomId)
                    .collection("messages")
                    .orderBy("createdAt", "desc")
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

        const fetchUserData = async () => {
            try {
                const userDocument = await firestore().collection("users").doc(userId).get();
                const userData = userDocument.data();
                if (userData) {
                    setRegistrationNumber(userData.registerNumber);
                }
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };

        if (currentUser) {
            fetchMessages();
            fetchUserData();
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
            await firestore()
                .collection("messages")
                .doc(chatRoomId)
                .collection("messages")
                .add(messageData);
            setNewMessage("");
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp.toDate());
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const twelveHourFormatHours = hours % 12 || 12;
        return `${twelveHourFormatHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };

    const isSameDate = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const renderDateHeader = (date) => {
        return (
            <Text style={styles.dateHeader}>{date}</Text>
        );
    };

    const deleteMessage = async (messageId) => {
        try {
            const chatRoomId = generateChatRoomId(currentUser.uid, userId);
            await firestore()
                .collection("messages")
                .doc(chatRoomId)
                .collection("messages")
                .doc(messageId)
                .delete();
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.log("Error deleting message:", error);
        }
    };

    const editMessage = async (updatedMessageText) => {
        try {
            const chatRoomId = generateChatRoomId(currentUser.uid, userId);
            await firestore()
                .collection("messages")
                .doc(chatRoomId)
                .collection("messages")
                .doc(selectedMessage.id)
                .update({ text: updatedMessageText });
            setModalVisible(false);
            setSelectedMessage(null);
            setMessages(prevMessages => {
                return prevMessages.map(msg => {
                    if (msg.id === selectedMessage.id) {
                        return { ...msg, text: updatedMessageText };
                    }
                    return msg;
                });
            });
        } catch (error) {
            console.log("Error editing message:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{userName}</Text>
                <Text style={styles.registrationNumberText}>{registrationNumber}</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    const prevMessage = messages[index - 1];
                    const currentDate = item.createdAt.toDate();
                    const showDate = !prevMessage || !isSameDate(currentDate, prevMessage.createdAt.toDate());
                    const formattedDate = currentDate.toLocaleDateString();
                    const paddingHorizontal = 20 + (formattedDate.length - 1) * 5; // Adjust the padding based on the length of the date text

                    if (showDate) {
                        return (
                            <View>
                                {renderDateHeader(formattedDate)}
                                <TouchableOpacity
                                    onLongPress={() => {
                                        setSelectedMessage(item);
                                        setEditedMessageText(item.text);
                                        setModalVisible(true);
                                    }}
                                    style={item.senderId === currentUser.uid ? styles.sentMessage : styles.receivedMessage}
                                >
                                    <Text style={[styles.messageText, { color: item.senderId === currentUser.uid ? "#E2DFD0" : "#000" }]}>{item.text}</Text>
                                    <Text style={styles.messageTime}>{formatMessageTime(item.createdAt)}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                    return (
                        <TouchableOpacity
                            onLongPress={() => {
                                setSelectedMessage(item);
                                setEditedMessageText(item.text);
                                setModalVisible(true);
                            }}
                            style={item.senderId === currentUser.uid ? styles.sentMessage : styles.receivedMessage}
                        >
                            <Text style={[styles.messageText, { color: item.senderId === currentUser.uid ? "#E2DFD0" : "#000" }]}>{item.text}</Text>
                            <Text style={styles.messageTime}>{formatMessageTime(item.createdAt)}</Text>
                        </TouchableOpacity>
                    );
                }}
                inverted
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={[styles.input, { height: inputHeight }]}
                            multiline
                            value={editedMessageText}
                            onChangeText={text => setEditedMessageText(text)}
                            onContentSizeChange={(event) => {
                                setInputHeight(event.nativeEvent.contentSize.height);
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    editMessage(editedMessageText);
                                }}
                            >
                                <Text style={styles.textStyle}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    deleteMessage(selectedMessage.id);
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={text => setNewMessage(text)}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Icon name="send" size={25} color="#007BFF" style={styles.sendIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ede6de", // Set your desired background color here
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0A6847",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingTop: 30, // Added padding to the top of the header
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    registrationNumberText: {
        fontSize: 16,
        color: "#fff",
    },
    sentMessage: {
        backgroundColor: "#0A6847",
        alignSelf: "flex-end",
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
    },
    receivedMessage: {
        backgroundColor: "#ECE3CE",
        alignSelf: "flex-start",
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: "#888",
        alignSelf: "flex-end",
        marginTop: 2,
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
        backgroundColor: "#fff",
        borderRadius: 20,
        marginRight: 10,
    },
    sendIcon: {
        marginRight: 10,
    },
    dateHeader: {
        textAlign: "center",
        backgroundColor: "#ede6de",
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});













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