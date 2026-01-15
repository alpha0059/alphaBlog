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

import SplashLoader from './components/SplashLoader';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashLoader />;
  }

  return (
    <BlogProvider>
      <Router basename="/alphaBlog">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/edit/:id" element={<EditPost />} />
            {/* Redirect any other path to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </BlogProvider>
  );
}

export default App;
