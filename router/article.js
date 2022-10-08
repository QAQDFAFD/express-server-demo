const express = require('express')
const router = express.Router()
const articleHandler = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')
const { add_cates, delete_cates, add_article } = require('../schema/user')
const multer = require('multer')
const path = require('path')
// 创建 multer 的实例
const upload = multer({
    dest: path.join(__dirname, '../uploads'),
})

router.get('/cates', articleHandler.getArticleCates)

router.post('/addcates', expressJoi(add_cates), articleHandler.addArticleCates)

router.post(
    '/deleteCates',
    expressJoi(delete_cates),
    articleHandler.deleteArticleCates
)

// 增加文章
router.post(
    '/addArticle',
    upload.single('cover_img'),
    expressJoi(add_article),
    articleHandler.addArticle
)

module.exports = router
