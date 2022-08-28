
// import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import PostView from './components/PostView';
import PostForm from "./components/PostForm";

import {Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />}></Route>
          {/* <Route path="/post" element={<MainContent />}></Route> */}
          <Route path="/post/create" element={<PostForm />}></Route>
          <Route path="/post/update/:id" element={<PostForm />}></Route>
          <Route path="/post/:delete/:id" element={<PostForm />}></Route>
          <Route path="/post/:id" element={<PostView />}></Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
