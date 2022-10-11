const db = require('../db/index')
const path = require('path')

exports.getArticleCates = (req, res) => {
    db.query(
        `select name,alias from ev_article where is_delete=0 order by id asc`,
        function (err, results) {
            if (err) {
                res.cc(err)
            }
            res.send({
                code: 200,
                msg: '获取文章分类列表成功',
                data: results,
            })
        }
    )
}

exports.addArticleCates = (req, res) => {
    db.query(
        `select name from ev_article where name=? or alias=?`,
        [req.body.name, req.body.alias],

        function (err, results) {
            console.log(req.body.name, req.body.alias)
            if (err) {
                return res.cc(err)
            }
            if (results.length !== 0) {
                return res.cc('您的分类名或者名字已经被占用了')
            }
            db.query(
                `insert into ev_article set ?`,
                [req.body],
                function (err, resultss) {
                    if (err) {
                        res.cc(err)
                    }
                    if (resultss.affectedRows !== 1) {
                        return res.cc('操作失败')
                    }
                    res.send({
                        code: 200,
                        msg: '增加文章分类成功',
                    })
                }
            )
        }
    )
}

exports.deleteArticleCates = (req, res) => {
    db.query(
        `update ev_article set is_delete=? where name=?`,
        [0, req.body.name],
        function (err, results) {
            if (err) {
                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                return res.cc('删除文章失败')
            }
            res.send({
                code: 200,
                msg: '删除文章成功',
            })
        }
    )
}

exports.addArticle = (req, res) => {
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id,
    }
    if (!req.file || req.file.fieldname !== 'cover_img')
        return res.cc('文章封面是必选参数！')
    const db = require('../db/index')
    db.query(`insert into ev_articles set ?`, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        res.send({
            code: 200,
            msg: '文章发布成功',
        })
    })
}
