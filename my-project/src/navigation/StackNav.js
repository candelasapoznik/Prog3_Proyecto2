import React, {Component} from 'react'
import { auth, db } from '../firebase/config';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register"
import Home from "../screens/Home"
import Comments from '../screens/Comments';
import TabNavigation from './TabNav';
const stack= createNativeStackNavigator();

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
    newPosts(post, urlfoto){
        db.collection('posts').add({
            email:auth.currentUser.email,
            createdAt: Date.now(),
            post:post,
            likes:[],
            postDescription:[],
            foto: urlfoto
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
                    <stack.Group>
                    <Stack.Screen 
                        name='TabNavigation'
                        component ={ TabNavigation }
                        options = {{headerShown: false}}
                        initialParams = {{logout : (mail, pass) => this.logout(mail, pass)}}
                    />
                    <stack.Screen
                        name='NewPost'
                        component={NewPost}
                        initialParams={
                            {NewPost: (post,urlfoto)=>this.NewPost(post,urlfoto)}
                        }
                    />
                    <Stack.Screen
                        name='Comment'
                        component={Comment}
                        initialParams={{
                            newComment: (comment)=> this.Comment(comment)                                    
                        }}
                    />     

                    </stack.Group>
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
                    </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default StackNav 