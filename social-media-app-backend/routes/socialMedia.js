var express = require('express');
var router = express.Router();

var SocialMediaControllers = require('../controllers/socialMedia') ;

router.get('/',SocialMediaControllers.getSocialMediaPosts);
router.get('/:id',SocialMediaControllers.getOneSocialMediaPost);
router.post('/',SocialMediaControllers.createPost);
module.exports = router;