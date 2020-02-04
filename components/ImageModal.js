import React from 'react';
import { View, TextInput, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'

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
          <TouchableOpacity
            onPress={() => {
              this.props.setModalVisible(!this.props.modalVisible)
            }}>
            <Image style={styles.pic} source={{uri: this.props.image}} />
          </TouchableOpacity>
        </View>
      </Modal>
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
  }
})