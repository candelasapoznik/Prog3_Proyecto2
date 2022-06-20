import React, { Component } from 'react';
import {StyleSheet,View,TextInput,TouchableOpacity, Text} from 'react-native'



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
                
                <Text style={styles.error}>{this.props.error}</ Text>
    
                <TouchableOpacity style={styles.button}
                    onPress={()=> this.props.route.params.register(this.state.email,this.state.Password, this.state.userName)}>
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>
        </View>
    )
}
}
const styles= StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        padding:'3rem',
        minHeight:'100vh',
        marginBottom:20,
    },
    imput: {
        height:20,
        padding:'1.4rem',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#2b1e49',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        marginTop:'2rem',
        marginBottom:'1.4rem',
        borderRadius:4, 
        fontSize:'1rem',
        boxShadow:'0px 6px 16px 0px rgba(0,0,0,0.37);',
        borderBottomWidth: 1,        
        borderStyle: 'solid',
    }, 
    textButton:{
        color: '#fff'
    },
    error: {
        color:'red'
    }
})

export default Register