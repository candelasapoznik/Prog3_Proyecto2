import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {Camera} from 'expo-camera'
import { storage } from '../Firebase/config'

class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state={
            permission: false,
            photo:'',
            showCamera: true,
            urlFoto: ''
        }
    this.metodosDeCamara = undefined
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
      .then(()=>{
           this.setState({
            permission: true,
            urlFoto:''
           })
      })
      .catch( e => console.log(e))          
  }

  takePicture(){
      this.metodosDeCamara.takePictureAsync()
      .then(photo=>{
        this.setState({
            urlFoto: photo.uri,
            showCamera:false
    })
})
.catch(error => console.log(error))
}

  SavePhoto(){
    fetch(this.state.urlFoto)
    .then(response => {
        // console.log(response)    
        return response.blob()
    })
    .then(foto => {
        // console.log(foto)
        const referenciaDelStorage = storage.ref(`photos/${Date.now()}.jpg`)
        // console.log(referenciaDelStorage)

        referenciaDelStorage.put(foto)
        .then(()=>{
            referenciaDelStorage.getDownloadURL()
            .then( url => {
                console.log(url)
                this.props.cuandoSubaLaFoto(url);
            })
        })
    })
    .catch(error => console.log(error))
}
  

  descartarFoto(){
    this.setState({
        urlFoto: '',
        showCamera:true
    })
    //Aqui cambiar el estado de la urlFoto a '' y mostrarCamara a true
}
  render(){
      return(
      <View style={styles.container}>
        {
            this.state.permission ?
                this.state.showCamera === false ?
                <>
                    <Text>Aqui vamos a renderizar la imagen</Text>
                    <Image
                    style={styles.camera}
                    source={{uri: this.state.urlFoto}}
                    />
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={()=> this.SavePhoto()}>
                            <Text style={styles.textButton}>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.button} onPress={()=> this.descartarFoto()}>
                            <Text style={styles.textButton}>
                                Rechazar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>

                :
                <View style={styles.container}>
                    <Camera
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                        ref={ metodos => this.metodosDeCamara = metodos}
                    />
                    <TouchableOpacity style={styles.button} onPress = {()=> this.takePicture()}>
                        <Text style={styles.textButton}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
            :

            <Text>No tienes permisos para usar la Cámara</Text>
        }
        </View>
    )
        
  }
}
const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        marginTop: 10,
        backgroundColor: "black"
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
      margin: 10
    },
    textButton:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    camera: {
        flex: 1
    }
})

export default MyCamera