import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      wordSearched : '',
      wordReturned : '',
      isSearchPressed: false,
      lexicalCategory: '',
      definition: '',
    };
  }
  getWord = (text) => {
    var text = text.toLowerCase()
    try{
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" : definition,
      })

    }
  
  catch(err){
    alert("This word is not available now");
    this.setState({
      'text' : '',
      'isSearchPressed' : false,
    })
  }
}
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
            Speech.speak(this.state.word)
          }}>
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.speechButton}
                          onPress = {()=>{
                           Speech.speak(this.state.word)
                          }}>
              <Text style = {styles.text}>Tap To Hear Pronunciation</Text>
        </TouchableOpacity>

        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.isSearchPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word : </Text>
                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type : </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition : </Text>
                <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'black',

    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontStyle: 'bold',
    textAlign: 'center',
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsTitle: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speechButton : {
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'black',
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,

  }
});
export default HomeScreen;