var express = require('express');
var router = express.Router();

const BookMarkController = require('../controllers/BookMark') ;

router.post('/',BookMarkController.createBookMarkPost) ;
router.get('/', BookMarkController.getBookMarkPosts) ;
router.delete('/:id', BookMarkController.deleteBookMark) ;

module.exports = router ;