import React, { Component } from 'react';
import {StyleSheet,View,TextInput,TouchableOpacity, Text} from 'react-native'
import {auth} from '../firebase/config'


class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            Password:'',
            Register:false,
            error:''
        }}

register(email,pass){
    auth.createUserWithEmailAndPassword(email, pass)
    .then((response)=>{
        console.log('hola')
        this.setState({registered:true});
    })
    .catch((e)=>{
        this.setState({error:'fallo el registro'})
    })
}
render(){
    return(
        <View style={styles.container}>
                <TextInput style={styles.imput}
                    keyboardtype= 'email-address' 
                    placeholder='email'
                    onChangeText={text=> this.setState({email: text})}/>

                <TextInput style={styles.imput}
                    keyboardtype= 'default' 
                    placeholder='User Name' 
                    onChangeText={text=> this.setState({userName: text})}/>

                <TextInput style={styles.imput} 
                    keyboardtype= 'default'
                    placeholder='Password' 
                    secureTextEntry={true} 
                    onChangeText={text=> this.setState({Password: text})}/>

                <TouchableOpacity style={styles.button}
                    onPress={()=> this.register(this.state.email,this.state.Password)}>
                    <Text>Register</Text>
                </TouchableOpacity>
        </View>
    )
}
}
const styles= StyleSheet.create({
    container:{
        padding: 10,
        marginBottom:20,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign: 'center',
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: '#28a745',
        borderStyle: 'solid',


    }
})

export default Register