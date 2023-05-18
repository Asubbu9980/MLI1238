import React, {useEffect, useState}from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';



const Feeds = () => {
    
   const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            title:'',
            description:'',
            imageUrl : '',
            // date : '',
            // time : ''
        },
        validationSchema : Yup.object({
            title: Yup.string()
                .min(3, "*Minimum 3 characters are required")
                .max(50, "*maximum 50 characters are required")
                .required('*required') ,

            description: Yup.string()
                .min(3, '*Minimum 3 characters are required')
                .max(250,'maximum 250 characters are required')
                .required('*required'),

            imageUrl: Yup.string()
                .min(50, "*Minimum 50 characters are required")
                .max(250, "*maximum 250 characters are required")
                .required('*required'),
            // date:Yup.string()
            //     .required('*required'),
            // time:Yup.string()
            //     .required('*required')
        }),
        onSubmit:(values) => {
            const timeDate = new Date();
            const time = timeDate.getHours() + ':' + timeDate.getMinutes() ;
            const date = new Date().toLocaleDateString();
            const {title,description,imageUrl} = values ;
            const postDetails = {title:title,description:description,imageUrl:imageUrl,date:date,time:time}
            console.log(postDetails)
            console.log(values);
            fetch("http://localhost:3002/socialpost",{
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(postDetails)
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            navigate('/')
        })
        .catch((err)=> console.log(err))

        }
    })
    
  return (
    <div className='post-feed-bg-color'>
        <Container className="my-5 w-50 feed-form">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name='title' value={formik.values.title} onChange={formik.handleChange} />
                    {formik.errors.title && formik.touched.title ? <div className='text-danger'>{formik.errors.title}</div> : ''}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name='description' value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description && formik.touched.description ? <div className='text-danger'>{formik.errors.description}</div> : ''}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' name="imageUrl" placeholder='Enter your image url' value={formik.values.imageUrl} onChange={formik.handleChange}/>
                    {formik.errors.imageUrl && formik.touched.imageUrl ? <div className='text-danger'>{formik.errors.imageUrl}</div> : ""}
                </Form.Group>

                {/* <Form.Group className='mb-3'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date' name="date" value={formik.values.date} onChange={formik.handleChange}/>
                    {formik.errors.date && formik.touched.date ? <div className='text-danger'>{formik.errors.date}</div> : ""}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type='time' name="time" value={formik.values.time} onChange={formik.handleChange}/>
                    {formik.errors.time && formik.touched.time ? <div className='text-danger'>{formik.errors.time}</div> : ""}
                </Form.Group> */}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </div>
  )
}

export default Feeds