import { View, Text, TouchableOpacity, StyleSheet, ImageBackground,Image } from 'react-native';

import React from 'react'
import { Formik } from 'formik';
import { TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
export default function AddBroadcast() {
  return (
    <ImageBackground 
    source={require('../assets/addbroadcast.jpg')} // Replace 'path/to/your/background/image.jpg' with the actual path to your image file
    style={styles.backgroundImage}
  >
    <View className="p-10">
        <Text className="text-[25px] font-bold text-blue-500">
        Post a broadcast message
        </Text>
        <Text className="text-[18px] text-gray-500 mb-7">
        Spread the Word Far and Wide
        </Text>
    <Formik
    initialValues={{ title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    attachment: null,
    visibility: 'public',}}
    onSubmit={value=>console.log(value)}
    >
    {({handleChange,handleBlur,handleSubmit,values})=>(
        <View>
          <TouchableOpacity onPress={()=>console.log("Image Click")}>
          <Image source={require('./images/image_placeholder.jpg')}
          style={{width:100,height:100,borderRadius:15}}
/>
</TouchableOpacity>
        <TextInput
        style={styles.input}
        placeholderTextColor='white' // Placeholder text color

        placeholder='Title'
        value={values?.title}
        onChangeText={handleChange('title')}
        />
         <TextInput
        style={styles.input}
        placeholder='Description'
        placeholderTextColor='white' // Placeholder text color

        value={values?.description}
        numberOfLines={5}
        onChangeText={handleChange('description')}
        />
         <TextInput
        style={styles.input}
        placeholder='Category'
        placeholderTextColor='white' // Placeholder text color

        value={values?.category}
        onChangeText={handleChange('category')}
        />
         <TextInput
        style={styles.input}
        placeholder='Time'
        placeholderTextColor='white' // Placeholder text color

        value={values?.time}
       
        onChangeText={handleChange('time')}
        />
         <TextInput
        style={styles.input}
        placeholder='Date'
        placeholderTextColor='white' // Placeholder text color

        value={values?.date}
        onChangeText={handleChange('date')}
        />
         <TextInput
        style={styles.input}
        placeholder='Location'
        placeholderTextColor='white' // Placeholder text color

        value={values?.location}
        onChangeText={handleChange('location')}
        />
        
        
       <TouchableOpacity onPress={handleSubmit}
       className="p-5 bg-blue-500 rounded-full mt-5">
        <Text className="text-white text-center text-[16px]">Submit</Text>
      </TouchableOpacity>
        {/* <Button onPress={handleSubmit} className="mt-7" title="submit" /> */}
</View>
    )}
    </Formik>
      
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
      },
    input:{
   
    borderWidth:1,
    borderRadius:10,
    marginTop:10,
    marginBottom:5,
    padding:10,
    
 paddingHorizontal:17,
    fontSize:17,
    color: 'white', // Input text color
    borderColor: 'white', // Border color
    color: 'white', // Input text color
    borderColor: 'white', // Border color
    }
})