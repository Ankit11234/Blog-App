import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AddBlog from './Components/AddBlog';
import Auth from './Components/Auth';
import BlogDetail from './Components/BlogDetail';
import Blogs from './Components/Blogs';
import Header from './Components/Header';
import UserBlogs from './Components/UserBlogs';
import { authActions } from './Store';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.isLoggedIn);
  console.log(state);
  useEffect(()=>{

    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  },[dispatch])
  return (
    <>
    <header>
     <Header/>
    </header>
    <main>
      <Routes>
      {!state ?<Route path='/auth' element={<Auth/>}/>:
        <>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/myBlogs' element={<UserBlogs/>}/>
          <Route path='/myBlogs/:id' element={<BlogDetail/>}/>
          <Route path='/blogs/add' element={<AddBlog/>}/> 
        </>
      }
     
      </Routes>
    </main>
    </>
  );
}

export default App;
