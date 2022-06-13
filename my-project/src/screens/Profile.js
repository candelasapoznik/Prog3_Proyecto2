import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { db, auth } from '../firebase/config'
import Posts from '../components/Posts/Posts'
import Loader from '../components/Loader';

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
          name: '',
          email: '',
          lastSignInTime: '',
          posts: [],
          loading: true
      }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    posts: posts,
                    loading: false
                })
                })
            }
        )
    }

  render() {
    return(
        <View>
            {
                this.state.loading ?
                <Loader/> :
                <View>
                    <Text style={styles.tittle}>My profile</Text>
                    <Text style={styles.subtittle}> Welcome: {this.props.owner.name}</Text>
                    <Text style={styles.text}> Email: {auth.currentUser.email}</Text>
                    <Text style={styles.element}> Last sign in Time: {this.props.owner.lastSignInTime}</Text>
                    <TouchableOpacity style={styles.touchable} onPress={()=>this.props.route.params.logout()}>
                        <Text style={styles.touchableText}>Logout</Text>
                    </TouchableOpacity>         
                    <Text style={styles.subtittle}>Posts:</Text>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item}) => <Posts style={styles.posts} info={item} navigation={this.props.route.params.navigation.posts}/>}
                    />
                </View>
            }
        </View>  
      )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10
    },
    tittle:{
        fontSize:25,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    subtittle:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    text:{
        fontSize:15,
        marginBottom:10,
    },
    button:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    posts:{
        backgroundColor: '#fffff',
        fontSize:15,
    }
    
});

export default Profile