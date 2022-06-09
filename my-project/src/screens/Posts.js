import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-web'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../../firebase/config'
import firebase from 'firebase'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantityLikes: 0,
            like: false,
            arrayLikes: [],
            arrayComments: [],
        }
    }
    componentDidMount(){
        const documento = this.props.info.data
        const likeVerification = documento.likes.includes(auth.currentUser.email)

        if (documento.likes) {
            this.setState({
              quantityLikes: documento.likes.length
            })
        }

        if (likeVerification) {
            this.setState({
              like: true
            })
        }
    }

    like(){
        const documento = this.props.info
        db.collection('posts').doc(documento.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
              like: true,
              quantityLikes: this.state.quantityLikes + 1
            })
        })
        .catch((error)=> console.log(error))
    }

    unlike(){
        this.setState({
          like: false,
          quantityLikes: this.state.quantityLikes - 1
        })
    }

    render() {
        const { style, info } = this.props
        return (
            <View style={style.post}>
                <Text>{info.data.description}</Text>
                <View style={style.divLikes}>
                    <Text>{this.state.quantityLikes}</Text>
                    {
                        this.state.like
                            ?

                            <TouchableOpacity onPress={() => this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red' />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' />
                            </TouchableOpacity>

                    }
                </View>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comments',{id: this.props.info.id})}>
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Posts