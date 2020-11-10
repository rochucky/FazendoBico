import React from 'react';
import { View, TextInput, StyleSheet, Modal, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'

export default class ImageModal extends React.Component {
	
	constructor(props){
		super(props)
		console.log(props);

		this.customStyles = {}

	}

	render() {
		return(
			<Modal
      animationType="fade"
      transparent={true}
      visible={this.props.modalVisible}
      onRequestClose={() => {
        this.props.setModalVisible(!this.props.modalVisible)
      }}>
        <View style={styles.modal}>
            <Image style={styles.pic} source={{uri: this.props.image}} />
            <View style={styles.actionContainer}>

              <TouchableOpacity 
                onPress={() => {
                  this.props.setModalVisible(!this.props.modalVisible)
                }}
                style={styles.action}
              >
                <FontAwesome 
                  size={40}
                  name={'arrow-left'}
                  color="white"
                />
              </TouchableOpacity>
              {
                this.props.deletable &&
                <TouchableOpacity 
                  onPress={this.delete.bind(this)}
                  style={styles.action}
                >
                  <FontAwesome 
                    size={40}
                    name={'trash'}
                    color="white"
                    />
                </TouchableOpacity>
              }
            </View>
          </View>
      </Modal>
		)

  }
  
  delete = async () => {
    Alert.alert(
      'Excluir Imagem?',
      "Deseja realmente excluir esta foto?",
      [
        {
          text: 'Sim',
          onPress: async () => {
            alert('Foi!')
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
  modal: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'rgba(10,10,10,0.7)'
  },
  pic: {
    width: 320,
    height: 320,
  },
  actionContainer: {
    flex: 0,
    flexDirection: 'row'
  },
  action: {
    marginTop: 30,
    marginRight: 50,
    marginLeft: 50
  }
})