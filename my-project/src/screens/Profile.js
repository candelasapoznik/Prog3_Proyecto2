import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native'
import { db, auth } from '../Firebase/config'
import Posts from '../components/Posts'
import Loader from '../components/Loader';

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
          posts: [],
          loading: true
      }
    }

    componentDidMount(){
        db.collection('posts').where('email', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }
        )
    }

    // deletePost(){
    //     db.collection('posts').where('owner','==',auth.currentUser.email)
    //     .onSnapshot(
    //         docs => {
    //           docs.forEach( doc => {
    //             doc.ref.delete()
    //           })
    //           this.setState({
    //               display:false,
    //           })
    //         }
    //       ) 
    
    // }

  render() {
    return(
        <View>
            {
                this.state.loading ?
                <Loader/> :
                <View style={styles.container}>
                    <Text style={styles.tittle}>My profile</Text>
                    <Text style={styles.subtittle}> Welcome: {auth.currentUser.userName}</Text>
                    <Text style={styles.text}> Email: {auth.currentUser.email}</Text>
                    <Text style={styles.element}> Last sign in Time: {auth.currentUser.metadata.lastSignInTime}</Text>
                    <Text style={styles.subtittle}>Posts:</Text>
                    <FlatList style={styles.flatList}
                        data={this.state.posts}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item}) => <Posts info={item} navigation={this.props.route.params.navigation}/>}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.route.params.logout()}>
                        <Text style={styles.touchableText}>Logout</Text>
                    </TouchableOpacity>         
                </View>
            }
        </View>  
      )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
    
    },
    tittle:{
        fontSize:25,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    subtittle:{
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold',
        color: 'white'

    },
    text:{
        fontSize:15,
        marginBottom:10,
        color: 'white'
    },
    button:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
        color: 'white'
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    posts:{
        backgroundColor: '#fffff',
        fontSize:15,
    },
    flatList:{
        flex:1,
        margin: 40,
    }
    
});

export default Profile