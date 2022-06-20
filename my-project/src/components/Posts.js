import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native'
import React, { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { auth, db } from '../Firebase/config'
import firebase from 'firebase'


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantityLikes: 0,
            like: false,
            arrayLikes: [],
            comentario: [],
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
    comment(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id); 

        thisDoc.update(
            {comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.displayName,
                comentario:this.state.comentario
            })}
        )
        .then(
            this.setState({
               comentario: ''
            })
        ).catch(e => console.log(e))
    }

    render() {
        const { style, info } = this.props
        console.log(this.props.info)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Usuario: {info.data.email}</Text>
                <Image style={styles.image} source={{uri: info.data.photo}}/>
                <Text style={styles.description}>{info.data.postDescription}</Text>
                <Text style={styles.date}>{info.data.createdAt}</Text>
                <View style={styles.button}>
                    <Text>{this.state.quantityLikes}</Text>
                    {
                        this.state.like
                            ?
                            <TouchableOpacity style={styles.unlike} onPress={() => this.unlike()}>
                                <FontAwesome name='heart' size={24} color='red' />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.like} onPress={() => this.like()}>
                                <FontAwesome name='heart-o' size={24} color='black' />
                            </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity style={styles.comment} onPress={()=> this.props.navigation.navigate('Comments',{id: this.props.info.id})}>
                    <Text style={styles.touchableText}>Comentar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        paddingVertical:8,
        paddingHorizontal:6,
        borderRadius:5,
        backgroundColor:'white',
        marginTop: 20,
        alignItems: 'center'
    
    },
    image: {
        height: 100,
        width: 100
    },
    like:{
        marginLeft:8,
        padding:10,
        width: 100

    },
    unlike:{
        marginRight:8
    },
    text:{
        fontSize:15,
        marginVertical:10,
        fontWeight: 'bold'
    },
    description:{
        fontSize: 20,
        marginVertical:10
    },
    button:{
        alignItems: 'center',
        padding: 7,
        marginTop: 30,
        borderRadius: 4,
        flexDirection:'row'
    },
    comment:{
        padding: 10,
        backgroundColor: '#dc3545',
        margin: 20,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    }
});


export default Post