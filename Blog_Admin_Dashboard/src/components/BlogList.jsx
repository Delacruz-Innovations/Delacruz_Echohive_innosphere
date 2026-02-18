import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Plus,
    Edit,
    Trash2,
    CheckCircle,
    Clock,
    Search
} from 'lucide-react';
import { getServiceByOrgId } from '../services/serviceFactory';
import { formatFirebaseDate } from '../utils/blogUtils';
import NetworkError from './NetworkError';

const BlogList = () => {
    const { orgId } = useParams();
    const blogService = getServiceByOrgId(orgId);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await blogService.getAllBlogs();
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError(error.message || "Failed to load blogs. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            try {
                await blogService.deleteBlog(id);
                setBlogs(blogs.filter(blog => blog.id !== id));
            } catch (error) {
                alert('Error deleting blog: ' + error.message);
            }
        }
    };

    const handleStatusToggle = async (blog) => {
        // Only allow toggling for 'published' and 'draft' statuses
        if (blog.status === 'archived' || blog.status === 'scheduled') {
            return; // Archived or Scheduled blogs cannot be toggled directly from the list
        }
        const newStatus = blog.status === 'published' ? 'draft' : 'published';
        try {
            await blogService.updateBlog(blog.id, { status: newStatus }, "public-admin-id");
            setBlogs(blogs.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };


    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const orgNames = {
        innosphere: 'Innosphere',
        delacruz: 'Delacruz',
        echohive: 'EchoHive'
    };

    const orbitColor = {
        innosphere: 'text-blue-600',
        delacruz: 'text-purple-600',
        echohive: 'text-emerald-600'
    };

    const currentOrg = orgNames[orgId] || 'Innosphere';
    const currentTheme = orbitColor[orgId] || 'text-blue-600';

    const orgTheme = {
        innosphere: { color: 'blue-600', hover: 'blue-600', text: 'text-blue-600' },
        delacruz: { color: 'purple-600', hover: 'purple-600', text: 'text-purple-600' },
        echohive: { color: 'emerald-600', hover: 'emerald-600', text: 'text-emerald-600' }
    }[orgId] || { color: 'blue-600', hover: 'blue-600', text: 'text-blue-600' };

    const terminology = {
        innosphere: { vault: 'Vault', entry: 'Entry', archive: 'Insights Archive' },
        delacruz: { vault: 'Innovation Lab', entry: 'Protocol', archive: 'Strategic Archive' },
        echohive: { vault: 'Newsroom', entry: 'Broadcast', archive: 'Media Archive' }
    }[orgId] || { vault: 'Vault', entry: 'Entry', archive: 'Insights Archive' };

    // Show error state
    if (error) {
        return <NetworkError onRetry={fetchBlogs} message={error} orgId={orgId} />;
    }

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${currentTheme.replace('text', 'border')}`}></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-outfit uppercase italic text-left">
                        {currentOrg} <span className={currentTheme}>{terminology.vault}</span>
                    </h1>
                    <p className="mt-2 text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase text-left leading-relaxed">
                        CENTRAL MANAGEMENT SYSTEM / {currentOrg.toUpperCase()} INTELLECTUAL ASSETS
                    </p>
                </div>
                <div className="mt-6 md:mt-0">
                    <Link
                        to={`/${orgId}/create`}
                        className={`inline-flex items-center px-6 py-3 border border-gray-900 rounded-sm text-sm font-bold text-white bg-gray-900 hover:bg-${orgTheme.color} hover:border-${orgTheme.color} focus:outline-none transition-all duration-300 uppercase tracking-widest`}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Create {terminology.entry}
                    </Link>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 border border-gray-200 p-1 rounded-sm flex items-center bg-gray-50/50">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-3 bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 placeholder-gray-400"
                        placeholder={`SEARCH ${terminology.archive.toUpperCase()}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Blog Table */}
            <div className="border border-gray-200 rounded-sm overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Document
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Classification
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Workflow status
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                Modified
                            </th>
                            <th scope="col" className="relative px-6 py-4">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50/80 transition-all group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-16 border border-gray-100 rounded-sm overflow-hidden bg-gray-50">
                                            {blog.media?.coverImage ? (
                                                <img
                                                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    src={blog.media.coverImage}
                                                    alt={blog.title || 'Blog cover'}
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                                    <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-5">
                                            <div className={`text-sm font-bold text-gray-900 group-hover:${orgTheme.text} transition-colors uppercase tracking-tight`}>
                                                {blog.title}
                                                {blog.featured && (
                                                    <span className="ml-2 px-1.5 py-0.5 text-[8px] border border-amber-200 bg-amber-50 text-amber-700 rounded-sm font-black uppercase tracking-widest">
                                                        High Priority
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {blog.slug?.toUpperCase()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-[10px] font-bold text-gray-500 border border-gray-200 px-2 py-0.5 rounded-sm uppercase tracking-wider bg-white">
                                        {blog.category}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    {blog.status === 'published' || blog.status === 'draft' || blog.status === 'scheduled' ? (
                                        <button
                                            onClick={() => handleStatusToggle(blog)}
                                            className="focus:outline-none"
                                            title={blog.status === 'scheduled' ? 'View/Edit Schedule' : `Shift to ${blog.status === 'published' ? 'Draft' : 'Public'}`}
                                        >
                                            {blog.status === 'published' ? (
                                                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                                                    <CheckCircle className="h-2.5 w-2.5 mr-1" />
                                                    Live Access
                                                </span>
                                            ) : blog.status === 'scheduled' ? (
                                                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                                    <Clock className="h-2.5 w-2.5 mr-1" />
                                                    Scheduled
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                                    <Clock className="h-2.5 w-2.5 mr-1" />
                                                    Staging
                                                </span>
                                            )}
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-red-400">
                                            Archived
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5 text-[11px] font-medium text-gray-500">
                                    {blog.status === 'scheduled' && blog.dates?.scheduledAt ? (
                                        <span className="text-blue-600 flex flex-col">
                                            <span>{formatFirebaseDate(blog.dates.scheduledAt)}</span>
                                            <span className="text-[9px] uppercase tracking-tighter opacity-70">
                                                {blog.dates.scheduledAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </span>
                                    ) : (
                                        formatFirebaseDate(blog.dates?.publishedAt || blog.dates?.updatedAt)
                                    )}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <Link
                                            to={`/${orgId}/edit/${blog.id}`}
                                            className={`text-gray-400 hover:${orgTheme.text} transition-colors`}
                                            title="Edit Document"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                            title="Permanently Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-20 text-center">
                                    <p className="text-sm font-bold text-gray-300 uppercase tracking-[0.3em]">No Records Found</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogList;
