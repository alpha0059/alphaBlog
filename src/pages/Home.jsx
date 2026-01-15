import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogPostCard from '../components/BlogPostCard';

const Home = () => {
    const { posts } = useBlog();
    const featuredPosts = posts.slice(0, 3);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const images = [
        'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Laptop/Coffee
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Nature
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', // Teamwork
        'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'  // Code
    ];

    const texts = [
        "inspire the world.",
        "ignite your passion.",
        "connect with others.",
        "share your journey."
    ];

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 20000); // Increased to 20 seconds

        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % texts.length);
        }, 3000);

        return () => {
            clearInterval(imageInterval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div className="space-y-24">
            {/* Hero Section - Full Width & Immersive */}
            <section className="relative w-screen left-1/2 -ml-[50vw] h-[85vh] overflow-hidden -mt-8">
                {/* Background Images with Overlay */}
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt="Background"
                            className="w-full h-full object-cover transform scale-105 animate-subtle-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    </div>
                ))}

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-3xl space-y-8 animate-fade-in-up">
                        <div className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm tracking-wider uppercase mb-2">
                            Welcome to alphaBlog
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-tight drop-shadow-lg">
                            Share your stories, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary transition-all duration-500 block h-[1.2em]">
                                {texts[textIndex]}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                            Discover a platform built for readers and writers. Experience a modern, immersive way to read and write blogs using the latest web technologies.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 pt-6">
                            <Link to="/posts" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg hover:shadow-primary/50 hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
                                Start Reading
                            </Link>
                            <Link to="/create" className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1">
                                Write a Story
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </section>

            {/* Intro Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center -mt-10 mb-20">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg">
                        AB
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Author</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        Hi, I'm <span className="font-semibold text-primary">Alex</span>, a passionate writer and tech enthusiast.
                        Welcome to alphaBlog, a space where I share my thoughts on technology, lifestyle, and the future of web development.
                        Join me on this journey of exploration and learning.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/about" className="text-primary font-semibold hover:text-indigo-700">Read full bio &rarr;</Link>
                    </div>
                </div>
            </section>

            {/* Latest Blogs Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900">Latest Blogs</h2>
                        <div className="h-1.5 w-20 bg-primary mt-4 rounded-full"></div>
                    </div>
                    <Link to="/posts" className="hidden sm:flex items-center text-primary font-bold text-lg hover:text-indigo-700 group">
                        View all
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredPosts.map(post => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>

                <div className="mt-12 text-center sm:hidden">
                    <Link to="/posts" className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                        View all stories
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-dark rounded-[2.5rem] p-8 md:p-20 text-center text-white relative overflow-hidden mb-12 shadow-2xl">
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-indigo-600 rounded-full filter blur-[120px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[30rem] h-[30rem] bg-pink-600 rounded-full filter blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Stay curious, stay inspired.</h2>
                    <p className="text-xl text-gray-300">Get the latest stories, updates, and community highlights delivered straight to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition backdrop-blur-sm"
                        />
                        <button className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-1">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-sm text-gray-500">No spam, just good content.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
