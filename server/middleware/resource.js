module.exports = options => {
    return async (req,res,next) => {
        //inflection组件可以将 小写复数单词 转化为 首字母大写的单数名词
       //将传递过来的动态路径参数改成模型的名称 如 categories -> Category
       const modelName = require('inflection').classify(req.params.resource)
       //给请求事件挂上模型
       req.Model = require(`../models/${modelName}`)
       next()
   }
}