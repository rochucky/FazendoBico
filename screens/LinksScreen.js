import React from 'react';
import { ScrollView, StyleSheet, SectionList, Text, Touchable, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SectionList
        renderItem={({item, index, section}) => 
          <View style={styles.listItem}>
            <Text key={index}>{index}: {item}</Text>
           </View>
        }
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.listItemHeader}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
        sections={[
          {title: 'Bico 1', data: ['item1', 'item2']},
          {title: 'Bico 2', data: ['item3', 'item4']},
          {title: 'Bico 3', data: ['item5', 'item6']},
        ]}
        keyExtractor={(item, index) => item + index}
      />
    );
    // return(
    //   <ScrollView>
        
    //   </ScrollView>

    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listItemHeader: {
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderTopWidth: 2,
    borderColor: '#EDEDED'
  },
  listItem: {
    paddingLeft: 10,
    
  },
  headerText: {
    fontSize: 20
  }

});
