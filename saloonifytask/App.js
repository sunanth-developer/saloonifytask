
import {  Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
export default function App() {
  const [popup, setPopup] = useState(false)
  const [book, setBook] = useState()
  const [title, setTitle] = useState()
  const [timeslot, setTimeslot] = useState()
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [bookingconfirmed,setBookingconfirmed]=useState(false)
   const [showcalender, setShowcalender] = useState(false);
   const [dates,setDates]=useState([])
   const [titles,setTitles]=useState([])
   const [times,setTimes]=useState([])
   
  const carddetails=[{url:"https://punchermedia.com/wp-content/uploads/2018/07/Judo-Korea-Resized.jpg",title:"Judo"},{url:"https://punchermedia.com/wp-content/uploads/2018/06/Karate-photo-Resized.jpg",title:"Karate"},{url:"https://img.olympics.com/images/image/private/t_s_w960/t_s_16_9_g_auto/f_auto/primary/dyzftci4wvroohbg4tnq",title:"Boxing"}]
  const timeslots=["10AM-11AM","11AM-12PM","12PM-1PM","2PM-3PM","3PM-4PM","4PM-5PM","5PM-6PM"]
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();
  const today=`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
  const [date, setDate] = useState(today);
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Basic email validation
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!name || !phoneNumber || !email) {
      alert('All fields are required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Invalid phone number');
      return;
    }

    if (!validateEmail(email)) {
     alert('Invalid email address');
      return;
    }

    setBookingconfirmed(true)
    setTimes([...times,timeslot])
    setDates([...dates,date])
    setTitles([...titles,title])

  };
  return (
    <SafeAreaView style={{marginTop:"10%"}}>
    {popup?(
      
        <View style={styles.popupscreen}>
        <View style={styles.popup}>
        <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={28} color="black" onPress={()=>{setPopup(false),setBookingconfirmed(false)}} />
          </TouchableOpacity>
          {bookingconfirmed?(<>
            <Text style={{fontSize:18,fontWeight:"bold",marginBottom:"10%"}}> Thank you for your booking with us.</Text>
            <Text style={{fontSize:18,fontWeight:"bold"}}> Your appointment for {title} at {timeslot} on {date}  is confirmed</Text>
            </>
          ):(<>
            <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        placeholder="Mobile no."
        keyboardType="phone-pad" 
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none" 
      />
      <Text style={[styles.detailstext,{marginBottom:10}]}>Confirm your appointment for {title} at {timeslot} on {date} </Text>
      

      <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
        <Text style={styles.buttonText}>Confirm appointment</Text>
      </TouchableOpacity>
         </> )}
          

        </View>
      </View>
      
    ):""}
    <View style={styles.container}>
      <Text style={{fontSize:25,color:"white",fontWeight:700}}>Bookings.com</Text>
      <TouchableOpacity>
      <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
    
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <TextInput style={{width:"90%",borderRadius:14,margin:5,borderWidth:1,padding:7,borderColor:"gray"}}
        placeholder="saloons,hair cut,spa...."
      />
      <TouchableOpacity>
      <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      
      </View>
      
      <TouchableOpacity onPress={()=>setShowcalender(!showcalender)}>
      <Ionicons name="calendar" size={24} color="black"  style={{alignSelf:"flex-end",padding:5}}/>
      </TouchableOpacity>
      {showcalender?(
         <View >
      <DatePicker
      onSelectedChange={selecteddate => setDate(selecteddate)}
      selected={selecteddate?selecteddate:today}
      current={today}
      mode="calendar"
    />

    <TouchableOpacity style={styles.button} onPress={()=>setShowcalender(!showcalender)}>
    <Text style={[styles.buttonText,{alignSelf:"center"}]}  >OK</Text>
   </TouchableOpacity>
    </View>
      ):""}
     
      <ScrollView showsVerticalScrollIndicator={false}>
      
      {carddetails.map((val,index)=>{return(
        <View style={styles.card}>
      <Image source={{ uri: val.url }} style={styles.cardImage} />
      <View style={styles.cardContent}>
     
        <Text style={styles.cardTitle}>{val.title}</Text>
       
    {book===index?
    (
      <TouchableOpacity
      onPress={()=>setBook()}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      )
    :
    (
      <TouchableOpacity
      onPress={()=>setBook(index)}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
      )}
      
      </View>
      <View >
      
      </View>
      {book===index?(
        <View style={styles.timeslots}>
        {timeslots.map((time)=>{return(
         times.includes(time) && dates.includes(date) && titles.includes(val.title)?"":(
               <TouchableOpacity onPress={()=>{setTimeslot(time),setTitle(val.title),setPopup(!popup)}} >
           <Text style={styles.timeslotstext}>{time}</Text>
           </TouchableOpacity>
         )
           
           
        )
          
        })}
       
      </View>
      ):""}
      
      </View>
      )})}
      {}
      
      
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent:"space-between",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    padding:5,
    width:"100%"
  },
  card:{
     backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
   cardContent: {
    padding: 10,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
   button: {
    backgroundColor: 'black',  
    padding: 10,               
    borderRadius: 5,          
  },
  buttonText: {
    color: 'white',          
    fontSize: 14,            
    fontWeight: 'bold',      
  },
  timeslots:{
    displa:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center",
    flexWrap: 'wrap',
    
  },
  timeslotstext:{
    borderWidth:1,
    padding:5,
    margin:5,
    borderRadius:5,
    borderColor:"gray",
   fontWeight: 'bold',
  },
  popupscreen: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:10,
    position:"relative",
    height:"100%",
    width:"100%",
    backgroundColor:"#EDd9d9d9",
  },
  popup: {
    backgroundColor:"white",
    borderRadius: 10,
    alignItems: 'center',
    height:"60%",
    width:"100%",
    
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
  alignSelf:"flex-end",
  padding:10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:"bold",
    alignSelf:"flex-start",
    marginLeft:"5%"
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 5,
    width:"90%"
  },
  detailstext:{
    fontWeight:"bold",
    fontSize:18,
    alignSelf:"flex-start",
    marginLeft:"5%"
  }
});
