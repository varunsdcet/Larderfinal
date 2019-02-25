import React, {Component} from 'react';
import {ActivityIndicator,Platform, StyleSheet,StatusBar, Text,Alert, View,Image,Dimensions,FlatList,TouchableOpacity,AsyncStorage} from 'react-native';
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

export default class Recommended extends Component<Props> {


resPress = (resId,index) => {
   GLOBAL.productid =  resId;
   this.props.navigation.navigate('Detail')
  }
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






 _renderItem = ({item,index}) => {



   return (
        <TouchableOpacity onPress={() =>  this.resPress(item.boothID,item)}>
     <View style = {{height : 100 ,width : window.width ,flex :1 ,flexDirection :'row', marginLeft:10, marginRight:10, marginTop:10}} >

     <Image
              style={{ width:100, height: 100, resizeMode:'contain',}}
              source={{ uri: item.product_image }}
            />

<View style={{flexDirection:'column', marginLeft:10, marginTop:10}}>
     <Text style = {{marginLeft :10 ,marginTop:5,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
   {item.product_name}
      </Text>
      <Text style = {{marginLeft :10 ,marginTop:5,color :'white' ,fontSize :14}}>
    Rs : {item.sale_price}
       </Text>
       <Text style = {{marginLeft :10 ,marginTop:5,color :'white',fontFamily :'TypoGraphica' ,fontSize :14}}>
     {item.calorie} Calories
        </Text>
</View>
     </View>

 </TouchableOpacity>





   )
 }

 getMoviesFromApiAsync = () => {
 this.showLoading();
       const url = 'http://139.59.76.223/larder/webservice/recommendation'

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


       this.setState({ moviesList: responseJson[0].products})



    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
        alert('Unable to process your request Please try again after some time')

    });
 }

   componentWillMount() {
     {this.getMoviesFromApiAsync()}
    }

    componentDidMount() {

      this.props.navigation.addListener('willFocus',this._handleStateChange);
     }
     _handleStateChange = state => {

   this.getMoviesFromApiAsync()
   };
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
Recommended List
</Text>

 </View>
 <FlatList
   data={this.state.moviesList}
   numColumns={1}
   keyExtractor={this._keyExtractor}
  renderItem={this._renderItem}
  extraData={this.state}
 />
    </View>




        //         <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        //  <View style={styles.content}>
        //  <View style = {{width :width , height : 60 ,backgroundColor :'black',flexDirection :'column'}}>
        //  <Text stle = {{fontSize : 20 ,fontFamily :'graphica',width : width ,height : 30 ,marginTop : 20 ,color :'white' }}>
        // Varun
        //  </Text>
        //
        //  </View>
        //
        //  <FlatList
        //    data={this.state.moviesList}
        //    numColumns={1}
        //    keyExtractor={this._keyExtractor}
        //   renderItem={this._renderItem}
        //   extraData={this.state}
        //  />
        //   </View>
        //    </KeyboardAwareScrollView>


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
