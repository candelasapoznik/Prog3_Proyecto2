import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../Firebase/config'


class UserPostSearcher extends Component {
    constructor(props){
        super(props)
        this.state={
            valorFormulario: '',
            postEncontrados:[],
            firstRender: true
        }
    }
    onSubmit(datoFormulario){
        db.collection('posts').where('owner', '==', datoFormulario).onSnapshot(
            (docs)=>{
                let arrayDocs=[]
                docs.forEach((doc) => {
                    arrayDocs.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({postEncontrados:arrayDocs, firstRender:false})
        })
    }
  render() {
    return (
        <View>
            <View>
                <TextInput 
                keyboardType='email-adress'
                placeholder='Escribe aquí el usuario'
                onChangeText={ text => this.setState({valorFomulario:text})} />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.valorFormulario)}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
            {

            this.firstRender ?
            <> </> :
        
            <View>
            { 
                this.postEncontrados.lenght == 0 ?
                'El usuario no existe o aún no tiene publicaciones'
                :
                <FlatList 
                    data={ this.state.postEncontrados }
                    renderItem={({item}) => <Post info={item}/>}
                    keyExtractor={ item => item.id.toString()}
                />
            }
            </View>
           }
        </View>
    )
  }
}

export default UserPostSearcher;
