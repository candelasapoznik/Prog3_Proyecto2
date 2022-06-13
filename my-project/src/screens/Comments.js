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
        const id = this.props.route.params.id
        db.collection('posts').doc(id).onSnapshot(
            (doc) => {
                this.setState({
                    comments: doc.data().comments
                })
            }

        )
    }
    onSubmit(comentario) {
        const comment = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: comentario
        }
        if (text.length === 0) {
            this.setState({ error: 'el comentario no puede estar vacio' })
            return false
        }
        db.collection('posts').doc(this.props.route.params.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(comment)
        })
            .then(() => this.setState({ newComment: '' }))
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.comments}
                    keyExtractor={(item) => item.createdAt.toString()}
                    renderItem={({ item }) => <Text>{item.description}</Text>}

                />
                <View style={styles.container}>
                    <TextInput style={styles.comment}
                        placeholder='Agrega tu comentario'
                        value={this.state.newComment}
                        keyboardType='default'
                        onChangeText={(comment) => this.setState({ newComment: comment })}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.onSubmit(this.state.newComment)}>
                        <Text style={styles.touchableText}> COMENTAR </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10
    },
    button:{
        padding: 10,
        marginTop: 30,
        borderRadius: 4,
    },
    comment:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    }
});


export default Comments