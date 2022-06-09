import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FlatList, TextInput } from 'react-native-web'
import { db, auth } from '../firebase/config'
import Post from '../components/Posts/Posts'

class Profile extends Component {
    constructor(props) {
      super(props)
      this.state = {
        users: [],
        posts: []
      }
    }
  componentDidMount() {
    db.collection('users').onSnapshot(
        docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    users: users
                })
            })
        }
    )

    db.collection('posts').onSnapshot(
      docs => {
        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            posts: posts
          })
        })
      }
    )
  }

  render() {
    const { style } = this.props.route.params
    return (
      <View style={style.contenedor}>

        <FlatList
          data={this.state.users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.data.email}</Text>} />
        <Text style={style.h1}>Posteos:</Text>
        <FlatList
          style={style.flatlist}
          data={this.state.posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post style={style} info={item} navigation={this.props.route.params.navigation}/>}
        />
        <TouchableOpacity style={style.botonLogout} onPress={() => props.route.params.onLogout()}>
          <Text style={style.textoLogout}>Press here to logout</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Profile