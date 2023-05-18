import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Feeds from './Pages/Feeds';
import BookMark from './Pages/BookMark';
import { getPostCount } from './Reducers/MyReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBookMarkCount } from './Reducers/MyReducer';
function App() {
  const dispatch = useDispatch();

  function getAllPosts(){
    fetch("http://localhost:3002/socialpost",{
        method : 'GET'
    })
    .then((res)=> res.json())
    .then((res)=> {
        console.log(res);
        
        dispatch(getPostCount(res.length))
    })
    .catch((err)=> console.log(err))
}
  function getAllBookMarkPosts(){
    fetch("http://localhost:3002/bookmark",{
                method:'GET'
            })

            .then((res)=>res.json())
            .then((res)=>
                {
                    console.log(res) ;
                    dispatch(getBookMarkCount(res.length))
                }
            )
            .catch((err)=>console.log(err))
  }
useEffect(()=>{
    getAllPosts() 
    getAllBookMarkPosts()
},[])

const test = "When i click add to bookmark i want to render home component to update the bookmark count" ;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
              <Route index element={<Home renderApp={test}/>} />
              <Route path='feeds' element={<Feeds/>} />
              <Route path='bookmark' element={<BookMark/>} />
          </Route>
        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
