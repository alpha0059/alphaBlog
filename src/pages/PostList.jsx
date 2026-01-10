import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import BlogPostCard from '../components/BlogPostCard';
import SkeletonPost from '../components/SkeletonPost';

const PostList = () => {
    const { posts } = useBlog();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTag, setSelectedTag] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Fixed categories + dynamic ones
    const fixedCategories = ['All', 'Technology', 'Lifestyle', 'Education'];
    const dynamicCategories = [...new Set(posts.map(post => post.category).filter(Boolean))];
    const categories = [...new Set([...fixedCategories, ...dynamicCategories])];

    // Extract all unique tags
    const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'All' ||
            (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());

        const matchesTag = selectedTag ? (post.tags && post.tags.includes(selectedTag)) : true;

        return matchesSearch && matchesCategory && matchesTag;
    });

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Blogs</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Explore all thoughts, ideas, and stories from our community.</p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Categories */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto hide-scrollbar">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setSelectedTag(null); // Clear tag when category changes
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Popular Tags */}
                {allTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center border-t border-gray-100 dark:border-slate-700 pt-4">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Popular Tags:</span>
                        {allTags.slice(0, 10).map(tag => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setSelectedTag(selectedTag === tag ? null : tag);
                                    setCurrentPage(1);
                                }}
                                className={`text-xs px-2 py-1 rounded-md transition-colors ${selectedTag === tag
                                    ? 'bg-indigo-100 dark:bg-indigo-900 text-primary dark:text-indigo-200'
                                    : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    }`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <SkeletonPost key={i} />)}
                </div>
            ) : currentPosts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentPosts.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12 space-x-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border ${currentPage === 1
                                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed dark:border-slate-700'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 dark:border-slate-600'}`}
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === index + 1
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border ${currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed dark:border-slate-700'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 dark:border-slate-600'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 border-dashed">
                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search, category, or tags.</p>
                </div>
            )}
        </div>
    );
};

export default PostList;
