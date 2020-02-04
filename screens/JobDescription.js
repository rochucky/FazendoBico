import React from 'react'
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, Image } from 'react-native'
import {
	Text,
	Input,
	Button
} from 'react-native-ui-kitten'
import { FontAwesome } from '@expo/vector-icons'
import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

import { ImageModal } from '../components/CustomComponents'

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class JobDescription extends React.Component {
  static navigationOptions = {
    title: 'Detalhes'
  }

  constructor(props){
    super(props)

    this.state = {
     offers: '',
     images: [],
     iamge: '',
     modalVisible: false
    }

		this.item = this.props.navigation.getParam('item')

    this.images = firebase.firestore().collection('images')
    this.images.where('job', '==',this.item.id).get()
      .then((snap) => {
        let snapImgs = []
        if(snap.size > 0){
          snap.forEach(image => {
            snapImgs.push(image.data())
          })
        }
        else{
          snapImgs.push(require('../assets/images/no-image.png'));
        }
        this.setState({images: snapImgs})
      })
    this.job = firebase.firestore().collection('jobs').doc(this.item.id)
    
    firebase.firestore().collection('offers').where('job', '==', this.item.id).get()
      .then((snap) => {
        this.setState({offers: snap.size})
      })
    

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
    				<Text 
    					style={styles.title}
    					category='h3'
    				>{this.item.data.title}</Text>
            <View style={[styles.button, {backgroundColor: '#FFFFFF', top: 10, right: 15, height: 40, width: 40}]}>
              <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('JobOffersScreen', {item: this.item})
                }}
              >
                <Text
                  category='h3'
                  color= 'white'
                >{this.state.offers}</Text>
              </TouchableOpacity>
            </View>
    				<Text 
    					style={styles.value}
    					category='h6'
    				>R$ {this.item.data.value}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <ImageModal 
              modalVisible={this.state.modalVisible} 
              image={this.state.image} 
              setModalVisible={this.setModalVisible.bind(this)}
            ></ImageModal>
            <Text style={styles.label}>Descrição</Text>
    				<Text style={styles.description}>{this.item.data.description}</Text>
            <Text style={styles.label}>Endereço</Text>
            <Text style={styles.description}>{this.item.data.address}, {this.item.data.number} - {this.item.data.neighborhood}</Text>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.description}>{this.item.data.city} - {this.item.data.state}</Text>
          </View>
          <View style={styles.imgContainer}>
            {this.state.images.map(image => {
              return(
                <TouchableOpacity style={styles.image} onPress={ async () => {
                  await this.setState({image: image.uri})
                  this.setModalVisible(true)
                }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={ image }
                  />
                </TouchableOpacity>
              )
            })}
          </View>
  			</ScrollView>
        <View style={[styles.button, {backgroundColor: '#4da6ff'}]}>
          <TouchableOpacity 
            onPress={this.edit.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'pencil'}
              color="white"
            />
          </TouchableOpacity>
          
        </View>
        <View style={[styles.button, {backgroundColor: '#cc0000', right: 100}]}>
          <TouchableOpacity 
            onPress={this.delete.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'trash-o'}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.button, {backgroundColor: '#4da6ff', bottom: 100}]}>
          <TouchableOpacity 
            onPress={this.picture.bind(this)}
          >
            <FontAwesome 
              size={40}
              name={'camera'}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
	}

  picture = async () => {
    if(!this.getPermissionAsync()){
      alert('É preciso dar permissão para utilização da Câmera')
      return false
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
      quality: 0.4,
    })
    if(!result.cancelled){
      let response = await fetch(result.uri)
      let blob = await response.blob()
      let date = new Date()
      let filename = this.item.id + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + '.jpg'
      firebase.storage().ref().child(filename).put(blob)
        .then( async (snap) => {
          let url = await snap.ref.getDownloadURL()
          if(!this.state.images[0].uri){
            this.setState({ images: [] })
          }
          let images = this.state.images
          images.push({uri: url, job: this.item.id, name: filename })
          this.setState({ images: images })
          this.images.add({uri: url, job: this.item.id, name: filename })
        })
        .catch((err) => {
          alert('Falha ao carregar arquivo!')
          console.log(err)
        })
    }
  }

  edit = () => {
    this.props.navigation.push('EditJobScreen', {item: this.item})
  }

  delete = () => {
    Alert.alert(
      'Excluir',
      'Deseja excluir este bico?', [{
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => {
            this.job.delete().then(() => {
              alert('Bico Excluido')
              this.props.navigation.goBack()
            })
          }
      }, ], {
          cancelable: false
      }
    )
    return true
    
  }

  getPermissionAsync = async () => {
    if (Platform.OS == 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        // alert('Sorry, we need camera roll permissions to make this work!')
        return false
      }
    }
    else{
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        // alert('Sorry, we need camera permissions to make this work!')
        return false
      }
    }
    return true
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  titleContainer: {
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#E1F9FF',
    borderBottomWidth: 1,
    borderColor: '#CCC'
  },
  bodyContainer: {
    paddingRight: 15,
    paddingLeft: 15
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15
  },
  image: {
    borderWidth: 3,
    borderColor: '#000',
    width: '33.3%', 
    height: 100
  },
  value: {
    paddingBottom: 10
  },
  listItemTitle: {
    paddingBottom: 5
  },

  headerText: {
    fontSize: 20
  },
  label: {
    paddingTop: 15,
    paddingBottom: 5,
    color: '#CACACA'
  },
  description: {
    fontSize: 20
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:70,
    borderRadius:50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }

})
