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
                <Text style={styles.title}> Register </Text>
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
        flex:1,
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        borderWidth:1,
        backgroundColor:'black',
    },
    title:{
        fontSize:25,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    imput: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 30,
        margin: 20,
        borderRadius: 4,
        color: 'black'
    },
    button:{
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#dc3545',
        margin: 20
    }, 
    textButton:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    error: {
        color:'red'
    }
})

export default Register;