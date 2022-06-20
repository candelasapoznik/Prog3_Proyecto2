import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import UserPostSearcher from '../screens/UserPostSearcher'
import {FontAwesome,AntDesign} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function Tabnavigation(props) {
  const {logout} = props.route.params
  
    return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
        <Tab.Screen 
        name='Home' 
        component={Home} 
        options={{ tabBarIcon: ()=> <FontAwesome name="home" size={24} color="black" />}}
         />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        options={{ tabBarIcon: ()=> <FontAwesome name="user" size={24} color="black" />}}
        initialParams={{
            logout: () => logout()
        }}
        />
        
    <Tab.Screen
     name='NewPost'
     component={NewPost}
     options={{ tabBarIcon: ()=> <FontAwesome name="plus" size={24} color="black" />}}

    //  initialParams={} 
    />
    <Tab.Screen 
      name='Searcher' 
      component={UserPostSearcher} 
      options={{ tabBarIcon: ()=> <AntDesign name="search1" size={24} color="black" />}}
    />
    </Tab.Navigator>
    )}

