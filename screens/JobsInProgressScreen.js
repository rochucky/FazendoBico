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

export default class JobsInProgressScreen extends React.Component {
  static navigationOptions = {
    title: 'Bicos'
  };

  constructor(props){
    super(props);

    this.state = {
      email: '',
      items: [],
      refreshing: true
      
    }

    

    AsyncStorage.getItem('email')
      .then((email) => {
        this.setState({email: email});
        firebase.firestore().collection('jobs').where('owner', '==', email).where('status', '==', 'Em Andamento').get()
        .then((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
              items.push({id: doc.id, data: doc.data()})
          })
          this.setState({items: items})
          this.setState({refreshing: false})
        })

      })
  }

  componentDidMount() {
    
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
        this._onRefresh();
    });
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
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
                  this.props.navigation.push('JobDescription', {item: item});
                }}
              >
                <Layout style={styles.listItem}>
                  <Layout style={styles.listItemHeader}>
                  <Text 
                    style={styles.listItemTitle}
                    category='h5'
                  >{item.data.title}</Text>
                  <Text 
                    style={styles.listItemTitle}
                    category='h5'
                  >{item.data.value}</Text>
                  </Layout>
                  <Text style={styles.listItemDescription}>{item.data.description}</Text>
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
      </Layout>
    )
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    firebase.firestore().collection('jobs').where('owner', '==', this.state.email).where('status', '==', 'Em Andamento').get()
    .then((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
          items.push({id: doc.id, data: doc.data()})
      })
      this.setState({items: items});
      this.setState({refreshing: false});
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    
    marginRight: 15,
    marginLeft: 15,
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
