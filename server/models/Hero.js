const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String},
    title: {type: String},
    bg:{type: String},
    skins: [{
        skinPic: {type: String},
        skinName: {type: String},
        skinDescription: {type: String},
    }],
    categories: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Category'}],//表示是个数组，可关联多个分类
    scores: {
        difficult: {type: Number},
        skill: {type: Number},
        attack: {type: Number},
        survive: {type: Number}
    },
    skills: [{
        icon: {type: String},
        name: {type: String},
        description: {type: String},
        tips: {type: String}
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Item'}],
    items2: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Item'}],
    usageTips: {type: String},
    battleTips: {type: String},
    teamTips: {type: String},
    partners: [{
        hero: {type: mongoose.SchemaTypes.ObjectId,ref: 'Hero'},
        description: {type: String}
    }]
})

module.exports = mongoose.model('Hero',schema,'heroes')