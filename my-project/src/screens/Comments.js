import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

 class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            newComment: '',
            error: ''
        }
    }
    componentDidMount() {
        const idDoc = this.props.route.params.id
        db.collection('posts').doc(idDoc).onSnapshot(
            (doc) => {
                this.setState({
                    comments: doc.data().comments
                })
            }

        )
    }
    onSubmit(comment) {
        const comment = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: comment
        }
        if (text.length === 0) {
            this.setState({ error: 'el comentario no puede estar vacio' })
            return false
        }
        db.collection('posts').doc(this.props.route.params.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
            .then((response) => this.setState({ newComment: '' }))
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.comments}
                    keyExtractor={(item) => item.createdAt.toString()}
                    renderItem={({ item }) => <Text>{item.desc}</Text>}

                />
                <View>
                    <TextInput
                        placeholder='Agrega tu comentario'
                        value={this.state.newComment}
                        keyboardType='default'
                        onChangeText={(text) => this.setState({ newComment: comment })}
                    />
                    <TouchableOpacity onPress={() => this.onSubmit(this.state.newComment)}>
                        <Text> COMENTAR </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Comments