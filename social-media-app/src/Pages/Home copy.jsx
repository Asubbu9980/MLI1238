import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import {  getPostCount} from '../Reducers/MyReducer';
const Home = (props) => {
    console.log(props)
    const [posts, setPosts] = useState([]);
    
    const dispatch = useDispatch();
   
    function getAllPosts(){
        fetch("http://localhost:3002/socialpost",{
            method : 'GET'
        })
        .then((res)=> res.json())
        .then((res)=> {
            console.log(res);
            setPosts(res)
             
            dispatch(getPostCount(res.length))
        })
        .catch((err)=> console.log(err))
    }
    useEffect(()=>{
        getAllPosts()
    },[])

    function addToBookMark(obj){
        const timeDate = new Date() ;
        console.log(timeDate.getHours() + ' : ' + timeDate.getMinutes());
        const check = window.confirm('Feed is added to your Bookmark') ;
        if(check){
            const {title,description,imageUrl,date,time} = obj ;

            const values = {title:title,description:description,imageUrl:imageUrl,date:date,time:time}

            fetch("http://localhost:3002/bookmark/" ,{
                method : 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body:JSON.stringify(values)
            })
            .then((res)=> res.json())
            .then((res)=> {
            console.log(res)
            })
            .catch((err)=> console.log(err))
    
            }
        }
  return (
    <div>
        
        <div className="container my-5">
            <div className="row">
            {posts.map((each)=>{
                const formattedDate = new Date(each.date).toLocaleDateString();
            return(
                   <div key={each._id} className='col-12 col-md-6 col-lg-4 col-xl-3' >

                    <Card className='shodow' style={{ width: '288px',margin:'2px'}} >
                        <Card.Img variant="top" style={{ width: '286px', height: '180px' }} src={each.imageUrl} />
                        <Card.Body>
                        <Card.Title>{each.title}</Card.Title>
                        <Card.Text>{each.description}</Card.Text>
                        <Card.Text>
                        <small className="text-muted">
                            Date: {formattedDate} | Time: {each.time}
                        </small>
                        </Card.Text>
                        <Button className='w-100' onClick={()=>addToBookMark(each)} variant='primary'>Add to Bookmark</Button>
                        </Card.Body>
                        
                    </Card>
                   
                    </div>
            )
        })}
            </div>
            
        </div>
            
         
        
        
    </div>
  )
}

export default Home;