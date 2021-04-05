module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req,res,next) => {
        //中间件，进行token验证处理
        //获取token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'请先登录')
        // console.log(token)
        //解码token
        const { id } = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登录')
        //根据解码的id查找用户并挂载到req上
        req.user = await AdminUser.findById(id)
        assert(req.user,401,'请先登录')
        next()
    }
}