module.exports = app => {
    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/node-vue-moba',{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })

    //把所有模型都引用一遍
    require('require-all')(__dirname + '/../models')
}