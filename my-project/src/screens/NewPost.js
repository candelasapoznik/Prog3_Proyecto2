import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { auth, db } from '../firebase/config'

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state ={
      caption: '',

    }
  }
  Submit(caption){
    //llamo a db y accedo a su método collection donde le paso el string de post. uso el método add que recibe
    db.collection("Posts").add({
      owner:auth.currentUser.email,
      createdAt: Date.now(),
      postDecription: caption
    })
    .then()
    .catch(e => console.log(e))
  }
  render() {
    return (
      <View style={styles.container}>
          <Text>Agregar posteo</Text>
          <TextInput 
              style={styles.field}
              keyboardType= 'default'
              placeholder='Caption'
              onChangeText={text => this.setState({caption:text})}
          />
          <TouchableOpacity OnPress={ ()=> this.Submit(this.state.caption) } >  //le paso el this.state.caption que luego va a pasar como parámetro en el método submit
              <Text>Enviar</Text>
          </TouchableOpacity>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      paddingHorizontal:10,
      marginTop: 10
  },
  title:{
      marginBottom:20
  },
  field:{
      borderColor: '#dcdcdc',
      borderWidth: 1,
      borderRadius: 2,
      padding:3,
      marginBottom:8

  }
})

export default NewPost;

