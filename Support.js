import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar,WebView, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage,Linking} from 'react-native';
const window = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[styles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

export default class Support extends Component<Props> {


  constructor(props) {
    super(props)
    this.state = {
      moviesList: [],
      eventLists :[],
      brandLists: [],
      moviesLists: [],
      beer: [],
      count : "0",
    }

  }
 _keyExtractor = (item, index) => item.organisationID;

 resPress = (resId,index) => {
    GLOBAL.productid =  resId;
    this.props.navigation.navigate('Detail')
   }


    showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

 back = () => {

    this.props.navigation.goBack()
   }



   goBack(item) {
        GLOBAL.organisationID = item.organisationID;
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onSelect({ address: item.organisation_name });
     }


 _renderItem = ({item,index}) => {




   return (
     <TouchableOpacity

         onPress={() => this.goBack(item)}
       >
     <View style = {{height : 80 ,width : window.width ,flex :1}} >
     <Text style = {{margin :10 ,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.organisation_name}
      </Text>

      <Text style = {{margin :10 ,color :'#90BA45',fontFamily :'TypoGraphica' ,fontSize :14}}>
    {item.address}
       </Text>

  <View style = {{marginLeft :0 ,height :1 ,width :window.width,backgroundColor :'white'}}>
  </View>

     </View>

</TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/organisation'

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    appID: "1",


  }),
}).then((response) => response.json())
    .then((responseJson) => {
        this.hideLoading();



       this.setState({ moviesList: responseJson[0].organisation})



    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentWillMount() {

    }
 renderPage(image, index) {
         return (
             <View key={index}>
                 <Image style={{ width: window.width, height: 150 }} source={{ uri: image }} />
             </View>
         );
     }

  render() {
    if(this.state.loading){
  return(
    <View style={{flex: 1 ,backgroundColor: 'black'}}>
    <ActivityIndicator style = {styles.loading}

   size="large" color="#90ba45" />
    </View>
  )
}
  return (





    <View style = {{flex : 1 , width : width ,height : height ,backgroundColor:'black' }}>

    <Text style = {{marginTop :30 ,color :'white',fontSize : 22, fontFamily:'TypoGraphica' ,alignSelf :'center' }}>
    {GLOBAL.username}
    </Text>

     <View style = {{flexDirection :'row'}}>

      <TouchableOpacity onPress={() =>  this.props.navigation.goBack()}>
    <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./back.png')}/>
</TouchableOpacity>
<Text style = {{color :'white',fontSize : 16 ,marginLeft : 10, marginTop :19 }}>
Support
</Text>

 </View>
 <Text style = {{marginTop : 20,color :'white',fontWeight :'bold',fontSize : 18,alignSelf :'center'}}>
  For any queries or assistance, get in touch with Larder at :

</Text>
<TouchableOpacity onPress={() =>  Linking.openURL('mailto:knock@larder.in')}>
 <View style = {{flexDirection :'row'}}>
 <Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./email.png')}/>
 <Text style = {{marginLeft : 20,color :'#90BA45',marginTop :18,fontWeight:'bold',fontSize : 16}}>
 knock@larder.in



</Text>
</View>
</TouchableOpacity >
<TouchableOpacity onPress={() =>  Linking.openURL('tel:0124 4286655')}>
<View style = {{flexDirection :'row'}}>
<Image style={{marginLeft : 20 ,height : 30 ,marginTop :15 , width : 30,resizeMode :'contain'}}
source={require('./mobile.png')}/>
<Text style = {{marginTop : 15,marginLeft : 20 ,color :'#90BA45',fontSize : 16,fontWeight:'bold',alignSelf :'center'}}>
 0124 4286655
</Text>
</View>
</TouchableOpacity >
          </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#910818',
    height: APPBAR_HEIGHT,



  },
  loading: {
           position: 'absolute',
           left: window.width/2 - 30,

           top: window.height/2,

           opacity: 0.5,

           justifyContent: 'center',
           alignItems: 'center'
       },

  content: {
    flex: 1,
    backgroundColor:'#000000',
  },
});
