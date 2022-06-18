import React, { Component } from 'react';
import {View, FlatList, StyleSheet, Image } from 'react-native';
//importo db y auth de firebase
import {auth, db} from '../firebase/config' 
import Loader from '../components/Loader';
import UserPostSearcher from './UserPostSearcher'
import Post from '../components/Posts';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            loading: true,
        }
    }
    componentDidMount(){
            db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
                docs =>{
                    let posts = [];
                    docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    this.setState({
                        posteos: posts,
                        loading: false
                    })
                    })
                }
            )

    }
  render() {
    return (
        <View>
            {
                this.state.loading ?
                <Loader/> :
                <View style= {styles.container}>
                    <UserPostSearcher/>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item}) => <Post info={item}/>}
                    
                    />
                </View>
            }

        </View>
    )
  }
};

const styles = StyleSheet.create({
        container:{
            flex:1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderWidth:1,
            borderRadius:5,
            backgroundColor:'#CCAC93',
            paddingVertical:16,
            paddingHorizontal:8,
            marginHorizontal:'auto',
        },
        Flatlist:{
            flex:1
        },
        image: {
            height: 400,
            
        },   
})

export default Home;