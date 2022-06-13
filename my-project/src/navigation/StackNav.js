import React, {Component} from 'react'
import { auth, db } from '../firebase/config';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register"
import Home from "../screens/Home"
import Comments from '../screens/Comments';
<<<<<<< HEAD

const Stack= createNativeStackNavigator();
=======
import TabNavigation from './TabNav';
const stack= createNativeStackNavigator();
>>>>>>> 15a061356be554c1a3d73cb83d3384fceddbcca3

class StackNav extends Component {

    constructor(props){
        super(props)
        this.state={
            logueado: false,
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({logueado: true})
            }
        })
    }
    
    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
            .then( response => this.setState({logueado: true}))
            .catch( error => console.log(error))
    }

    register(mail, pass){
        auth.createUserWithEmailAndPassword(mail, pass)
        .then(() => db.collection('users').add({
            email: email,
            userName: userName,
            createdAt: Date.now(),
        }).catch(error => console.log(error)))
            .then( response => this.setState({logueado: true}))
            .catch( error => console.log(error))
    }

    logout(){ 
        auth.signOut()
        .then(() => this.setState({logueado: false}))
    }
    newPosts(post){
        db.collection('posts').add({
            email:auth.currentUser.email,
            createdAt: Date.now(),
            post:post,
            likes:[],
            postDescription:[]
        })
        .then(response => console.log(response))
        .catch(error => console.log(error.post))
    }
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                    this.state.logueado ?
                    <Stack.Screen 
                        name='TabNavigation'
                        component ={ TabNavigation }
                        options = {{headerShown: false}}
                        initialParams = {{logout : (mail, pass) => this.logout(mail, pass)}}
                    />
                    :
                    <Stack.Group>
                        <Stack.Screen 
                            name='Login'
                            component = { Login }
                            options = {{headerShown: false}}
                            initialParams = {{login : (mail, pass) => this.login(mail, pass)}}
                        />
                        <Stack.Screen 
                            name='Register'
                            component = { Register }
                            options = {{headerShown: false}}
                            initialParams = {{register : (mail, pass) => this.register(mail, pass)}}
                        />
                        <Stack.Screen
                                name='Comment'
                                component={Comment}
                                initialParams={{
                                    newComment: (comment)=> this.Comment(comment)                                    
                                }}
                            />              
                    </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default StackNav 