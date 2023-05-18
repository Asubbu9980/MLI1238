const  BookMarkModel = require('../model/BookMark') ;

const createBookMarkPost = async function(req,res,next){
    const body = req.body ;

    try{
        let data = await BookMarkModel.create(body) 
        return res.send(data)
    }
    catch(err){
        console.log(err)
    }
}

const getBookMarkPosts = async function(req,res,next){
   await BookMarkModel.find({})
    .then((data)=> res.send(data))
    .catch((err) => res.send(err))
}

const deleteBookMark = async function(req,res,next){
    const id = req.params.id ;

    try{
        let data = await BookMarkModel.findByIdAndDelete(id) 
        return res.send(data)
    }
    catch(err){
        return res.send(err)
    }
    
}

module.exports = {createBookMarkPost, getBookMarkPosts, deleteBookMark}