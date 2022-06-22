import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { auth, db } from '../Firebase/config'
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
      postDescription: this.state.caption,
      photo: this.state.photo,
      likes: [], //Para lograr controlar los Likes
      comments: [], //Para lograr almacenar los comentarios
    })
    .then(() => {this.props.navigation.navigate('Home')})
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

          <MyCamera cuandoSubaLaFoto={(url)=>this.cuandoSubaLaFoto(url)} />

          :

          <View style={styles.container}>
            <Text style={styles.title}>¿Qué vas a publicar hoy?</Text>
            <Image source={{ uri: this.state.photo }} style={styles.image} />
              <TextInput 
                  style={styles.field}
                  keyboardType= 'default'
                  placeholder='caption'
                  onChangeText={text => this.setState({caption: text})}
              />
              <TouchableOpacity style={styles.button} onPress={ ()=> this.submit() } >
                  <Text style={styles.textButton}>Agregar posteo</Text>
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
      marginTop: 10,
      backgroundColor: "black",
      flex: 1
  },
  title:{
    fontSize:25,
    marginTop:20,
    marginBottom:30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  button:{
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#dc3545',
    margin: 20
},
  field:{
      borderColor: '#dcdcdc',
      borderWidth: 1,
      borderRadius: 2,
      padding:3,
      marginBottom:8,
      color: 'white'

  },
  textButton:{
    fontWeight: 'bold',
    color:'#fff',
    textAlign: 'center'
}    
})

export default NewPost;

