const { func } = require('@hapi/joi')
const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息的接口
exports.getuserInfo = (req, res) => {
    const { username } = req.query
    db.query(
        `select username,nickname,email from ev_users where username=?`,
        [username],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.length > 0) {
                res.send({
                    code: 200,
                    msg: results,
                })
            }
        }
    )
}

// 更新用户信息的接口
exports.updateUserInfo = (req, res) => {
    const updateInfo = req.body
    db.query(
        `update ev_users set ? where username=?`,
        [updateInfo, updateInfo.username],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('修改用户信息失败')
            }
            console.log(results)
            res.send({
                code: 200,
                msg: '修改用户信息成功',
            })
        }
    )
}

// 修改用户的密码
exports.changePwd = (req, res) => {
    const updateInfo = req.body
    db.query(
        `select password from ev_users where username=?`,
        [updateInfo.username],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (!bcrypt.compareSync(updateInfo.oldPwd, results[0].password)) {
                return res.cc('原密码错误')
            }
            // 对新密码进行 bcrypt 加密处理
            const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
            db.query(
                `update ev_users set password=? where username=?`,
                [newPwd, updateInfo.username],
                function (err, resultss) {
                    if (err) {
                        res.cc(err)
                    }
                    if (resultss.affectedRows !== 1) {
                        return res.cc('修改密码失败')
                    }
                    res.send({
                        code: 200,
                        msg: '修改用户信息成功',
                    })
                }
            )
        }
    )
}

// 更换用户的头像
exports.changeAvator = (req, res) => {
    const updateInfo = req.body
    db.query(
        `update ev_users set user_pic=? where username=?`,
        [updateInfo.imgUrl, updateInfo.username],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('更换头像失败')
            }
            res.send({
                code: 200,
                msg: '更换头像成功',
            })
        }
    )
}
