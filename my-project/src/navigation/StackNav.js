import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register"
import Home from "../screens/Home"
const stack= createNativeStackNavigator();
import { auth } from "../Firebase/config";

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
            .then( response => this.setState({logueado: true}))
            .catch( error => console.log(error))
    }

    logout(){ 
        auth.signOut()
        .then(() => this.setState({logueado: false}))
    }
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    {
                    this.state.logueado ?
                    <Stack.Screen 
                        name='Home'
                        component ={ Home }
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
                    </Stack.Group>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default StackNav