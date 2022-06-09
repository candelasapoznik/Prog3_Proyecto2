import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../../../src/screens/Home/Home'
import Login from '../../../src/screens/Login/Login'
import Register from '../../../src/screens/Register/Register'

const tab = createBottomTabNavigator()
class TavNav extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
render(){
    return(
             <NavigationContainer>
               <Tab.Navigator>

                    <Tab.Screen 
                        name='Login' 
                        component={ Login }
                        options={
                            { tabBarIcon: () => <Entypo name="login" size={24} color="black" /> }
                        }/>

                    <Tab.Screen 
                        name='Register' 
                        component={ Register }
                        options={
                            { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }
                        }/>

                    <Tab.Screen 
                        name='Home' 
                        component={ Home }
                        options={
                            { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
                        }/>
                    <Tab.Screen 
                        name='Post' 
                        component={ Post }
                        options={
                            { tabBarIcon: () => <Entypo name="Post" size={24} color="black" /> }
                        }/></Tab.Navigator>

               </Tab.Navigator>
           </NavigationContainer> 
    )
}
}
export default TavNav;