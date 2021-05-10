import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";

export default class UserDetails extends Component{
 constructor(props){
     super(props);
     this.state={
        userId: firebase.auth().currentUser.email,
        receiverId:this.props.navigation.getParam("details")["username"],
        exchangeId:this.props.navigation.getParam("details")["request_id"],
        itemName:this.props.navigation.getParam("details")["item_name"],
        description:this.props.navigation.getParam("details")["description"],
        receiverName: "",
        receiverContact: "",
        receiverAddress: "",
        receiverRequestDocId: "",
     }
 }   


 getUserDetails=()=>{
     db.collection("users").where("email_id","==",this.state.receiverId).get()
     .then((snapshot)=>{
         snapshot.forEach(doc=>{
             this.setState({
                 receiverName:doc.data().first_name,
                 receiverContact:doc.data().contact,
                 receiverAddress:doc.data().address
             })
         })
     })

     db.collection("exchange_requests").where("request_id","==",this.state.exchangeId).get()
     .then((snapshot)=>{
         snapshot.forEach(doc=>{
            this.setState({recieverRequestDocId:doc.id})
         })
     })
 }

 updateBarterStatus=()=>{
     db.collection("all_barters").add({
        item_name:this.state.itemName,
        exchange_id: this.state.exchangeId,
        requested_by: this.state.recieverName,
        user_id: this.state.userId,
        request_status: "User Interested",
     })
 }

 componentDidMount(){
     this.getUserDetails();
 }

 render(){
     return(
        <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#fff'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Exchange Items", style: { color: '#fff', fontSize: 29, fontWeight:"bold" }}}
            backgroundColor = "#F69400"
          />
        </View>
        <View style={{flex:0.3, marginTop: 40}}>
          <Card containerStyle = {{backgroundColor: '#FFEDA6'}}>
            <Card containerStyle = {{backgroundColor: "#F69400"}}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Item Name: {this.state.itemName}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex: 0.3}}>
          <Card containerStyle = {{backgroundColor: '#FFEDA6'}}>
            <Card containerStyle = {{backgroundColor: "#F69400"}}>
              <Text style={{fontWeight:'bold', color: '#fff'}}>Name: {this.state.receiverName}</Text>
            </Card>
            <Card containerStyle = {{backgroundColor: "#F69400"}}>
              <Text style={{fontWeight:'bold', color: '#fff'}}>Contact: {this.state.receiverContact}</Text>
            </Card>
            <Card containerStyle = {{backgroundColor: "#F69400"}}>
              <Text style={{fontWeight:'bold', color: '#fff'}}>Address: {this.state.receiverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.receiverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBarterStatus()
                    this.props.navigation.navigate('MyBarters')
                  }}>
                <Text style={{fontWeight:'bold', color: '#fff'}}>I want to barter</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor: '#FFE0B2'
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#DEAC35",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    }
})
