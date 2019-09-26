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

export default class JobsFreelancerScreen extends React.Component {
  static navigationOptions = {
    title: 'Bicos'
  };

  constructor(props){
    super(props);

    this.offers = firebase.firestore().collection('offers')

    this.state = {
      email: '',
      items: [],
      refreshing: true
      
    }

    

    AsyncStorage.getItem('email')
      .then((email) => {
        this.setState({email: email});
        firebase.firestore().collection('offers')
          .where('email','==',email).get()
          .then((querySnapshot) => {
            const job_id = []
            const offers = []
            querySnapshot.forEach((doc) => {
              job_id.push(doc.data().job)
              offers[doc.data().job] = doc.data().value
            })
            console.log()
            this.setState({job_id: job_id})
            this.setState({offers: offers})
          })
          .then(() => {
            firebase.firestore().collection('jobs')
            .where('status', '==', 'Aberto').get()
            .then((querySnapshot) => {
              const items = []
              querySnapshot.forEach((doc) => {
                if(this.state.email !== doc.data().owner){
                  if(this.state.job_id.indexOf(doc.id) == -1){
                    items.push({id: doc.id, data: doc.data(), offer: false}) 
                  }
                  else{
                    items.push({id: doc.id, data: doc.data(), offer: true})  
                  }
                }
              })
              this.setState({items: items})
              this.setState({refreshing: false})
            })
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
                  this.props.navigation.push('JobFreelancerDescription', {item: item, email: this.state.email});
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
                    >R$ {item.data.value}</Text>
                  </Layout>
                  {this.state.offers[item.id] && (
                    <Layout style={styles.listItemHeader}>
                      <Text 
                        style={styles.listItemOffer}
                        category='h6'
                      >{item.offer ? 'Proposta Enviada' : ''}</Text>
                      <Text 
                        style={styles.listItemOffer}
                        category='h6'
                      >{item.offer ? 'R$ ' + this.state.offers[item.id] : ''}</Text>
                    </Layout>
                  )}
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
    firebase.firestore().collection('offers')
      .where('email','==',this.state.email).get()
      .then((querySnapshot) => {
        const job_id = []
        const offers = []
        querySnapshot.forEach((doc) => {
          job_id.push(doc.data().job)
          offers[doc.data().job] = doc.data().value
        })
        console.log()
        this.setState({job_id: job_id})
        this.setState({offers: offers})
      })
      .then(() => {
        firebase.firestore().collection('jobs')
        .where('status', '==', 'Aberto').get()
        .then((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            if(this.state.email !== doc.data().owner){
              if(this.state.job_id.indexOf(doc.id) == -1){
                items.push({id: doc.id, data: doc.data(), offer: false}) 
              }
              else{
                items.push({id: doc.id, data: doc.data(), offer: true})  
              }
            }
          })
          this.setState({items: items})
          this.setState({refreshing: false})
        })
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
  listItemOffer: {
    paddingBottom: 5,
    color: '#47DA69'
  },
  btnNew: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }

});
