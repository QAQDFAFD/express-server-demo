const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')

const app = express()
app.listen(3007, () => {
    console.log('api server is running at 3007')
})
app.use(cors())
// 解析表单数据
// 使用的是 express 内置的中间件，只能解析 www 形式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRouter)
