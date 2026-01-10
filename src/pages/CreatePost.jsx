import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import ReactMarkdown from 'react-markdown';

const CreatePost = () => {
    const navigate = useNavigate();
    const { addPost } = useBlog();

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Technology', // Default selection
        image: '',
        tags: ''
    });

    const [previewMode, setPreviewMode] = useState(false);
    const [errors, setErrors] = useState({});

    const categories = ['Technology', 'Lifestyle', 'Education', 'Travel', 'Health', 'Business'];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.author.trim()) newErrors.author = 'Author name is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) newErrors.content = 'Content is required';
        if (formData.content.length < 50) newErrors.content = 'Content must be at least 50 characters long';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const finalData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                likes: 0,
                comments: []
            };
            addPost(finalData);
            navigate('/posts');
        }
    };

    return (
        <div className="relative min-h-screen -mt-8 pt-8 pb-12 w-screen left-1/2 -ml-[50vw]">
            {/* Floating Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Background"
                    className="absolute w-full h-full object-cover animate-subtle-zoom"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left mb-10 text-white">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Write a Story</h1>
                    <p className="text-gray-200 mt-2 text-lg">Share your expertise and knowledge with the community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.title ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                                placeholder="Enter a catchy title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-200 mb-1">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.author ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                                    placeholder="Your name"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                                {errors.author && <p className="mt-1 text-sm text-red-400">{errors.author}</p>}
                            </div>
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition appearance-none"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat} className="bg-gray-800 text-white">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1">Cover Image</label>

                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                <div className="flex-grow w-full">
                                    <input
                                        type="url"
                                        name="image"
                                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition mb-2"
                                        placeholder="Paste image URL here"
                                        value={formData.image}
                                        onChange={handleChange}
                                    />
                                    <div className="text-gray-400 text-xs text-center mb-2">- OR -</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="block w-full text-sm text-gray-300
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-primary file:text-white
                                          file:cursor-pointer hover:file:bg-indigo-700
                                        "
                                    />
                                </div>
                                {formData.image && (
                                    <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-200 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                placeholder="React, Technology, Tutorial"
                                value={formData.tags}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-200 mb-1">Short Excerpt</label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                rows="2"
                                className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.excerpt ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition`}
                                placeholder="A brief summary of your post..."
                                value={formData.excerpt}
                                onChange={handleChange}
                            />
                            {errors.excerpt && <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-200">Content (Markdown supported)</label>
                                <button
                                    type="button"
                                    onClick={() => setPreviewMode(!previewMode)}
                                    className="text-primary hover:text-indigo-400 text-sm font-medium"
                                >
                                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                                </button>
                            </div>

                            {previewMode ? (
                                <div className="w-full min-h-[300px] px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white prose prose-invert max-w-none overflow-y-auto">
                                    <ReactMarkdown>{formData.content || '*No content to preview*'}</ReactMarkdown>
                                </div>
                            ) : (
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="12"
                                    className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${errors.content ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-400 focus:bg-black/30 focus:ring-2 focus:ring-primary focus:border-transparent transition font-mono text-sm`}
                                    placeholder="# Write your masterpiece here..."
                                    value={formData.content}
                                    onChange={handleChange}
                                />
                            )}
                            {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition transform hover:-translate-y-0.5 border border-white/20"
                        >
                            Publish Story
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
