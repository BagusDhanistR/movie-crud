'use strict'

const {Movie} = require("../models")

module.exports.add = async function (req, res, next) {
    try {
        let {title, description, rating, image} = req.body
        if(!title || !rating ) throw({name: "incomplete data"})
        if(typeof title != "string") throw({name: "incorrect value", value: "title", type: "string"})
        if(typeof description != "string") throw({name: "incorrect value", value: "description", type: "string"})
        if(typeof image != "string") throw({name: "incorrect value", value: "image", type: "string"})
        if(typeof rating != "number") throw({name: "incorrect value", value: "rating", type: "number"})
        if(rating > 10 || rating < 0) throw({name: "rating error"})
        const movie = await Movie.create({title, description, rating, image})

        return res.status(201).json({message: "Movie added succesfully", movie})
    } catch (error) {
        next(error)
    }
}

module.exports.getAll = async function (req, res, next) {
    try {
        const movie = await Movie.findAll()
        if(!movie) throw ({name: "not found"})
        return res.status(200).json({message: "heres your movie list:", movie})
    } catch (error) {
        next(error)
    }
}

module.exports.getDetail = async function (req, res, next) {
    try {
        let {ID} = req.params

        const movie = await Movie.findByPk(ID)
        if(!movie) throw({name: "not found"})
        return res.status(200).json({message: "heres the detail of the movie:", movie})
    } catch (error) {
        next(error)
    }
}

module.exports.update = async function (req, res, next) {
    try {
        let {title, description, rating, image} = req.body
        let {ID} = req.params
        if(!title || !rating ) throw({name: "incomplete data"})
        if(typeof title != "string") throw({name: "incorrect value", value: "title", type: "string"})
        if(typeof description != "string") throw({name: "incorrect value", value: "description", type: "string"})
        if(typeof image != "string") throw({name: "incorrect value", value: "image", type: "string"})
        if(typeof rating != "number") throw({name: "incorrect value", value: "rating", type: "number"})
        if(rating > 10 || rating < 0) throw({name: "rating error"})

        const [rowsAffected, movie] = await Movie.update({title, description, rating, image}, {
            where: {id: ID},
            returning: true
        })
        if(rowsAffected == 0) throw({name: "not found"})
        return res.status(201).json({message: "Movie updated succesfully", movie})
    } catch (error) {
        next(error)
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        let {ID} = req.params

        const rowsAffected = await Movie.destroy({where: {id: ID}})
        if(rowsAffected == 0) throw({name: "not found"})
        return res.status(200).json({message: "movie has been deleted"})
    } catch (error) {
        next(error)
    }
}