import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, AsyncStorage, Picker, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import NavigationService from '../../navigation/NavigationService';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { FontAwesome } from '@expo/vector-icons';

import {
	Text,
  Input
} from 'react-native-ui-kitten';

import { Button } from '../../components/CustomComponents';

export default class ProfileEdit extends React.Component {

  static navigationOptions = {
    title: 'Editar Perfil'
  }

  constructor(props){
    super(props)

    this.state = {
      name: '',
      type: '',
      id: '',
      image: '',
      email: '',
      imgRef: '',
      oldImage: '',
      proofession: '',
      professionsArray: [],
      modalVisible: false,
      loading: true,
      saving: false
    }

    this.type_alias = {
      'freelancer': 'Freelancer',
      'cliente': 'Cliente'
    };
    
    AsyncStorage.multiGet(['name','type','id', 'image', 'email', 'profession'])
      .then( async (items) => {
        await this.setState({name: items[0][1]})
        await this.setState({type: items[1][1]})
        await this.setState({id: items[2][1]})
        await this.setState({image: items[3][1]})
        await this.setState({oldImage: items[3][1]})
        await this.setState({email: items[4][1]})
        await this.setState({profession: items[5][1]})
        // await this.setState({loading: false})
      })
      .then( async () => {
        this.user = firebase.firestore().collection('users').doc(this.state.id)
        await firebase.firestore().collection('professions').get()
          .then(querySnapshot => {
            var professions = []
            querySnapshot.forEach(doc => {
              professions.push({id: doc.id, ...doc.data()})
            })
            this.setState({professionsArray: professions, loading: false});
          })
      })
      .catch((err) => {
        console.log(err);
        alert("Erro AS100");
      })

  }

  render(){
    if(this.state.loading == true){
      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else{
      return(
        <KeyboardAvoidingView style={styles.container}>
          <TouchableOpacity style={styles.imageContainer} onPress={this.changeImage.bind(this)}>
            {this.state.image == '' ?
              (
                <View style={styles.thumb}>               
                  <FontAwesome 
                    size={150}
                    name={'user-circle'}
                    color="gray"
                  />
              </View>
              ):
              (
                <Image style={styles.thumb} source={{uri: this.state.image}} />
              )
            }
            <Text>Toque na imagem para alterar</Text>
          </TouchableOpacity>
          <Input 
            label="Nome Completo"
            onChangeText={(text) => this.setState({name: text})} 
            value={this.state.name}
            multiline
          />
          <Input 
            label="Email"
            onChangeText={(text) => this.setState({email: text})} 
            value={this.state.email}
            multiline
          />
          <Text
            style={styles.label}
            category='p2'
          >Profissão
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.profession}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({profession: itemValue})
              }>
              <Picker.Item label="" value="" />
              {this.state.professionsArray.map((item,index) => {
                return <Picker.Item label={item.name} value={item.name} key={item.id} />
              })}
            </Picker>
          </View>
          {this.state.saving == true ?
            (
              <View>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ):
            (
              <Button 
                text="Gravar"
                onPress={this.save.bind(this)}
              />

            )
          }
        </KeyboardAvoidingView>
      )
    }
  }

  changeImage = async () => {
    if(!this.getPermissionAsync()){
      alert('É preciso dar permissão para utilização da Câmera')
      return false
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
      quality: 0.7,
    })
    if(!result.cancelled){
      this.state.imgRef = await fetch(result.uri);
      this.setState({oldImage: this.state.image, image: result.uri});
    }
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

  save(){
    Alert.alert(
      'Gravar',
      'Deseja gravar as alterações?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            this.setState({saving: true});
            if(this.state.image !== this.state.oldImage){
              let blob = await this.state.imgRef.blob()
              let date = new Date()
              let filename = this.state.id + '_' + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + '.jpg'
              await firebase.storage().ref().child(filename).put(blob)
                .then( async (snap) => {
                  var url = await snap.ref.getDownloadURL();
                  try{
                    await this.setState({image: url}, () => {
                      this.user.update({
                        name: this.state.name,
                        email: this.state.email,
                        profession: this.state.profession,
                        image: this.state.image
                      })
                      .then( async () => {
                        let fileRef = firebase.storage().refFromURL(this.state.oldImage)
                        await fileRef.delete()
                          .then(() => {
                            NavigationService.navigate('Login');
                          })
                          .catch(err => {
                            alert('Falha ao excluir arquivo antigo');
                          })
                      })
                      .catch((err) => {
                        alert('Erro');
                        console.log(err);
                      })
                    })
                  }
                  catch(err){
                    alert('Erro 2');
                    console.log(err);
                  }

                })
                .then(() => {
                 
                })
            }
            else{
              this.user.update({
                name: this.state.name,
                email: this.state.email,
                profession: this.state.profession,
                image: this.state.image
              })
              .then(() => {
                NavigationService.navigate('Login')
              })
            }
            
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 15,
    paddingLeft: 15

  },
	pickerContainer: {
		width: '100%',
		backgroundColor: '#f7f9fc',
		borderColor: '#edf1f7',
		borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
	},
	picker: {
		width: '100%'
	},
	label: {
		color: '#8f9bb3',
		marginBottom: 5
  },
  thumb: {
    marginTop: 10,
    marginBottom: 5,
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  imageContainer: {
    width: '100%',
    alignItems: "center",
    marginBottom: 20
  }
})