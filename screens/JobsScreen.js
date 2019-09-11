import React from 'react';
import { ScrollView, StyleSheet, FlatList, TouchableWithoutFeedback, AsyncStorage, RefreshControl } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {
  Layout,
  Text,
  Button
} from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class JobsScreen extends React.Component {
  static navigationOptions = {
    title: 'Meus Bicos'
  };

  constructor(props){
    super(props);

    this.state = {
      email: '',
      items: [],
      refreshing: false
      
    }

    

    AsyncStorage.getItem('email')
      .then((email) => {
        this.setState({email: email});
        firebase.firestore().collection('jobs').where('owner', '==', email).get()
        .then((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
              items.push(doc.data());
          })
          this.setState({items: items});
        })

      })
  }

  render() {
    return (
      <Layout style={styles.container}>
        <FlatList 
          style={styles.list}
          data={this.state.items}
          renderItem={({ item }) => {
            return(
              <TouchableWithoutFeedback
                onPress={() => {
                  alert(item.name);
                }}
              >
                <Layout 
                  style={styles.listItem}
                  onPress={() => {
                    alert(item.name);
                  }}
                >
                  <Layout style={styles.listItemHeader}>
                  <Text 
                    style={styles.listItemTitle}
                    category='h5'
                  >{item.title}</Text>
                  <Text 
                    style={styles.listItemTitle}
                    category='h5'
                  >{item.value}</Text>
                  </Layout>
                  <Text style={styles.listItemDescription}>{item.description}</Text>
                </Layout>
              </TouchableWithoutFeedback>
            )

          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
        <Button
          status='info'
          size='large'
          onPress={() => {
            this.props.navigation.push('NewJobScreen');
          }}>
          Criar
        </Button>
      </Layout>
    )
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    AsyncStorage.getItem('email')
      .then((email) => {
        this.setState({email: email});
        firebase.firestore().collection('jobs').where('owner', '==', email).get()
        .then((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
              items.push(doc.data());
          })
          this.setState({items: items});
          this.setState({refreshing: false});
        })

      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  list: {
    marginRight: 15,
    marginLeft: 15
  },
  listItem: {

    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
    
  },
  listItemHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    paddingBottom: 5
  },
  btnNew: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }

});
