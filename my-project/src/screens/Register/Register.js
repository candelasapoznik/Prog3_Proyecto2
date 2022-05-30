import React, { Component } from 'react';
import {StyleSheet,View,TextInput,TouchableOpacity} from 'react-native'
import {auth} from '../../Firebase/config'

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
                    placeholder='userName' 
                    onChangeText={text=> this.setState({userName: text})}/>

                <TextInput style={styles.imput} 
                    keyboardtype= 'default'
                    placeholder='password' 
                    securityTextEntry={true} 
                    onChangeText={text=> this.setState({Password: text})}/>

                <TouchableOpacity style={styles.botton}
                    onpress={()=> this.onSubmit(this.state.email,this.state.Password)}>
                    <text>Login</text>
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
    botton:{
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