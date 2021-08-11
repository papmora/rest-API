import React from 'react';
import './App.css';
import DataTable from './components/DataTable/DataTable';
import Navbar from './components/Navbar/Navbar';
import PostForm from './components/PostForm/PostForm';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <DataTable />
      <PostForm />
    </div>
  );
}

export default App;
