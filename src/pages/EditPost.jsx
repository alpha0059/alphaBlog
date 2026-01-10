import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost } = useBlog();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        const post = posts.find(p => p.id.toString() === id);
        if (post) {
            setFormData(post);
        } else {
            navigate('/posts');
        }
    }, [id, posts, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePost(parseInt(id), formData);
        navigate(`/posts/${id}`);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-left mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Edit Story</h1>
                <p className="text-gray-500 mt-2">Update your content and keep it fresh.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={formData.author}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            rows="2"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            value={formData.excerpt}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="12"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition font-mono text-sm"
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;
