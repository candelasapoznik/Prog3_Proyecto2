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
    componentDidMount(){
        
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
                keyboardType='email-adress'
                placeholder='Escribe aquí el usuario'
                onChangeText={ text => this.setState({valorFomulario:text})} />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.valorFormulario)}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        
            <View>
            { 
                this.postEncontrados.lenght == 0 ?
                'El usuario no existe o aún no tiene publicaciones'
                :
                <FlatList 
                    data={ this.state.postEncontrados }
                    keyExtractor={ item => item.id.toString()}
                    renderItem={({item}) => <Post info={item}/>}
                />
            }
            </View>
           
        </View>
    )
  }
}

export default UserPostSearcher;
