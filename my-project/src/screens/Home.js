import React, { Component } from 'react';
import {View, Flatlist, StyleSheet, Image } from 'react-native';
//importo db y auth de firebase
import {auth, db} from '../Firebase/Config' 
import Loader from '../components/Loader';


class Home extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
            loading: true
        }
    }
    componentDidMount(){
            db.collection('posts').onSnapshot(
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
                <View>
                    <FlatList
                        data={this.state.data}
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
    
})

export default Home;