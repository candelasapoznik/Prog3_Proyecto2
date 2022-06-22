import React, {Component} from 'react';
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
            <Text style={styles.title}>Log In</Text>
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
            <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                <Text style={styles.textButton}>Loguearme</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.buttonText} onPress={()=> this.props.navigation.navigate('Register')}>
            <Text style={styles.text}> ¿No tienes una cuenta? Registrate </Text>
            </TouchableOpacity>    
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        flex:1,
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
    field:{
        padding: 10,
        backgroundColor: 'white',
        marginTop: 30,
        margin: 20,
        borderRadius: 4,
        color: 'black'
    },
    buttonText: {
        color: 'white'
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
    text:{
        color: 'white',
        fontSize:15,
    }  

})

export default Login;