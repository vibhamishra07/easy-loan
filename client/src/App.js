import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import SignUpPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './Pages/Profile';

import ErrorPage from './Pages/404Page';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { reset } from './Redux/features/authSlice';
import Layout from './Pages/Layout';


function App() {
  const {message, isError, isSuccess, user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if(isError && message){ toast.error(message)};
    if(isSuccess && message){toast.success(message)};
    dispatch(reset());
  }, [isError, isSuccess, message]);

  return (
    <div className="App">
    <Routes>
      <Route path="/login" element={!user?<LoginPage/> : <Navigate to="/" replace={true}/>}/>
      <Route path="/signup" element={!user? <SignUpPage/> :<Navigate to="/" replace={true}/>}/>
      <Route path="/" element={user?<Layout />:<Navigate to="/login" replace={true}/>}>
        <Route index element={<Profile />} />
      </Route>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    <Toaster/>
  </div>
  );
}

export default App;
