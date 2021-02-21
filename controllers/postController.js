'use strict'

const { response } = require('express')
const firebase = require('../db')
const firestore = firebase.firestore()
const { PostModel } = require('../models')

const addPost = async (req, res, next) => {
    try {
        const data = req.body
        await firestore.collection('posts').doc().set(data)
        res.send('Record saved successfully')
    } catch (error) {
        res.status(400).sent(error.message)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await firestore.collection('posts')
        const data = await posts.get()
        const postsArray = []
        if (data.empty) {
            res.status(400).send('No post record found')
        } else {
            data.forEach(doc => {
                const post = new PostModel(
                    doc.id,
                    doc.data().host_id,
                    doc.data().topic,
                    doc.data().detail,
                    doc.data().time
                )
                postsArray.push(post)
            })
            res.send(postsArray)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getPost = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await firestore.collection('posts').doc(id)
        const data = await post.get()
        if (!data.exists) {
            res.status(404).send(error.message)
        } else {
            res.send(data.data())
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body
        const post = await firestore.collection('posts').doc(id)
        await post.update(data)
        res.send('Post record updated successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        await firestore.collection('posts').doc(id).delete()
        res.send('Record deleted successfully')
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {
    addPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
}