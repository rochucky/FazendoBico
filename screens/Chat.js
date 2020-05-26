import React from 'react'
import { Keyboard, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, View, Dimensions, TextInput, AsyncStorage, ActivityIndicator } from 'react-native'
import {
  Layout,
  Text,
  Input,
  Button
} from 'react-native-ui-kitten'

import NetInfo from '@react-native-community/netinfo';

import { FontAwesome } from '@expo/vector-icons'
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import Colors from '../constants/Colors';

export default class Chat extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
         title: navigation.state.params.Header
    }
  }

  constructor(props){
    super(props);

    this.state = {
      offers: '',
      screenHeight: Math.round(Dimensions.get('window').height),
      containerHeight: '100%',
      messages: [],
      message: '',
      email: '',
      loading: true,
      me: '',
      you: ''
    }

    this.job = this.props.navigation.getParam('job')
    this.job_id = this.props.navigation.getParam('job_id')

    this.unsubscribeMessages = () => {}

    AsyncStorage.getItem('email', (err, email) => {
      if(this.job.owner == email){
        this.setState({'me': this.job.owner_name, 'you': this.job.freelancer_name}, () => this.props.navigation.setParams({'Header': this.state.you}))
      }
      else{
        this.setState({'me': this.job.freelancer_name, 'you': this.job.owner_name}, () => this.props.navigation.setParams({'Header': this.state.you}))
      }
      this.setState({email: email})
    })

    this.chats = firebase.firestore().collection('chats')

    NetInfo.fetch().then(state =>{
      if(state.isConnected){

        this.chats.where('owner', '==',this.job.owner)
          .where('freelancer','==',this.job.freelancer)
          .get()
          .then(snap => {
            if(snap.size == 0){
              let date = new Date()
              date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
              this.chats.add({
                owner: this.job.owner,
                freelancer: this.job.freelancer,
                date: date
              })
              .then(chat => {
                this.chat = chat.id
              })
            }
            else{
              snap.forEach(item => {
                this.chat = item.id
              })
            }
          })
          .then(() => {
            this.unsubscribeMessages = firebase.firestore().collection('messages').where('chat', '==', this.chat).orderBy('date')
              .onSnapshot(snapshot => {
                let messages = []
                snapshot.forEach(message => {
                  let datetime = new Date(message.data().date);
                  messages.push({
                    id: message.id,
                    datetime: ("0" + datetime.getDate()).slice(-2) + '/' + ("0" + (datetime.getMonth() + 1)).slice(-2) + '/' + datetime.getFullYear() + ' ' + ("0" + datetime.getHours()).slice(-2) + ':' + ("0" + datetime.getMinutes()).slice(-2),
                    ...message.data()
                  })
                })
                this.setState({messages: messages, loading: false}, () => {
                  setTimeout(() => {
                    this.refs.scrollview.scrollToEnd({animated: false})
                  }, 200)
                })
              })
            
          })
      }
      else{
        this.unsubscribeMessages = () => {}
        alert('Falha na conexão. Certifique-se que possui uma conexão com a internet')
        this.props.navigation.pop()
      }
    })



  }  

  componentWillUnmount(){
    this.unsubscribeMessages();
  }

  render() {
    let content
    if(this.state.loading == true){
      content = (
        <Layout style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Layout>
      )
    }
    else{
      content = (
        <ScrollView
          ref="scrollview"
          crollToOverflowEnabled={true}
        >
          {this.state.messages.map(item => {
            if(item.sender == this.state.email){
              return(
                <View id={item.id} style={styles.userMessage}>
                  <Text style={styles.messageHeader}>Você</Text>
                  <Text style={styles.messageBody}>{item.message}</Text>
                  <Text style={styles.messageFooter}>{item.datetime}</Text>
                </View>
              )
            }
            else{
              return(
                <View style={styles.otherMessage}>
                  <Text style={styles.messageHeader}>{this.state.you}</Text>
                  <Text style={styles.messageBody}>{item.message}</Text>
                  <Text style={styles.messageFooter}>{item.datetime}</Text>
                </View>
              )
            }
          })}
        </ScrollView>
      )
    }
    
    return (
      <View style={{height: this.state.containerHeight}}>
        <View style={styles.messagesScrollview}>
          {content}
        </View>
        <View style={styles.textbox}>
          <TextInput 
            style={styles.textinput} 
            onChangeText={(text) => this.setState({message: text})} 
            value={this.state.message}
            multiline
          />
        </View>
        <View style={[styles.button, {backgroundColor: '#fff'}]}>
          <TouchableOpacity 
            onPress={this.send.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'send'}
              color={Colors.mainColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    )

  }

  send = () => {
    NetInfo.fetch().then(state =>{
      if(state.isConnected){
        let date = new Date().getTime()
        let messageData = {
          chat: this.chat,
          sender: this.state.email,
          date: date,
          message: this.state.message
        }
        firebase.firestore().collection('messages').add(messageData)
        .then(() => {
          this.setState({message: ''})
        })
      }
      else{
        alert('Falha no envio. Por favor, certifique-se que possui uma conexão com a internet.')
      }
    })
    
  }

}

const styles = StyleSheet.create({
  textbox: {
    width: '80%',
    height: 'auto',
    left: 10,
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f7f9fc',
    borderColor: '#edf1f7',
    borderWidth: 1,
    borderRadius: 20,
  },
  textinput: {
    padding: 10
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:50,
  },
  userMessage: {
    marginLeft: '5%',
    marginRight: '15%',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: 'auto',
    backgroundColor: '#7DC7FF',
    borderRadius: 20
  },
  otherMessage: {
    marginLeft: '15%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: 'auto',
    backgroundColor: '#B5D8F2',
    borderRadius: 20
  },
  messagesScrollview: {
    paddingBottom: 80
  },
  messageHeader: {
    fontSize: 12,
    color: '#777',
    fontWeight: 'bold'
  },
  messageFooter: {
    fontSize: 12,
    color: '#777',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'right'
  },
  messageBody: {
  
  }

});
