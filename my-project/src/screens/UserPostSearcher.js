import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
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
            <View style={styles.container}>
            <TextInput style={styles.results}
                    keyboardtype= 'email-address' 
                    placeholder='Buscar usuario' 
                    onChangeText={text=> this.setState({valorFormulario: text})}/>
                <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
                    <Text style={styles.touchableText}>Enviar</Text>
                </TouchableOpacity>
            </View>
            {

            this.state.firstRender ?
            <> </> :
        
            <View style={styles.container}>
            { 
                this.state.postEncontrados.length === 0 ?
                <Text style={styles.text}>El usuario no existe o aún no tiene publicaciones</Text>
                :
                <FlatList style={styles.flatList}
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
const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10,
        backgroundColor:'black',
        margin: 40
    },
    button:{
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#dc3545',
        margin: 20,
    },
    results:{
        padding: 10,
        backgroundColor: 'white',
        marginTop: 30,
        margin: 20,
        borderRadius: 4,
    },
    text:{
        color:'white'
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    flatList:{
        margin: 20,
        flex: 1
    }
});


export default UserPostSearcher;
