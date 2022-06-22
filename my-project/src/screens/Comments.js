import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../Firebase/config'
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
    onSubmit() {
        const comment = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.newComment
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
                <Text style={styles.commentsTitulo}>Comentarios: </Text>
                <FlatList
                    data={this.state.comments}
                    keyExtractor={(item) => item.createdAt.toString()}
                    renderItem={({ item }) => <Text style={styles.comments}>{item.owner}: {item.description}</Text>}

                />
                <View style={styles.container}>
                    <TextInput style={styles.comment}
                        placeholder='Agrega tu comentario'
                        value={this.state.newComment}
                        keyboardType='default'
                        onChangeText={(comment) => this.setState({ newComment: comment })}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.onSubmit(this.state.newComment)}>
                        <Text style={styles.touchableText}> Comentar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginHorizontal:10,
        backgroundColor:'black',
    },
    button:{
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#dc3545',
        margin: 20,
    },
    comment:{
        padding: 10,
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    },
    commentsTitulo:{
        color: 'white',
        marginLeft: 10,
        marginTop:5,
        fontWeight: 'bold'
    },
    comments:{
        color: 'white',
        marginLeft: 10,
        marginTop:5
    }
});


export default Comments