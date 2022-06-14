import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera'
class NewPost extends Component {
  constructor(props){
    super(props)
    this.state ={
      caption: '',
      photo: "",
      showCamera: true,

    }
  }
  submit(){
    //llamo a db y accedo a su método collection donde le paso el string de post. uso el método add que recibe
    db.collection("posts").add({
      email:auth.currentUser.email,
      createdAt: Date.now(),
      postDecription: this.state.caption,
      photo: this.state.photo,
      likes: [], //Para lograr controlar los Likes
      comments: [], //Para lograr almacenar los comentarios
    })
    .then()
    .catch(e => console.log(e))
  }
  cuandoSubaLaFoto(url){
    this.setState({
      photo: url,
      showCamera: false
    })
  }
  render() {
    return (
      <>
        {
          this.state.showCamera ?

          <MyCamera onImageUpload={(URL)=>this.cuandoSubaLaFoto(URL)} />

          :

          <View style={styles.container}>
            <Text style={styles.titulo}>¿Qué vas a publicar hoy?</Text>
            <Image source={{ uri: this.state.photo }} style={styles.image} />
              <Text>Agregar posteo</Text>
              <TextInput 
                  style={styles.field}
                  keyboardType= 'default'
                  placeholder='Caption'
                  onChangeText={text => this.setState({caption: text})}
              />
              <TouchableOpacity OnPress={ ()=> this.submit() } >
                  <Text>Enviar</Text>
              </TouchableOpacity>
          </View>
        }
      </>
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

