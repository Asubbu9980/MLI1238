var SocialMediaModel = require('../model/socialMedia') ;

const getSocialMediaPosts = function(req,res){
    SocialMediaModel.find({})
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err))
}

const getOneSocialMediaPost = function(req,res){
    const id = req.params.id ;
    SocialMediaModel.findById(id)
    .then((data)=>res.send(data))
    .catch((err)=>console.log(err))
}

const createPost = function(req,res){
    const body = req.body ;

    try{
        let data = SocialMediaModel.create(body) 
        return res.send(data)
    }
    catch(err){
        return res.send(err)
    }
}
module.exports = {getSocialMediaPosts, createPost, getOneSocialMediaPost} 