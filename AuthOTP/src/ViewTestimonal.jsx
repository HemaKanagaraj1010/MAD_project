import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore().collection('testimonials').onSnapshot(snapshot => {
      const testimonialList = [];
      snapshot.forEach(doc => {
        const testimonialData = doc.data();
        const averageRating = calculateAverageRating(testimonialData);
        testimonialList.push({ id: doc.id, ...testimonialData, averageRating });
      });
      setTestimonials(testimonialList);
    });

    return () => unsubscribe();
  }, []);

  const handleViewTestimonial = (testimonialId) => {
    navigation.navigate('TestimonialDetails', { testimonialId });
  };

  const handleRateTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalVisible(true);
  };

  const rateTestimonial = async () => {
    try {
      const testimonialRef = firestore().collection('testimonials').doc(selectedTestimonial.id);
      const testimonialData = (await testimonialRef.get()).data();
      const updatedRatings = testimonialData.ratings ? [...testimonialData.ratings, rating] : [rating];
      await testimonialRef.update({ ratings: updatedRatings });
      setModalVisible(false);
      setRating(0);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const renderStarRating = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
        >
          <Icon
            name={i <= numStars ? 'star' : 'star-o'}
            size={30}
            color={i <= numStars ? '#FFD700' : '#C0C0C0'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const calculateAverageRating = (testimonial) => {
    if (testimonial.ratings && testimonial.ratings.length > 0) {
      const totalRating = testimonial.ratings.reduce((acc, curr) => acc + curr, 0);
      return totalRating / testimonial.ratings.length;
    } else {
      return 0;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Testimonial</Text>
        <Text style={styles.italic}>See the power of words come to life. Dive into our testimonials.</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {testimonials.map(testimonial => (
          <TouchableOpacity
            key={testimonial.id}
            style={styles.card}
            onPress={() => handleViewTestimonial(testimonial.id)}
          >
            <View style={styles.ratingContainer}>
              <Text style={styles.averageRating}>{testimonial.averageRating ? testimonial.averageRating.toFixed(1) : 'N/A'}</Text>
              <Icon name="star" size={20} color="#FFD700" />
            </View>

            <View style={styles.header}>
              <Text style={styles.name}>{testimonial.name} | {testimonial.graduationYear}</Text>
            </View>
            <Text style={styles.detail}>Roll No: {testimonial.rollNo}</Text>
            <Text style={styles.detail}>Graduation Year: {testimonial.graduationYear}</Text>
            <Text style={styles.detail}>{testimonial.email}</Text>
            <Text style={styles.detail}>{testimonial.designation}</Text>
            <Text style={styles.detail}>{testimonial.company}</Text>
            <Text style={styles.detail}>
              LinkedIn:
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(`https://www.linkedin.com/in/${testimonial.linkedin}`)}
              >
                {testimonial.linkedin}
              </Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.viewButton]}
                onPress={() => handleViewTestimonial(testimonial.id)}
              >
                <Text style={styles.viewButtonText}>View Testimonial</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rateButton]}
                onPress={() => handleRateTestimonial(testimonial)}
              >
                <Text style={styles.rateButtonText}>Rate Testimonial</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate Testimonial</Text>
            <View style={styles.starContainer}>
              {renderStarRating(rating)}
            </View>
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={rateTestimonial}
            >
              <Text style={styles.modalButtonText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#514bb5",
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerText: {
    paddingTop:20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AC0D',
    fontStyle:'normal',
  },
  italic: {
    fontStyle: 'italic',
    color:'#d5d6fc', 
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#d5d6fc',
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageRating: {
    marginRight: 5,
    color: '#514bb5',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#514bb5',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    width: '48%',
  },
  viewButton: {
    backgroundColor: '#5DADE2',
  },
  rateButton: {
    backgroundColor: '#FF6347',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#514bb5',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ViewTestimonial;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Modal } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons

// const ViewTestimonial = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//   const [rating, setRating] = useState(0);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = firestore().collection('testimonials').onSnapshot(snapshot => {
//       const testimonialList = [];
//       snapshot.forEach(doc => {
//         const testimonialData = doc.data();
//         const averageRating = calculateAverageRating(testimonialData);
//         testimonialList.push({ id: doc.id, ...testimonialData, averageRating });
//       });
//       setTestimonials(testimonialList);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleViewTestimonial = (testimonialId) => {
//     navigation.navigate('TestimonialDetails', { testimonialId });
//   };

//   const handleRateTestimonial = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//     setModalVisible(true);
//   };

//   const rateTestimonial = async () => {
//     try {
//       const testimonialRef = firestore().collection('testimonials').doc(selectedTestimonial.id);
//       const testimonialData = (await testimonialRef.get()).data();
//       const updatedRatings = testimonialData.ratings ? [...testimonialData.ratings, rating] : [rating];
//       await testimonialRef.update({ ratings: updatedRatings });
//       setModalVisible(false);
//       setRating(0);
//       setSelectedTestimonial(null);
//     } catch (error) {
//       console.error('Error updating rating:', error);
//     }
//   };

//   const renderStarRating = (numStars) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity
//           key={i}
//           onPress={() => setRating(i)}
//         >
//           <Icon
//             name={i <= numStars ? 'star' : 'star-o'}
//             size={30}
//             color={i <= numStars ? '#FFD700' : '#C0C0C0'}
//           />
//         </TouchableOpacity>
//       );
//     }
//     return stars;
//   };

//   const calculateAverageRating = (testimonial) => {
//     if (testimonial.ratings && testimonial.ratings.length > 0) {
//       const totalRating = testimonial.ratings.reduce((acc, curr) => acc + curr, 0);
//       return totalRating / testimonial.ratings.length;
//     } else {
//       return 0;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//            <Text style={styles.headerText}>Testimonial</Text>
//       <Text style={styles.italic}>See the power of words come to life. Dive into our testimonials.</Text>
//       </View>
//       <ScrollView style={styles.scrollView}>
//         {testimonials.map(testimonial => (
//           <TouchableOpacity
//             key={testimonial.id}
//             style={styles.card}
//             onPress={() => handleViewTestimonial(testimonial.id)}
//           >
//             <View style={styles.ratingContainer}>
//               <Text  style={styles.averageRating}>{testimonial.averageRating ? testimonial.averageRating.toFixed(1) : 'N/A'}</Text>
//              <Icon name="star" size={20} color="#FFD700" />
// </View>

//             <View style={styles.header}>
//               <Text style={styles.name}>{${testimonial.name} | ${testimonial.graduationYear}}</Text>
//             </View>
//             <Text style={styles.detail}>{Roll No: ${testimonial.rollNo}}</Text>
//             <Text style={styles.detail}>{testimonial.email}</Text>
//             <Text style={styles.detail}>{Graduation Year: ${testimonial.graduationYear}}</Text>
//             <Text style={styles.detail}>{testimonial.designation}</Text>
//             <Text style={styles.detail}>{testimonial.company}</Text>
//             <Text style={styles.detail}>{`LinkedIn: `}
//               <Text
//                 style={styles.link}
//                 onPress={() => Linking.openURL(https://www.linkedin.com/in/${testimonial.linkedin})}
//               >
//                 {testimonial.linkedin}
//               </Text>
//             </Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={[styles.button, styles.viewButton]}
//                 onPress={() => handleViewTestimonial(testimonial.id)}
//               >
//                 <Text style={styles.viewButtonText}>View Testimonial</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.button, styles.rateButton]}
//                 onPress={() => handleRateTestimonial(testimonial)}
//               >
//                 <Text style={styles.rateButtonText}>Rate Testimonial</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       {/* Rating Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Rate Testimonial</Text>
//             <View style={styles.starContainer}>
//               {renderStarRating(rating)}
//             </View>
//             <TouchableOpacity
//               style={[styles.button, styles.modalButton]}
//               onPress={rateTestimonial}
//             >
//               <Text style={styles.modalButtonText}>Submit Rating</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#514bb5",
//   },
//   headerContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 20,
//       },
//   headerText: {
//         paddingTop:20,
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#D4AC0D',
//         fontStyle:'normal',
        
//       },
//       italic: {
//         fontStyle: 'italic',
//        color:'#d5d6fc', 
//      },
//   scrollView: {
//     flex: 1,
//     padding: 20,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     backgroundColor: '#d5d6fc',
//     position: 'relative',
//   },
//   ratingContainer: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   averageRating: {
//     marginRight: 5,
//     color: '#514bb5',
//     fontWeight: 'bold',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#514bb5',
//   },
//   detail: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#555',
//   },
//   link: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     borderRadius: 5,
//     paddingVertical: 10,
//     alignItems: 'center',
//     width: '48%',
//   },
//   viewButton: {
//     backgroundColor: '#5DADE2',
//   },
//   rateButton: {
//     backgroundColor: '#FF6347',
//   },
//   viewButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   rateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   modalButton: {
//     marginTop: 20,
//     backgroundColor: '#514bb5',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   starContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
// });

// export default ViewTestimonial;