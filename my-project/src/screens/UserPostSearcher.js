import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../Firebase/Config'


class UserPostSearcher extends Component {
    constructor(props){
        super(props)
        this.state={
            valorFormulario: '',
            postEncontrados:[]
        }
    }
    onSubmit(datoFormulario){
        db.collection('posts').where('owner', '==', datoFormulario).onSnapshot((docs)=>{
            let arrayDocs=[]
            docs.forEach((doc) => {
                arrayDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({postEncontrados:arrayDocs})
        })
    }
  render() {
    return (
        <View>
            <View>
                <TextInput 
                placeholder='Escribe aquí el usuario'
                onChangeText={ text => this.setState({valorFomulario:text})} />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.valorFormulario)}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList>

                </FlatList>
            </View>
        </View>
    )
  }
}

export default UserPostSearcher;
