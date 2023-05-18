import React, { useEffect, useState } from 'react' ;
import { Button, Card } from 'react-bootstrap';
const BookMark = () => {
   
   const [data, setData] = useState([]) ;
   useEffect(()=>{
        getBookMarkPost()
   },[])

   function getBookMarkPost(){

            fetch("http://localhost:3002/bookmark",{
                method:'GET'
            })

            .then((res)=>res.json())
            .then((res)=>
                {
                    console.log(res) ;
                    setData(res)
                }
            )
            .catch((err)=>console.log(err))
   }

   function onDelete(id){
        //alert(id) 
        const check = window.confirm('Are you sure You want remove from bookmark') ;
        console.log(check)
        if(check){
            fetch("http://localhost:3002/bookmark/" + id,{
            method : 'DELETE'
        })
        .then((res) => res.json())
        .then((res)=>{

            console.log(res);
            getBookMarkPost()
        })
        .catch((err)=>console.log(err))
        }
        
   }


  return (
    <div>
        <div className="container my-5">
            <div className="row">
            {data.map((each)=>{
                const formattedDate = new Date(each.date).toLocaleDateString();
            return(
                   <div key={each._id} className='col-12 col-md-6 col-lg-4 col-xl-3 ' >

                    <Card  style={{ width: '288px',marginBottom:'8px'}} >
                        <Card.Img variant="top" style={{ width: '286px', height: '180px' }} src={each.imageUrl} />
                        <Card.Body>
                        <Card.Title>{each.title}</Card.Title>
                        <Card.Text>{each.description}</Card.Text>
                        <Card.Text>
                        <small className="text-muted">
                            Date: {formattedDate} | Time: {each.time}
                        </small>
                        </Card.Text>
                        <Button className='w-100' onClick={()=>onDelete(each._id)}>remove</Button>
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

export default BookMark