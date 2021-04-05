### 所用组件
```powershell
   "cors": "^2.8.5",              跨域
   "express": "^5.0.0-alpha.8",   
   "inflection": "^1.12.0",       小写复数变首字大写单数
   "mongoose": "^5.12.3",         数据库
   "multer": "^1.4.2",            图片处理
   "bcrypt": "^5.0.1",            密码加密
   "jsonwebtoken": "^8.5.1",      token处理
   "http-assert": "^1.4.1",       判断是否存在assert(value,status,message)
```

### routes\admin\index.js
##### 初始
```javascript 
    module.exports = app => {

    const express = require('express')
    //创建子路由
    const router = express.Router()
    //获取数据库模型
    const Category = require('../../models/Category')
    
    //创建分类
    router.post('/categories',async (req,res) => {
        //创建数据
        const model = await Category.create(req.body)
        res.send(model)
    })
    //修改更新分类
    router.put('/categories/:id',async (req,res) => {
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/categories/:id',async (req,res) => {
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    //分类列表查询
    router.get('/categories',async (req,res) => {
        //限制10条数据 
        //populate(parent) 返回的parent表示其关联的对象
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    //根据id查询分类，返回分类名称
    router.get('/categories/:id',async (req,res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    app.use('/admin/api',router)
}
```
##### 进行通用CRUD接口化后
```javascript
    //CRUD 接口的增删改查操作类似，将路由变量化，操作可通用
module.exports = app => {

    const express = require('express')
    //创建子路由
    const router = express.Router({
        mergeParams: true //允许接口合并
    })
    
    //创建分类
    router.post('',async (req,res) => {
        //创建数据
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //修改更新分类
    router.put('/:id',async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/:id',async (req,res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success: true
        })
    })
    //分类列表查询
    router.get('',async (req,res) => {
        //限制10条数据 
        //populate(parent) 返回的parent表示其关联的对象
        // const items = await req.Model.find().populate('parent').limit(10)
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //根据id查询分类，返回分类名称
    router.get('/:id',async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //为路由添加动态参数
    app.use('/admin/api/rest/:resource',async (req,res,next) => {
         //inflection组件可以将 小写复数单词 转化为 首字母大写的单数名词
        //将传递过来的动态路径参数改成模型的名称 如 categories -> Category
        const modelName = require('inflection').classify(req.params.resource)
        //给请求事件挂上模型
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)
}

```