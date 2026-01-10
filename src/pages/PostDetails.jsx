import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import { calculateReadTime } from '../utils';

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, deletePost, toggleLike, addComment } = useBlog();
    const [commentText, setCommentText] = useState('');

    const post = posts.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="text-center py-20 dark:text-white">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h2>
                <Link to="/posts" className="text-primary hover:text-indigo-700 dark:hover:text-indigo-400 mt-4 inline-block">Back to posts</Link>
            </div>
        );
    }

    const readTime = calculateReadTime(post.content);

    // Filter related posts (same category, excluding current post)
    const relatedPosts = posts
        .filter(p => p.category === post.category && p.id.toString() !== id)
        .slice(0, 3);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost(post.id);
            navigate('/posts');
        }
    };

    const handleLike = () => {
        toggleLike(post.id);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            addComment(post.id, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="space-y-16 animate-fade-in-up">
            <Helmet>
                <title>{post.title} | alphaBlog</title>
                <meta name="description" content={post.excerpt} />
                <meta name="keywords" content={post.tags ? post.tags.join(', ') : post.category} />
            </Helmet>

            <article className="max-w-4xl mx-auto space-y-8">
                {/* Back Button (Top) */}
                <div>
                    <Link to="/posts" className="inline-flex items-center text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary font-medium transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blogs
                    </Link>
                </div>

                <div className="space-y-4 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                            {post.category || 'General'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 space-x-4 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-md">
                                {post.author ? post.author.charAt(0) : 'A'}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{post.author || 'Anonymous'}</span>
                        </div>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{readTime} min read</span>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-900/50">
                    <img
                        src={post.image || `https://source.unsplash.com/random/1200x600?sig=${post.id}`}
                        alt={post.title}
                        className="w-full h-[300px] md:h-[500px] object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                    />
                </div>

                {/* Markdown Content */}
                <div className="prose prose-lg prose-indigo dark:prose-invert mx-auto">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                        <span className="text-gray-500 dark:text-gray-400 font-medium mr-2">Tags:</span>
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-lg text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Like & Actions */}
                <div className="flex items-center justify-between border-t border-b border-gray-100 dark:border-slate-800 py-6">
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill={post.likes > 0 ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-medium">{post.likes || 0} Likes</span>
                    </button>

                    <div className="flex gap-4">
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition"
                        >
                            Delete
                        </button>
                        <Link
                            to={`/edit/${post.id}`}
                            className="text-primary hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition"
                        >
                            Edit
                        </Link>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="pt-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({post.comments ? post.comments.length : 0})</h3>

                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <div className="flex flex-col gap-4">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
                                rows="3"
                            />
                            <button
                                type="submit"
                                className="self-end px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!commentText.trim()}
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div className="space-y-6">
                        {post.comments && post.comments.length > 0 ? post.comments.map(comment => (
                            <div key={comment.id} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-2xl">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white">{comment.author}</h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(comment.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                            </div>
                        )) : (
                            <p className="text-gray-500 dark:text-gray-400 italic">No comments yet. Be the first to share your thoughts!</p>
                        )}
                    </div>
                </div>
            </article>

            {/* Related Blogs Section */}
            {relatedPosts.length > 0 && (
                <section className="border-t border-gray-200 dark:border-slate-800 pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Blogs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map(relatedPost => (
                            <div key={relatedPost.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col h-full transform hover:-translate-y-1">
                                <div className="relative h-48 overflow-hidden">
                                    <Link to={`/posts/${relatedPost.id}`}>
                                        <img
                                            src={relatedPost.image || `https://source.unsplash.com/random/800x600?sig=${relatedPost.id}`}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide text-primary shadow-sm border dark:border-slate-700">
                                        {relatedPost.category || 'General'}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        <Link to={`/posts/${relatedPost.id}`}>
                                            {relatedPost.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow text-sm">
                                        {relatedPost.excerpt || relatedPost.content.substring(0, 80) + '...'}
                                    </p>
                                    <Link to={`/posts/${relatedPost.id}`} className="text-primary font-medium text-sm hover:text-indigo-700 dark:hover:text-indigo-400 flex items-center gap-1 group/link mt-auto">
                                        Read more
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default PostDetails;
