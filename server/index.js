const express = require('express')
const port = 3000

const app = express()

app.set('secret','siisjjdjs')  //给app设置一个secret属性并赋值

//引入跨域模块并使用
app.use(require('cors')())
//json中间件
app.use(express.json())

app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)

app.listen(port,() => {
    console.log(`端口${port}已被监听: http//losthost:${port}`);
})