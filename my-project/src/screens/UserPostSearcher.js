import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native'
import { db } from '../Firebase/config'
import Post from '../components/Posts'

class UserPostSearcher extends Component {
    constructor(props){
        super(props)
        this.state={
            valorFormulario: '',
            postEncontrados:[],
            firstRender: true
        }
    }
    onSubmit(){
        console.log(this.state.valorFormulario)
        db.collection('posts').where('email', '==', this.state.valorFormulario).onSnapshot(
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
                    keyboardtype= 'email-address' 
                    placeholder='Buscar usuario' 
                    onChangeText={text=> this.setState({valorFormulario: text})}/>
                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
            {

            this.state.firstRender ?
            <> </> :
        
            <View>
            { 
                this.state.postEncontrados.length === 0 ?
                <Text>El usuario no existe o aún no tiene publicaciones</Text>
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
