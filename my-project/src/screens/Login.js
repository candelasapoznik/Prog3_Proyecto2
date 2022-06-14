import React, {Component} from 'react';
import {auth} from '../firebase/config'
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from 'react-native';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }

render(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Logueo</Text>
            <TextInput 
                style={styles.field}
                keyboardType='default'
                placeholder='Email'
                onChangeText={text => this.setState({ email: text})}
            />
            <TextInput 
                style={styles.field}
                keyboardType='default'
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text})}
            />
            <TouchableOpacity onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                <Text>Loguearme</Text>
            </TouchableOpacity>   
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
            <Text> ¿No tienes una cuenta? Registrate </Text>
            </TouchableOpacity>    
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    }
})

export default Login;