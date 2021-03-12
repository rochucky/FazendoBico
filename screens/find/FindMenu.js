import React, { Component } from 'react';
import {
  Layout,
  Input,
  Button
} from 'react-native-ui-kitten';
import { StyleSheet, TouchableOpacity, Text, View, AsyncStorage } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

import Colors from '../../constants/Colors';

export default class FindMenu extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
         title: 'Procurar'
    }
  }

  constructor(props){
    super(props);

    this.state = {};
    

  }

  render() {
    return (
        <Layout style={styles.container}>
          <Text style={{backgroundColor: Colors.secondary}}>O que você deseja Buscar?</Text>
          <TouchableOpacity key={1} onPress={this.select.bind(this, 'ServiceScreen')} style={styles.option}>
            <Layout style={styles.optionContainer}>
              <Text style={styles.optionText}>Serviço</Text>
              <FontAwesome name="arrow-right" size={40} color={Colors.primary} style={styles.optionIcon}/>
            </Layout>
            <Text>Ex.: Pedreiro, Pintor, Garçom...</Text>
          </TouchableOpacity>
          <TouchableOpacity key={2} onPress={this.select.bind(this, 'OfferProduto')} style={styles.option}>
            <Layout style={styles.optionContainer}>
              <Text style={styles.optionText}>Produto</Text>
              <FontAwesome name="arrow-right" size={40} color={Colors.primary} style={styles.optionIcon}/>
            </Layout>
            <Text>Ex.: Refrigerante, Coxinha, Pipoca...</Text>
          </TouchableOpacity>
        </Layout>
    )
  }

  select(screen) {
    this.props.navigation.push(screen);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  option: {
    height: 60,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  optionText:{
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  optionIcon: {
    position: 'absolute',
    right: 0
    
  },
  label: {
    backgroundColor: Colors.secondary
  }

});