import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, ImageBackground, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AlumniSearch from './AlumniSearch';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import News from './News';
const App = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const handleNetworkPress = () => {
    navigation.navigate('AlumniSearch'); // Navigate to AlumniSearch component when network.png is clicked
  };
  const handleNewsPress = () => {
    navigation.navigate('News'); // Navigate to NewsPage component when news.png is clicked
  };
  const handleTestimonalPress=()=>{
    navigation.navigate('ViewTestimonal');
  }
  const handleChatPress=()=>{
    navigation.navigate('ChatApplication');
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/back.png')} style={styles.image}>
        {/* Positioned icons */}
        <View style={styles.iconContainer}>
          <Icon name="menu" size={30} color="#a2a2db" style={styles.icon} />
          <Icon name="account-circle" size={33} color="#a2a2db" style={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{
            fontSize: 25,
            color: "#522289"
          }}>Welcome to ProPrep,</Text>
          <Text style={{
            fontSize:15,
            paddingVertical:80,
            paddingRight:80,
            paddingTop:4,
            lineHeight:22,
            color:"#a2a2db"
          }}>
  Explore job posts, networking, news updates, and broadcasts all in one place.
          </Text>
          <View style={{
            flexDirection:"row",
            backgroundColor:"#FFF",
            borderRadius:40,
            alignItems:"center",
            paddingVertical:10,
            paddingHorizontal:20,
            marginTop:-30,
                    
          }}>
            <Image source={require('./images/search.png')} style={{height:14,width:14}}/>
          <TextInput
            placeholder="  Search..."
            style={{paddingHorizontal:20,
            fontSize:15,
            color:"#ccccef"
          }}
          />
          </View>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginRight:-40,marginTop:30}}>
          <View style={{
            alignItems:"center",
            justifyContent:"center",
            height:66,
            width:66,
            marginRight:20,
            borderRadius:100,
            backgroundColor:"#5facdb"
          }}>
 <TouchableOpacity onPress={handleNetworkPress}>
              <View style={{ alignItems:"center", justifyContent:"center" }}>
                <Image source={require('./images/network.png')} />
              </View>
            </TouchableOpacity>
            </View>
          <View style={{
            alignItems:"center",
            justifyContent:"center",
            height:66,
            width:66,
            marginRight:20,
            borderRadius:100,
            backgroundColor:"#FB8DA0"
          }}>


<TouchableOpacity onPress={handleNewsPress}>
              <View style={{ alignItems:"center", justifyContent:"center" }}>
                <Image source={require('./images/news.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            alignItems:"center",
            justifyContent:"center",
            height:66,
            width:66,
            marginRight:20,
            borderRadius:100,
            backgroundColor:"#FEC84D"
          }}>

<TouchableOpacity onPress={handleTestimonalPress}>
  <View style ={{alignItems:"center", justifyContent:"center" }}>
<Image 
source={require('./images/broadcast.png')}

/>
</View>
</TouchableOpacity>
          </View>
       

         
       
  
          <View style={{
            alignItems:"center",
            justifyContent:"center",
            height:66,
            width:66,
            marginRight:20,
            borderRadius:100,
            backgroundColor:"#E42256"
          }}>
 <TouchableOpacity onPress={handleChatPress}>
<View style={{alignItems:"center", justifyContent:"center"}}>
<Image 
source={require('./images/chat.png')}

/>
</View>
</TouchableOpacity>

          </View>
          

          </ScrollView>
          <Text style={{
          color:"#fff",
          marginTop:10,
          marginBottom:20,
          fontSize:17
          }}>Explore Options:</Text>
           <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -40, marginTop: 30 }}
          >
            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
              }}
            >
              <Image
                source={require("./images/2.jpg")}
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                    
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                  Connect with alumni networks, build contacts, and foster professional connections.
                  </Text>
                </View>
                <Image 
source={require('./images/network2.png')}

/>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
                marginHorizontal: 20,
              }}
            >
              <Image
                source={require("./images/7.jpg")}
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                   Discover job opportunities posted by alumni and network with potential employers.
                  </Text>
                </View>
                <Image 
source={require('./images/corporate.png')}

/>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FEFEFE",
                height: 200,
                width: 190,
                borderRadius: 15,
                padding: 5,
              }}
            >
              <Image
                source={require("./images/4.jpg")}
                style={{ width: 180, borderRadius: 10, height: 130 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: 150,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                >
                  <Text
                    style={{
                     
                      fontSize: 11,
                      color: "#a2a2db",
                    }}
                  >
                    Explore diverse modules and features tailored to your educational journey on ProPrep.
                  </Text>
                </View>
                <Image 
source={require('./images/learning.png')}

/>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    left: 40,
  },
  icon: {
    marginRight: 250,
  },
  textContainer: {
    paddingHorizontal: 40,
    paddingTop: 100, // Adjust top padding to move text to the top
    flex: 1, // Ensure text container takes up available space
    //justifyContent: 'flex-start', // Align items at the start of the container
  paddingBottom:20
  },
 

});

export default App;
