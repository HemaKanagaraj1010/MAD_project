import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import TabNavigation from "./navigation/TabNavigation";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
export default function Detail({ route }){
    const { uid } =route.params;
    const navigation = useNavigation(); 
    const [name, setName]= useState("");
    const [registerNumber, setRegisterNumber]= useState("");
    const [batch, setBatch]=useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail]=useState("");


    const saveDetails = async () =>{
        try {
            await firestore().collection("users").doc(uid).set({
                name,
                dob,
                registerNumber,
                batch,

                gender,
                email
            });
            //After saving details, navigate to Dashboard
            navigation.navigate("TabNavigation");
        } catch(error){
            console.log("Error saving details: ",error);
        }

        };
        return(
<View style={{ flex: 1,padding:10,backgroundColor: "#BEBDB8"}}>
    <Text
    style={{
        fontSize: 32,
        fontWeight: "bold",
        marginBotttom :40,
        marginTop: 150,

    }}
    >
        Enter your Details:
    </Text>
    <TextInput
    style={{
        height: 50,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal: 10,
    }}
    placeholder="Name"
    value={name}
    onChangeText={setName}
    />
    <TextInput
    style={{
        height: 50,
        width: "100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal: 10,
    }}
    placeholder="e.g., 23MX100"
    value={registerNumber}
    onChangeText={setRegisterNumber}
    />
    <TextInput
    style={{
        height: 50,
        width:"100%",
        borderColor: "black",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,

    }}
    placeholder="Date of Birth"
    value={dob}
    onChangeText={setDob}
    />
    <TextInput
    style={{
        height: 50,
        width:"100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal:10,


    }}
    placeholder="Batch"
    value={batch}
    onChangeText={setBatch}
    />
        <TextInput
    style={{
        height: 50,
        width:"100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal:10,


    }}
    
    placeholder="Gender"
    value={gender}
    onChangeText={setGender}
    />
        <TextInput
    style={{
        height: 50,
        width:"100%",
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 30,
        paddingHorizontal:10,


    }}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
    />
    <TouchableOpacity
    onPress={saveDetails}
    style={{
        backgroundColor: "#841584",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    }}
    >
    <Text style={{color:"white",fontSize:22,fontWeight:"bold"}}>
        Save Details
 </Text>
 </TouchableOpacity>
</View>
        );

        
    }
