import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </Layout>
      </Router>
    </BlogProvider>
  );
}

export default App;
