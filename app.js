const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userInfo')
const joi = require('@hapi/joi')
const config = require('./config')
const expressJwt = require('express-jwt')

//自定义log中间件
app.use(function (req, res, next) {
    // code：201为请求成功但是有异常
    res.cc = function (err, code = 201) {
        res.send({
            code: code,
            msg: err instanceof Error ? err.message : err,
        })
    }
    next()
})
app.use(cors())
// 解析表单数据
// 使用的是 express 内置的中间件，只能解析 www 形式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRouter)
app.use('/api', userInfoRouter)
app.use(
    expressJwt
        .expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] })
        .unless({
            path: [/^\/api\//],
        })
)

// 定义错误级别中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！')
    }
    next()
    console.log(err)
})

app.listen(3007, () => {
    console.log('api server is running at 3007')
})
