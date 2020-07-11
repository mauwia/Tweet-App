import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import PostCreate from './PostCreate'
import PostList from './PostList';

function App() {
  return (
    <div className='container'>
      <PostCreate/>
      <hr/>
      <h4>Posts</h4>
      <PostList/>
    </div>
  );
}

export default App;
