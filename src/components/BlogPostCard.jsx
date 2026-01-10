import React from 'react';
import { Link } from 'react-router-dom';
import { calculateReadTime } from '../utils';

const BlogPostCard = ({ post }) => {
    const readTime = calculateReadTime(post.content);

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <Link to={`/posts/${post.id}`}>
                    <img
                        src={post.image || `https://source.unsplash.com/random/800x600?sig=${post.id}`}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                    />
                </Link>
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-primary shadow-sm border border-transparent dark:border-slate-700">
                    {post.category || 'General'}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{new Date(post.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>{readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                    {post.excerpt || post.content.substring(0, 100) + '...'}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-700 mt-auto">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                            {post.author ? post.author.charAt(0) : 'A'}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-slate-200">{post.author || 'Anonymous'}</span>
                    </div>
                    <Link to={`/posts/${post.id}`} className="text-primary font-medium text-sm hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center gap-1 group/link">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
