import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Blog Data State
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('blog_posts');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse blog posts from local storage", e);
                localStorage.removeItem('blog_posts');
            }
        }
        return [
            {
                id: 1,
                title: 'Welcome to React Blog',
                excerpt: 'This is a sample blog post to get you started with React and Tailwind CSS.',
                content: '# Welcome to React Blog\n\nReact is a powerful library for building user interfaces. Combined with **Tailwind CSS**, you can create stunning designs quickly.\n\n## Features included:\n- Routing\n- State Management\n- Component Reusability\n\n```javascript\nconsole.log("Hello World");\n```',
                author: 'Admin',
                date: new Date().toISOString(),
                image: 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                category: 'Technology',
                tags: ['React', 'Tailwind', 'Frontend'],
                likes: 12,
                comments: [
                    { id: 1, author: 'User1', text: 'Great post!', date: new Date().toISOString() }
                ]
            },
            {
                id: 2,
                title: 'Mastering State Management',
                excerpt: 'Understanding state is crucial for any React developer.',
                content: '## State Management\n\nState management allows your application to be dynamic and interactive. Context API provides a way to pass data through the component tree without having to pass props down manually at every level.\n\n> "State is the heart of React applications."\n\nCheck out official docs for more.',
                author: 'Dev Guru',
                date: new Date(Date.now() - 86400000).toISOString(),
                image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                category: 'Coding',
                tags: ['State', 'Context', 'Hooks'],
                likes: 5,
                comments: []
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('blog_posts', JSON.stringify(posts));
    }, [posts]);

    const addPost = (post) => {
        const newPost = {
            ...post,
            id: Date.now(),
            date: new Date().toISOString(),
            likes: 0,
            comments: []
        };
        setPosts([newPost, ...posts]);
    };

    const updatePost = (id, updatedPost) => {
        setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
    };

    const deletePost = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const toggleLike = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                // Toggle like logic (simplified for local: usually requires user auth, here just increment/decrement conceptually or just increment)
                // For simplicity: Increment
                return { ...post, likes: (post.likes || 0) + 1 };
            }
            return post;
        }));
    };

    const addComment = (postId, commentText) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: Date.now(),
                    author: 'Guest', // Placeholder
                    text: commentText,
                    date: new Date().toISOString()
                };
                return { ...post, comments: [...(post.comments || []), newComment] };
            }
            return post;
        }));
    };

    return (
        <BlogContext.Provider value={{
            posts,
            addPost,
            updatePost,
            deletePost,
            theme,
            toggleTheme,
            toggleLike,
            addComment
        }}>
            {children}
        </BlogContext.Provider>
    );
};
