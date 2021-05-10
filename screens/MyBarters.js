import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import{ Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../components/MyHeader'
import { ListItem } from 'react-native-elements/dist/list/ListItem';

export default class MyBartersScreen extends Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            allBarters:[],
        }
        this.requestRef=null;
    }

    getAllBarters=()=>{
        this.requestRef=db.collection('all_barters').where("user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allBarters= snapshot.docs.map(document=> document.data());  
            this.setState({
                allBarters:allBarters
            })
        })
    }

    keyExtractor= (item, index)=> index.toString();

    renderItem=({item,i})=>{
        <ListItem key = {i} bottomDivider containerStyle = {{backgroundColor: '#FFEDA6', marginTop: 20}}>
      <ListItem.Chevron name = "gift" type = "feather" color = '#5C5127' size = {30}/>
      <ListItem.Content>
        <ListItem.Title style = {{color: '#5C5127', fontWeight: 'bold'}}>{item.item_name}</ListItem.Title>
        <ListItem.Subtitle style = {{color: '#DEAC35'}}>{"Requested By: " + item.exchanger_name +"\nStatus : " + item.request_status}</ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'#ffff'}}>Exchange</Text>
      </TouchableOpacity>
    </ListItem>
    }

    componentDidMount(){
        this.getAllBarters();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader navigation={this.props.navigation} title="My Barters"/>
              <View style={{flex:1}}>
                {
                  this.state.allBarters.length === 0
                  ?(
                    <View style={styles.subtitle}>
                      <Text style={{ fontSize: 20}}>List Of All Barters</Text>
                    </View>
                  )
                  :(
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.allBarters}
                      renderItem={this.renderItem}
                    />
                  )
                }
              </View>
            </View>
          )
    }
}

const styles = StyleSheet.create({
    button:{
      width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#F69400",
        shadowColor: "#000",
        shadowOffset: {
           width:0,
           height:8
        }
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })