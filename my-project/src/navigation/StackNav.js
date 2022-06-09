import React, {Component} from 'react'
import { auth, db } from '../firebase/config';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabNavigation from './TabNavigation';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator()

class StackNavigation extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    

    componentDidMount(){
        
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                            <Stack.Screen
                                name='Comment'
                                component={Comment}
                                initialParams={{
                                    newComment: (comment)=> this.Comment(comment)                                    
                                }}
                            />                        
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
};

export default StackNavigation;