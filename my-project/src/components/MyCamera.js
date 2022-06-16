import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {Camera} from 'expo-camera'
import { storage } from '../firebase/config'
class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state={
            permission: false,
            photo:'',
            showCamera: true,
            urlFoto: ''
        }
        
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
                this.setState({urlFoto:''})
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
                        <TouchableOpacity onPress={()=> this.SavePhoto()}>
                            <Text>
                                Aceptar
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=> this.descartarFoto()}>
                            <Text>
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
                        <Text>Sacar foto</Text>
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
        flex:1
    },
    camera: {
        flex: 1
    }
})

export default MyCamera