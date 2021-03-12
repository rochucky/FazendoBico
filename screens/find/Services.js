import React from 'react';
import { ScrollView, StyleSheet, FlatList, TouchableWithoutFeedback, AsyncStorage, RefreshControl, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {
  Layout,
  Text
} from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Button } from '../../components/CustomComponents'

export default class ServiceScreen extends React.Component {
  static navigationOptions = {
    title: 'Solicitações de Serviço'
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
        firebase.firestore().collection('jobs').where('owner', '==', email).where('status', '==', 'Aberto').get()
        .then((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            firebase.firestore().collection('images').where('job', '==', doc.id).limit(1).get()
              .then((imagesSnapshot) => {
                if(imagesSnapshot.size > 0){
                  imagesSnapshot.forEach((img) => {
                    items.push({id: doc.id, data: doc.data(), thumb: img.data().uri});
                  });
                }
                else{
                  items.push({id: doc.id, data: doc.data(), thumb: ''});
                }
              })
              .then(() => {
                this.setState({items: items})
                this.setState({refreshing: false})
              })
            
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
                  this.props.navigation.push('Service', {item: item});
                }}
              >
                <Layout style={styles.listItem}>
                  {item.thumb !== '' ?
                    (
                      <Layout>
                        <Text 
                          style={styles.listItemTitle}
                          category='h5'
                        >{item.data.title}</Text>
                        <Layout style={styles.thumb}>
                          <Image source={{uri: item.thumb}} style={styles.thumb}/>
                        </Layout>
                        <Layout style={styles.listItemHeader}>
                          <Text 
                            style={styles.listItemTitle}
                            category='h5'
                            >R$ {item.data.value}</Text>
                        </Layout>
                      </Layout>
                    ):(
                        
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
                    )
                  }
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
        <Layout style={styles.buttonContainer}>
          <Button
            text='Criar Solicitação'
            marginBottom={0}
            onPress={() => {
              this.props.navigation.push('NewService');
            }} />
        </Layout>
      </Layout>
    )
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    firebase.firestore().collection('jobs').where('owner', '==', this.state.email).where('status', '==' , 'Aberto').get()
    .then((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        firebase.firestore().collection('images').where('job', '==', doc.id).limit(1).get()
          .then((imagesSnapshot) => {
            if(imagesSnapshot.size > 0){
              imagesSnapshot.forEach((img) => {
                items.push({id: doc.id, data: doc.data(), thumb: img.data().uri});
              });
            }
            else{
              items.push({id: doc.id, data: doc.data(), thumb: ''});
            }
          })
          .then(() => {
            this.setState({items: items})
            this.setState({refreshing: false})
          })
        
      })
      
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listItem: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 2,
    backgroundColor: 'rgba(230, 255, 255, 0.3)'
    
  },
  listItemHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(230, 255, 255, 0.3)'
  },
  listItemTitle: {
    paddingBottom: 5,
    fontWeight: 'bold',
    backgroundColor: 'rgba(230, 255, 255, 0.3)'
  },
  buttonContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  thumb: {
    width: '100%',
    aspectRatio: 3/2
  }

});
