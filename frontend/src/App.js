import React from 'react';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import PostView from './components/PostView';
import PostForm from "./components/PostForm";
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Profile from './components/Profile';
import ProfileForm from './components/ProfileForm';

import {Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './components/Footer';
import './index.css';

//TEST modules

import NavBarTest from './components/TestComponent/NavbarTest';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
        <Routes>
          {/* <Navbar /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainContent />} />
              {/* <Route path="/" element={<MainContent />}></Route> */}
              <Route path="/post/create" element={<PostForm />}></Route>
              <Route path="/post/update/:id" element={<PostForm />}></Route>
              <Route path="/post/:delete/:id" element={<PostForm />}></Route>
              <Route path="/post/:id" element={<PostView />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/profile/update/:id" element={<ProfileForm />}></Route>
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
