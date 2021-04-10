//CRUD 接口的增删改查操作类似，将路由变量化，操作可通用
module.exports = app => {

    const express = require('express')
    //创建子路由
    const router = express.Router({
        mergeParams: true //允许接口合并
    })
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')

    //登录校验中间件
    const authMiddleware = require('../../middleware/auth.js')
    //动态路由路径来源中间件
    const resourceMiddleware = require('../../middleware/resource.js')
    //创建
    router.post('',async (req,res) => {
        //创建数据
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //修改更新
    router.put('/:id',async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除
    router.delete('/:id',async (req,res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    //列表查询
    router.get('',async (req,res) => {
        //限制10条数据 
        //populate(parent) 返回的parent表示其关联的对象
        // const items = await req.Model.find().populate('parent').limit(10)
        const { page, limit, search,categoryId } = await req.query
        const queryOptions = {}
        const categoryList = []
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'

        //返回有子分类的分类
        const Category  = require('../../models/Category')
        //先获取有parent的分类
        const haveParent = await Category.find({'parent':{$type: 7}})
        //获取他们的父类id
        let categoryIdArr = new Set()
        haveParent.forEach(i => {
            categoryIdArr.add(i.parent.toString())
        })
        categoryIdArr.forEach(async id => {
            categoryList.push(await Category.findById(id).lean())
        })
        }
        const skipCount = (page - 1) * limit
        let items = []
        if(search){
            items = await req.Model.find({'name':{$regex: search}}).setOptions(queryOptions).skip(skipCount).limit(Number(limit))
        }else if(categoryId){
            items = await req.Model.find({'parent':categoryId}).setOptions(queryOptions).skip(skipCount).limit(Number(limit))
        }else{
            items = await req.Model.find().setOptions(queryOptions).skip(skipCount).limit(Number(limit))
        }
        //总数
        const count = await req.Model.find().setOptions(queryOptions).count()
        const data = {
            items: items,
            count: count,
            categoryList: categoryList  //展示有自类的列表
        }
        res.send(data)
    })
    //根据id查询，返回名称
    router.get('/:id',async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //为路由添加动态参数
    app.use('/admin/api/rest/:resource',authMiddleware(), resourceMiddleware(),router)


    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    //图片上传
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res) => {
        const file = req.file
        //为文件添加上地址
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //用户登录
    app.post('/admin/api/login',async (req,res) => {
        const {username,password} = req.body
        //1.根据用户名找用户
        //因为模型中password设置了select:false,正常情况下是取不到的，要添加 select('+password')

        const user = await AdminUser.findOne({username:username}).select('+password')

        // if(!user){
        //     return res.status(400).send({
        //         message: '用户不存在'
        //     })
        // }
        assert(user,400,'用户不存在')//等同于上面的if判断
        //2.校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        // if(!isValid){
        //     return res.status(400).send({
        //         message: '密码不正确'
        //     })
        // }
        assert(isValid,400,'密码错误')
        //3.返回token
        const token = jwt.sign({id: user._id},app.get('secret'))
        res.send({token})
    })


    //错误处理函数,捕获错误并通一处理
    app.use(async (err,req,res,next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}
