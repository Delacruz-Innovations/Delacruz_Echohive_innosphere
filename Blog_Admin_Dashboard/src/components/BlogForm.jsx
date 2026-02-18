import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Save,
    Eye,
    X,
    Plus,
    Trash2,
    Image as ImageIcon,
    ChevronUp,
    Check,
    Send,
    ArrowLeft,
    Lightbulb,
    ChevronRight,
    ChevronDown,
    Info,
    CheckCircle,
    Linkedin,
    Twitter,
    Facebook,
    Calendar,
    Clock,
    Link2,
    Share2,
    Tag,
    Globe
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { getServiceByOrgId } from '../services/serviceFactory';
import { calculateReadTime, calculateWordCount, generateSlug } from '../utils/blogUtils';
import { useAutoSave } from '../hooks/useAutoSave';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SaveIndicator from './SaveIndicator';
import DraftRecoveryPrompt from './DraftRecoveryPrompt';


const ORG_CATEGORIES = {
    innosphere: [
        "Strategy", "Operations", "Digital Transformation", "Compliance", "Innovation", "Human Capital"
    ],
    delacruz: [
        "Business Automation", "Education Technology", "Business Efficiency", "Digital Strategy", "Operations"
    ],
    echohive: [
        "Creative Strategy", "Content Production", "Digital Marketing", "Brand Identity", "Social Media"
    ]
};

const INITIAL_SECTION = {
    order: 0,
    heading: '',
    hasSubtitle: false,
    subtitle: '',
    hasSubSubtitle: false,
    subSubtitle: '',
    body: '',
    hasInsight: false,
    insight: '',
    sources: [],
    hasImage: false,
    image: '',
    imageInputType: 'upload'
};

// Quill editor configuration
const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        [{ 'align': [] }],
        ['clean']
    ]
};

const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'indent',
    'link', 'align'
];


const BlogForm = () => {
    const { id, orgId } = useParams();
    const navigate = useNavigate();
    const blogService = getServiceByOrgId(orgId);
    const isDelacruz = orgId === 'delacruz';
    const isEchoHive = orgId === 'echohive';

    const orgTheme = {
        innosphere: { color: 'blue-600', hover: 'blue-700', focus: 'blue-500', border: 'blue-600' },
        delacruz: { color: 'purple-600', hover: 'purple-700', focus: 'purple-500', border: 'purple-600' },
        echohive: { color: 'emerald-600', hover: 'emerald-700', focus: 'emerald-500', border: 'emerald-600' }
    }[orgId] || { color: 'blue-600', hover: 'blue-700', focus: 'blue-500', border: 'blue-600' };

    const categories = ORG_CATEGORIES[orgId] || ORG_CATEGORIES.innosphere;

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [tagInput, setTagInput] = useState('');


    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        category: categories[0],
        tags: [],
        relatedPosts: [],
        featured: false,
        status: 'draft',
        scheduledAt: '',
        date: '', // Display Date (e.g. "December 22, 2025")
        media: {
            coverImage: '',
            coverImageAlt: ''
        },
        reading: {
            readTime: '0 min read',
            wordCount: 0
        },
        author: {
            name: '',
            bio: ''
        },
        content: {
            intro: '',
            sections: [{ ...INITIAL_SECTION }],
            hasAuthorNote: false,
            authorNote: '',
            hasFAQs: false,
            faqs: []
        },
        seo: {
            metaTitle: '',
            metaDescription: '',
            ogImage: '',
            canonicalURL: '',
            noIndex: false
        }
    });


    useEffect(() => {
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadBlog = async () => {
        setLoading(true);
        try {
            const blog = await blogService.getBlogById(id);
            if (blog) {
                setFormData(blog);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error loading blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: val }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: val }));
        }

        if (name === 'title' && !id) {
            setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
        }
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.content.sections];
        newSections[index][field] = value;
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, sections: newSections }
        }));
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.trim().toLowerCase().replace(/,/g, '');
            if (tag && !formData.tags.includes(tag)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: [
                    ...prev.content.sections,
                    { ...INITIAL_SECTION, order: prev.content.sections.length }
                ]
            }
        }));
    };

    const removeSection = (index) => {
        if (formData.content.sections.length === 1) return;
        const newSections = formData.content.sections.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, sections: newSections }
        }));

        // Adjust active index if necessary
        if (activeSectionIndex >= newSections.length) {
            setActiveSectionIndex(Math.max(0, newSections.length - 1));
        } else if (activeSectionIndex > index) {
            setActiveSectionIndex(prev => prev - 1);
        }
    };

    const moveSection = (index, direction) => {
        const newSections = [...formData.content.sections];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= newSections.length) return;

        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];

        // Update orders
        const updatedSections = newSections.map((s, i) => ({ ...s, order: i }));

        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, sections: updatedSections }
        }));

        // Follow the moved section
        setActiveSectionIndex(newIndex);
    };

    const addFAQ = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                faqs: [...(prev.content.faqs || []), { question: '', answer: '' }]
            }
        }));
    };

    const removeFAQ = (index) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                faqs: prev.content.faqs.filter((_, i) => i !== index)
            }
        }));
    };

    const handleFAQChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                faqs: prev.content.faqs.map((faq, i) =>
                    i === index ? { ...faq, [field]: value } : faq
                )
            }
        }));
    };


    const validate = (publishing = false) => {
        if (!formData.title) return "Title is required";
        if (!formData.slug) return "Slug is required";

        if (publishing === 'scheduled') {
            if (!formData.scheduledAt) return "Scheduled date and time are required";
            if (new Date(formData.scheduledAt) <= new Date()) {
                return "Scheduled time must be in the future";
            }
        }

        if (publishing === true) {
            if (!formData.excerpt) return "Excerpt is required for publishing";
            if (!formData.content.intro) return "Intro content is required for publishing";
            if (!formData.media.coverImage) return "Cover image is required for publishing";
            if (formData.content.sections.length === 0 || !formData.content.sections[0].body) {
                return "At least one content section with body text is required for publishing";
            }
        }
        return null;
    };

    const handleSave = async (status = 'draft') => {
        const error = validate(status === 'published' ? true : status);
        if (error) {
            alert(error);
            return;
        }

        // Sanitize data based on toggles
        const sanitizedSections = formData.content.sections.map(s => ({
            ...s,
            subtitle: s.hasSubtitle ? s.subtitle : '',
            subSubtitle: s.hasSubSubtitle ? s.subSubtitle : '',
            insight: s.hasInsight ? s.insight : '',
            sources: s.hasInsight ? s.sources : []
        }));

        const sanitizedAuthorNote = formData.content.hasAuthorNote ? formData.content.authorNote : '';
        const sanitizedFAQs = formData.content.hasFAQs ? formData.content.faqs : [];

        // Calculate reading stats before saving using only visible text
        const fullText = [
            formData.content.intro,
            ...sanitizedSections.map(s => `${s.heading} ${s.subtitle} ${s.subSubtitle} ${s.body} ${s.insight} `),
            sanitizedAuthorNote,
            ...sanitizedFAQs.map(f => `${f.question} ${f.answer} `)
        ].join(' ');

        const finalData = {
            ...formData,
            status,
            content: {
                ...formData.content,
                sections: sanitizedSections,
                authorNote: sanitizedAuthorNote,
                faqs: sanitizedFAQs
            },
            image: formData.media.coverImage, // For compatibility with InsightDetails.jsx
            readTime: calculateReadTime(fullText), // For compatibility with InsightDetails.jsx
            reading: {
                readTime: calculateReadTime(fullText),
                wordCount: calculateWordCount(fullText)
            },
            scheduledAt: status === 'scheduled' ? new Date(formData.scheduledAt) : null
        };


        setLoading(true);
        try {
            if (id) {
                await blogService.updateBlog(id, finalData, "public-admin-id");
            } else {
                await blogService.createBlog(finalData, "public-admin-id");
            }
            alert(`${isDelacruz ? 'Innovation' : isEchoHive ? 'News' : 'Blog'} saved successfully!`);
            navigate(`/${orgId}/dashboard`);
        } catch (error) {

            alert(`Error saving ${isDelacruz ? 'innovation' : isEchoHive ? 'news' : 'blog'}: ` + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.title && id) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8">
                <div className="flex items-center space-x-6">
                    <button onClick={() => navigate(`/${orgId}/dashboard`)} className="p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-all">
                        <ArrowLeft className="h-5 w-5 text-gray-900" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight font-outfit uppercase text-left">
                            {id ? 'Redact' : 'Create'} <span className={`text-${orgTheme.color}`}>{isDelacruz ? 'Innovation' : isEchoHive ? 'News' : 'Insight'}</span>
                        </h1>
                        <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-left">DOCUMENT STATUS: {formData.status.toUpperCase()} / {formData.reading.readTime.toUpperCase()}</p>
                    </div>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-3">
                    <button
                        onClick={() => setShowPreview(true)}
                        className="px-6 py-3 border border-gray-200 rounded-sm text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 focus:outline-none transition-all uppercase tracking-widest flex items-center"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                    </button>
                    <button
                        disabled={loading}
                        onClick={() => handleSave(formData.status === 'scheduled' ? 'scheduled' : 'published')}
                        className={`px-6 py-3 border border-gray-900 rounded-sm text-sm font-bold text-white bg-gray-900 hover:bg-${orgTheme.hover} hover:border-${orgTheme.hover} focus:outline-none transition-all uppercase tracking-widest flex items-center`}
                    >
                        <Send className="h-4 w-4 mr-2" />
                        {formData.status === 'scheduled' ? 'Authorize Schedule' : id && formData.status === 'published' ? 'Update Insight' : 'Publish'}
                    </button>
                </div>
            </div>

            {/* QUICK STATUS BAR */}
            <div className="mb-10 flex items-center gap-4 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Access Protocol:</span>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="text-[11px] font-bold bg-white border border-gray-200 rounded-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-300 uppercase tracking-wider"
                    >
                        <option value="draft">STAGING / DRAFT</option>
                        <option value="scheduled">RESERVED / SCHEDULED</option>
                        <option value="published">LIVE / PUBLIC</option>
                    </select>
                </div>

                {formData.status === 'scheduled' && (
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 animate-in fade-in slide-in-from-left-2">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none flex items-center">
                            <Clock className="w-3 h-3 mr-1.5" />
                            Dispatch Time:
                        </span>
                        <input
                            type="datetime-local"
                            name="scheduledAt"
                            value={formData.scheduledAt}
                            onChange={handleInputChange}
                            className="text-[11px] font-bold bg-white border border-gray-200 rounded-sm px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300 font-mono"
                        />
                    </div>
                )}

                <div className="ml-auto">
                    {formData.status === 'scheduled' ? (
                        <button
                            disabled={loading}
                            onClick={() => handleSave('scheduled')}
                            className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-blue-700 transition-all flex items-center shadow-lg shadow-blue-600/20"
                        >
                            <Calendar className="w-3 h-3 mr-2" />
                            Authorize Schedule
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${formData.status === 'published' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                System Status: {formData.status === 'published' ? 'Active' : 'Standby'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {
                showPreview && (
                    <div className="fixed inset-0 z-[100] bg-[#050b1a] overflow-y-auto overflow-x-hidden selection:bg-[#6b9dc7]/30 selection:text-[#6b9dc7]">
                        <div className="fixed top-6 right-6 z-[110] flex items-center space-x-3">
                            <span className="px-3 py-1 bg-white/10 text-white/60 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/5">Preview Mode</span>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all backdrop-blur-md border border-white/10"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Progress Bar Mock */}
                        <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-white/5">
                            <div className="h-full bg-gradient-to-r from-[#6b9dc7] to-blue-400 w-full"></div>
                        </div>

                        {/* Template Content */}
                        {isEchoHive ? (
                            <div className="min-h-screen bg-black text-white font-inter text-left relative overflow-hidden">
                                {/* EchoHive Hero Section */}
                                <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
                                    <div className="max-w-7xl relative z-10">
                                        <p className="text-sm tracking-widest text-emerald-400 mb-6 uppercase font-bold">{formData.category}</p>
                                        <h1 className="text-4xl md:text-7xl font-black leading-tight mb-8 uppercase tracking-tighter">
                                            {formData.title || "NEWSROOM ENTRY"}
                                        </h1>
                                        <p className="text-gray-400 text-lg mb-8 uppercase tracking-widest font-medium">{formData.date || "FOR IMMEDIATE RELEASE"}</p>
                                        {formData.hasRegister && (
                                            <button className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105 uppercase tracking-widest">
                                                REGISTER INTEREST
                                            </button>
                                        )}
                                    </div>
                                    {/* Ambient Background for EchoHive */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[120px]"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
                                    </div>
                                </section>

                                {/* EchoHive Image Section */}
                                <div className="relative h-[600px] w-full overflow-hidden border-y border-white/10">
                                    {formData.media.coverImage ? (
                                        <img src={formData.media.coverImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-900" />
                                    )}
                                </div>

                                {/* EchoHive Content Section */}
                                <section className="relative py-32 px-6 md:px-20 bg-black">
                                    <div className="max-w-5xl mx-auto">
                                        {formData.content.intro && (
                                            <div
                                                className="text-3xl md:text-5xl font-black mb-16 text-emerald-400 uppercase tracking-tighter leading-none ql-editor-preview"
                                                dangerouslySetInnerHTML={{ __html: formData.content.intro }}
                                            />
                                        )}

                                        <div className="space-y-12">
                                            {formData.content.sections.map((section, idx) => (
                                                <div key={idx} className="border-l-2 border-emerald-500/30 pl-8 py-4">
                                                    {section.heading && (
                                                        <h3 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight text-white">
                                                            {section.heading}
                                                        </h3>
                                                    )}
                                                    <div
                                                        className="text-lg md:text-xl leading-relaxed text-gray-400 ql-editor-preview space-y-6"
                                                        dangerouslySetInnerHTML={{ __html: section.body }}
                                                    />
                                                    {section.hasImage && section.image && (
                                                        <div className="mt-10 rounded-lg overflow-hidden border border-white/5">
                                                            <img src={section.image} className="w-full h-auto grayscale hover:grayscale-0 transition-opacity duration-700" alt="" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {formData.content.hasAuthorNote && (
                                            <div className="mt-32 pt-20 border-t border-white/10">
                                                <p className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-6">Manifesto / Note</p>
                                                <div
                                                    className="text-2xl font-bold text-white leading-relaxed ql-editor-preview"
                                                    dangerouslySetInnerHTML={{ __html: formData.content.authorNote }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        ) : isDelacruz ? (
                            <div className="min-h-screen bg-black text-white font-inter text-left">
                                {/* Hero Section */}
                                <div className="relative py-28 px-4 sm:px-6 lg:px-8 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
                                    <div className="absolute inset-0">
                                        {formData.media.coverImage ? (
                                            <img src={formData.media.coverImage} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
                                    </div>

                                    <div className="max-w-4xl mx-auto relative z-10 opacity-100 translate-y-0 text-left">
                                        <div className="mb-8 flex items-center gap-2 text-purple-400">
                                            <ArrowLeft className="w-5 h-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Digital Insights Archive</span>
                                        </div>

                                        <div className="mb-6">
                                            <span className="bg-purple-600 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em]">
                                                {formData.category}
                                            </span>
                                        </div>

                                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] text-white text-left uppercase tracking-tight">
                                            {formData.title || "Untitled Innovation"}
                                        </h1>

                                        <div
                                            className="text-xl sm:text-2xl text-gray-400 mb-8 leading-relaxed ql-editor-preview text-left line-clamp-3 font-light"
                                            dangerouslySetInnerHTML={{ __html: formData.excerpt }}
                                        />

                                        <div className="flex items-center gap-6 text-gray-500 flex-wrap">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{formData.date || "SCHEDULED"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5" />
                                                <span className="text-xs font-bold uppercase tracking-widest">{formData.reading.readTime}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-400 ml-auto cursor-pointer group">
                                                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Share Protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="bg-black">
                                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                                        {/* Introduction / Quote Section */}
                                        {formData.content.intro && (
                                            <div className="mb-16">
                                                <div
                                                    className="text-xl sm:text-3xl font-light text-gray-300 leading-relaxed ql-editor-preview text-left border-l-4 border-purple-500 pl-8"
                                                    dangerouslySetInnerHTML={{ __html: formData.content.intro }}
                                                />
                                            </div>
                                        )}

                                        {/* Article Body */}
                                        <article className="prose prose-invert prose-lg max-w-none">
                                            {formData.content.sections.map((section, index) => (
                                                <div key={index} className="mb-16">
                                                    {section.heading && (
                                                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 mt-12 text-left uppercase tracking-tight">
                                                            {section.heading}
                                                        </h2>
                                                    )}
                                                    <div
                                                        className="text-lg leading-relaxed text-gray-400 ql-editor-preview text-left space-y-6"
                                                        dangerouslySetInnerHTML={{ __html: section.body }}
                                                    />
                                                    {section.hasImage && section.image && (
                                                        <div className="my-10 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                                                            <img src={section.image} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                                                        </div>
                                                    )}
                                                    {section.hasInsight && (
                                                        <div className="bg-gray-900 border-l-4 border-purple-500 p-8 sm:p-10 rounded-r-xl my-10 relative overflow-hidden group">
                                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                                <Lightbulb size={120} className="text-purple-500" />
                                                            </div>
                                                            <div className="relative z-10">
                                                                <div className="flex items-center gap-3 mb-6 text-purple-400">
                                                                    <Lightbulb size={24} />
                                                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Innovation Insight</span>
                                                                </div>
                                                                <div
                                                                    className="text-xl sm:text-2xl font-bold text-gray-200 ql-editor-preview text-left leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: section.insight }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            {/* Author Section */}
                                            <div className="bg-gray-900 rounded-xl p-10 sm:p-12 lg:p-16 my-20 border border-gray-800 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                                                <h3 className="text-2xl sm:text-3xl font-black text-white mb-10 flex items-center gap-4 text-left uppercase tracking-tighter">
                                                    <div className="w-2 h-10 bg-purple-600 rounded-sm"></div>
                                                    AUTHORS & STRATEGISTS
                                                </h3>
                                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                                    <div className="w-20 h-20 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-3xl font-black flex-shrink-0 font-outfit">
                                                        {formData.author.name ? formData.author.name.charAt(0) : 'D'}
                                                    </div>
                                                    <div>
                                                        <p className="text-xl font-black text-white mb-4 text-left uppercase tracking-tight">{formData.author.name || "Delacruz Architect"}</p>
                                                        <p className="text-gray-400 leading-relaxed text-lg text-left font-light">
                                                            {formData.author.bio || "Lead strategy and innovation expert at Delacruz Innovations."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Editor Note */}
                                            {formData.content.hasAuthorNote && (
                                                <div
                                                    className="text-xs text-gray-600 mt-12 border-t border-gray-900 pt-8 ql-editor-preview text-left leading-relaxed uppercase tracking-wider"
                                                    dangerouslySetInnerHTML={{ __html: formData.content.authorNote }}
                                                />
                                            )}
                                        </article>
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
                                    <div className="max-w-4xl mx-auto text-center">
                                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 uppercase tracking-tighter">
                                            Evolve Your <span className="text-purple-600">Enterprise</span>
                                        </h3>
                                        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                                            Stop losing time to manual workflows. Contact Delacruz Innovations today to schedule a discovery session.
                                        </p>
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-black px-10 py-5 rounded-sm transition-all uppercase tracking-[0.2em] text-sm shadow-2xl shadow-purple-600/20 active:scale-95">
                                            INITIALIZE CONNECTION
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="min-h-screen text-white font-inter text-left">
                                {/* Hero Section */}
                                <div className="relative pt-32 pb-16 overflow-hidden">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6b9dc7]/10 rounded-full blur-[120px]"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
                                    </div>

                                    <div className="container mx-auto px-6 relative z-10">
                                        <div className="max-w-4xl">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="px-3 py-1 bg-[#6b9dc7]/10 border border-[#6b9dc7]/20 rounded-full text-[#6b9dc7] text-xs font-bold tracking-widest uppercase text-left">
                                                    {formData.category}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <div className="flex items-center text-gray-400 text-xs font-medium uppercase tracking-wider">
                                                    <Clock size={14} className="mr-1.5" />
                                                    {formData.reading.readTime}
                                                </div>
                                            </div>

                                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white uppercase font-outfit text-left">
                                                {formData.title || "Untitled Insight"}
                                            </h1>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-[#6b9dc7]/20 border border-[#6b9dc7]/30 flex items-center justify-center text-[#6b9dc7] font-bold text-lg mr-4 uppercase">
                                                        {formData.author.name ? formData.author.name.charAt(0) : 'E'}
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="text-white font-semibold">{formData.author.name || "Innosphere Editorial"}</div>
                                                        <div className="text-gray-400 text-sm flex items-center">
                                                            <Calendar size={12} className="mr-1.5" />
                                                            {formData.date || "Scheduled Post"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="container mx-auto px-6 py-12">
                                    <div className="max-w-7xl mx-auto">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                            {/* Sidebar */}
                                            <aside className="lg:col-span-3 hidden lg:block">
                                                <div className="sticky top-32 space-y-12">
                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2 text-left">Contents</h3>
                                                        <nav>
                                                            <ul className="space-y-4">
                                                                {formData.content.sections.map((section, index) => (
                                                                    <li key={index}>
                                                                        <div className="flex items-center text-sm text-gray-400 group cursor-default transition-colors text-left">
                                                                            <span className="w-1.5 h-1.5 rounded-full mr-3 bg-gray-700 group-hover:bg-[#6b9dc7]"></span>
                                                                            <span className="line-clamp-1">{section.heading || `Section ${index + 1}`}</span>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </nav>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2 text-left">Share</h3>
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex items-center gap-3 text-gray-600 transition-colors">
                                                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                                    <Linkedin size={18} />
                                                                </div>
                                                                <span className="text-sm font-medium">LinkedIn</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-gray-600 transition-colors">
                                                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                                                    <Twitter size={18} />
                                                                </div>
                                                                <span className="text-sm font-medium">Twitter</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </aside>

                                            {/* Article Body */}
                                            <article className="lg:col-span-9">
                                                {/* Featured Image */}
                                                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
                                                    {formData.media.coverImage ? (
                                                        <img src={formData.media.coverImage} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                            <ImageIcon size={48} className="text-white/20" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-60"></div>
                                                </div>

                                                {/* Introduction */}
                                                <div className="mb-16">
                                                    <div
                                                        className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light border-l-4 border-[#6b9dc7] pl-8 text-left ql-editor-preview"
                                                        dangerouslySetInnerHTML={{ __html: formData.content.intro || "<p class='text-gray-500'>Introduction pending...</p>" }}
                                                    />
                                                </div>

                                                {/* Sections */}
                                                <div className="space-y-24">
                                                    {formData.content.sections.map((section, index) => (
                                                        <div key={index}>
                                                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight font-outfit text-left uppercase">
                                                                {section.heading || `Section ${index + 1}`}
                                                            </h2>

                                                            {section.hasSubtitle && section.subtitle && (
                                                                <h3 className="text-xl md:text-2xl font-semibold text-[#6b9dc7] mb-2 font-outfit text-left">
                                                                    {section.subtitle}
                                                                </h3>
                                                            )}

                                                            {section.hasSubSubtitle && section.subSubtitle && (
                                                                <h4 className="text-lg font-medium text-gray-400 mb-6 font-outfit text-left uppercase tracking-wider">
                                                                    {section.subSubtitle}
                                                                </h4>
                                                            )}

                                                            {/* Section Image */}
                                                            {section.hasImage && section.image && (
                                                                <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
                                                                    <img
                                                                        src={section.image}
                                                                        alt={section.heading || `Section ${index + 1}`}
                                                                        className="w-full h-auto object-cover"
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="prose prose-invert prose-lg max-w-none">
                                                                <div
                                                                    className="text-gray-300 leading-relaxed space-y-6 text-lg font-inter text-left ql-editor-preview"
                                                                    dangerouslySetInnerHTML={{ __html: section.body || "<p class='text-gray-500'>Section body text goes here...</p>" }}
                                                                />
                                                            </div>

                                                            {/* Insight Box */}
                                                            {section.hasInsight && section.insight && (
                                                                <div className="mt-10 bg-gradient-to-br from-[#6b9dc7]/20 to-blue-900/10 border border-[#6b9dc7]/30 rounded-2xl p-8 relative overflow-hidden">
                                                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                                                        <Lightbulb size={120} className="text-[#6b9dc7]" />
                                                                    </div>
                                                                    <div className="relative z-10 font-outfit text-left">
                                                                        <div className="flex items-center gap-3 mb-4 text-[#6b9dc7]">
                                                                            <div className="p-2 bg-[#6b9dc7]/20 rounded-lg">
                                                                                <Lightbulb size={20} />
                                                                            </div>
                                                                            <span className="font-bold uppercase tracking-wider text-sm tracking-[0.2em]">Innosphere Insight</span>
                                                                        </div>
                                                                        <div
                                                                            className="text-xl text-white font-medium leading-relaxed ql-editor-preview"
                                                                            dangerouslySetInnerHTML={{ __html: section.insight }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Final Note */}
                                                {formData.content.hasAuthorNote && formData.content.authorNote && (
                                                    <div className="mt-24 p-1 rounded-2xl bg-gradient-to-r from-[#6b9dc7] to-blue-500 shadow-xl shadow-blue-900/20">
                                                        <div className="bg-[#050b1a] rounded-[15px] p-10 md:p-14">
                                                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center font-outfit text-left uppercase tracking-tight">
                                                                <ChevronRight className="text-[#6b9dc7] mr-2" />
                                                                Final Takeaway
                                                            </h3>
                                                            <div
                                                                className="text-xl text-gray-300 leading-relaxed font-light font-inter text-left ql-editor-preview"
                                                                dangerouslySetInnerHTML={{ __html: formData.content.authorNote }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Author Bio */}
                                                <div className="mt-24 pt-16 border-t border-white/10">
                                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/5 p-8 rounded-2xl border border-white/10 font-inter">
                                                        <div className="w-24 h-24 rounded-full bg-[#6b9dc7]/20 border border-[#6b9dc7]/30 flex items-center justify-center text-[#6b9dc7] text-3xl font-bold flex-shrink-0 uppercase">
                                                            {formData.author.name ? formData.author.name.charAt(0) : 'E'}
                                                        </div>
                                                        <div className="text-center md:text-left">
                                                            <h4 className="text-2xl font-bold text-white mb-4 uppercase font-outfit">
                                                                About <span className="text-[#6b9dc7]">{formData.author.name || "Innosphere Editorial"}</span>
                                                            </h4>
                                                            <p className="text-gray-400 leading-relaxed text-lg text-left">
                                                                {formData.author.bio || "Innosphere Consulting strategy and insight team."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* FAQ Section */}
                                                {formData.content.hasFAQs && formData.content.faqs && formData.content.faqs.length > 0 && (
                                                    <div className="mt-24">
                                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight font-outfit text-left uppercase">
                                                            Frequently Asked Questions
                                                        </h2>
                                                        <div className="space-y-6">
                                                            {formData.content.faqs.map((faq, index) => (
                                                                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                                                                    <h3 className="text-xl font-bold text-[#6b9dc7] mb-3 font-outfit uppercase">
                                                                        {index + 1}. {faq.question || `Question ${index + 1}`}
                                                                    </h3>
                                                                    <div
                                                                        className="text-gray-300 leading-relaxed text-left ql-editor-preview"
                                                                        dangerouslySetInnerHTML={{ __html: faq.answer || "<p class='text-gray-500'>Answer pending...</p>" }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Form Area */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Base Info */}
                    {/* Base Info */}
                    <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                01. SOURCE DATA / CORE INFORMATION
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Headline Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-900 font-bold focus:border-${orgTheme.focus} focus:ring-1 focus:ring-${orgTheme.focus} outline-none transition-all placeholder-gray-300`}
                                    placeholder="Enter report title..."
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">System Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        className="w-full px-4 py-3 border border-gray-100 rounded-sm bg-gray-50/50 text-gray-400 font-mono text-xs uppercase cursor-not-allowed"
                                        value={formData.slug}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Display Timestamp</label>
                                    <input
                                        type="text"
                                        name="date"
                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-900 font-medium focus:border-${orgTheme.focus} focus:ring-1 focus:ring-${orgTheme.focus} transition-all outline-none placeholder-gray-300`}
                                        placeholder="e.g. JANUARY 30, 2026"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Document Classification</label>
                                <select
                                    name="category"
                                    className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-gray-900 font-bold focus:border-${orgTheme.focus} focus:ring-1 focus:ring-${orgTheme.focus} outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25em_1.25em] bg-[right_0.5rem_center] bg-no-repeat`}
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Tag className="h-3 w-3" /> Content Taxonomy (Tags)
                                </label>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map(tag => (
                                            <span key={tag} className={`inline-flex items-center px-2 py-1 bg-${orgTheme.color}/10 text-${orgTheme.color} text-[10px] font-bold uppercase rounded-sm border border-${orgTheme.color}/20`}>
                                                {tag}
                                                <button onClick={() => removeTag(tag)} className="ml-1.5 hover:text-red-500 transition-colors">
                                                    <X className="h-2.5 w-2.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-2 border border-gray-200 rounded-sm text-xs font-mono focus:border-${orgTheme.focus} outline-none uppercase placeholder-gray-300 bg-gray-50/30`}
                                        placeholder="Add tag and press Enter or Comma..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Executive Summary</label>
                                <div className="quill-wrapper border border-gray-200 rounded-sm overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.excerpt}
                                        onChange={(content) => setFormData(prev => ({ ...prev, excerpt: content }))}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        placeholder="Brief technical summary..."
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content Editor */}
                    <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                02. MANUSCRIPT / NARRATIVE ARCHITECTURE
                            </h2>
                        </div>
                        <div className="p-6 space-y-10">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Introductory Narrative</label>
                                <div className="quill-wrapper border border-gray-200 rounded-sm overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content.intro}
                                        onChange={(content) => setFormData(prev => ({ ...prev, content: { ...prev.content, intro: content } }))}
                                        modules={quillModules}
                                        formats={quillFormats}
                                        placeholder="Commence the document introduction..."
                                        className="bg-white"
                                    />
                                </div>
                            </div>

                            {/* Sections Builder */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border border-gray-200 bg-gray-50/50 p-4 rounded-sm">
                                    <div className="flex items-center gap-6">
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">STRUCTURED SECTIONS</h3>
                                        <div className="flex items-center bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                                            <button
                                                type="button"
                                                disabled={activeSectionIndex === 0}
                                                onClick={() => setActiveSectionIndex(prev => prev - 1)}
                                                className="p-2 hover:bg-gray-50 border-r border-gray-100 disabled:opacity-30 transition-all"
                                            >
                                                <ChevronUp className="h-3.5 w-3.5 text-gray-600 -rotate-90" />
                                            </button>
                                            <span className="text-[10px] font-bold text-gray-500 px-4 min-w-[100px] text-center uppercase tracking-tighter">
                                                INDEX {activeSectionIndex + 1} OF {formData.content.sections.length}
                                            </span>
                                            <button
                                                type="button"
                                                disabled={activeSectionIndex === formData.content.sections.length - 1}
                                                onClick={() => setActiveSectionIndex(prev => prev + 1)}
                                                className="p-2 hover:bg-gray-50 border-l border-gray-100 disabled:opacity-30 transition-all"
                                            >
                                                <ChevronUp className="h-3.5 w-3.5 text-gray-600 rotate-90" />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addSection();
                                            setActiveSectionIndex(formData.content.sections.length);
                                        }}
                                        className={`text-[10px] font-bold px-4 py-2 bg-gray-900 text-white hover:bg-${orgTheme.hover} rounded-sm flex items-center shadow-sm transition-all uppercase tracking-widest`}
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-1" /> APPEND SECTION
                                    </button>
                                </div>

                                {formData.content.sections.map((section, index) => (
                                    <div
                                        key={index}
                                        className={`p - 6 bg - white border border - gray - 200 rounded - sm relative group transition - all duration - 300 ${activeSectionIndex === index ? 'block opacity-100' : 'hidden opacity-0'} `}
                                    >
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-sm tracking-widest">
                                                    #{String(index + 1).padStart(2, '0')}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">SECTION CONFIGURATION</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => moveSection(index, 'up')}
                                                    disabled={index === 0}
                                                    className="p-2 hover:bg-gray-50 border border-gray-100 rounded-sm disabled:opacity-30 transition-all"
                                                >
                                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => moveSection(index, 'down')}
                                                    disabled={index === formData.content.sections.length - 1}
                                                    className="p-2 hover:bg-gray-50 border border-gray-100 rounded-sm disabled:opacity-30 transition-all"
                                                >
                                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                                </button>
                                                <div className="w-[1px] h-4 bg-gray-200 mx-2"></div>
                                                <button
                                                    onClick={() => removeSection(index)}
                                                    className="p-2 hover:bg-red-50 border border-red-100 rounded-sm text-red-400 transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 font-mono">Section Header</label>
                                                    <input
                                                        type="text"
                                                        placeholder="ENTER PRIMARY HEADING..."
                                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-lg font-bold outline-none focus:border-${orgTheme.focus} transition-all uppercase tracking-tight placeholder-gray-200`}
                                                        value={section.heading}
                                                        onChange={(e) => handleSectionChange(index, 'heading', e.target.value)}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-sm shadow-sm group hover:border-blue-200 transition-all">
                                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Include Sub-header (L2)</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={section.hasSubtitle || false}
                                                                onChange={(e) => handleSectionChange(index, 'hasSubtitle', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}`}></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-sm shadow-sm group hover:border-blue-200 transition-all">
                                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Include Sub-header (L3)</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={section.hasSubSubtitle || false}
                                                                onChange={(e) => handleSectionChange(index, 'hasSubSubtitle', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}"></div>
                                                        </label>
                                                    </div>
                                                </div>

                                                {section.hasSubtitle && (
                                                    <input
                                                        type="text"
                                                        placeholder="ENTER SECONDARY SUB-HEADING..."
                                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-md font-bold text-${orgTheme.color} outline-none focus:border-${orgTheme.focus} bg-${orgTheme.color}/5 animate-in fade-in slide-in-from-top-1 duration-200 uppercase tracking-tight placeholder-${orgTheme.color}/30`}
                                                        value={section.subtitle}
                                                        onChange={(e) => handleSectionChange(index, 'subtitle', e.target.value)}
                                                    />
                                                )}

                                                {section.hasSubSubtitle && (
                                                    <input
                                                        type="text"
                                                        placeholder="ENTER TERTIARY SUB-HEADING..."
                                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-bold text-gray-500 outline-none focus:border-${orgTheme.focus} bg-gray-50/50 animate-in fade-in slide-in-from-top-1 duration-200 uppercase tracking-tight placeholder-gray-300`}
                                                        value={section.subSubtitle}
                                                        onChange={(e) => handleSectionChange(index, 'subSubtitle', e.target.value)}
                                                    />
                                                )}
                                            </div>

                                            {/* Media Toggle */}
                                            <div className="flex items-center justify-between p-4 border border-gray-100 bg-gray-50/30 rounded-sm">
                                                <div className="flex items-center gap-3">
                                                    <ImageIcon className="h-4 w-4 text-gray-400" />
                                                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Visual Asset Integration</span>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={section.hasImage || false}
                                                        onChange={(e) => handleSectionChange(index, 'hasImage', e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}`}></div>
                                                </label>
                                            </div>

                                            {section.hasImage && (
                                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm space-y-4">
                                                    <div className="flex gap-1 p-1 bg-white border border-gray-100 rounded-sm">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSectionChange(index, 'imageInputType', 'upload')}
                                                            className={`flex - 1 px - 3 py - 2 text - [10px] font - bold uppercase tracking - widest transition - all ${(!section.imageInputType || section.imageInputType === 'upload') ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'} `}
                                                        >
                                                            Local Upload
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSectionChange(index, 'imageInputType', 'url')}
                                                            className={`flex - 1 px - 3 py - 2 text - [10px] font - bold uppercase tracking - widest transition - all ${section.imageInputType === 'url' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'} `}
                                                        >
                                                            Network URL
                                                        </button>
                                                    </div>
                                                    {(!section.imageInputType || section.imageInputType === 'upload') ? (
                                                        <div className="space-y-2">
                                                            <input type="file" accept="image/*" onChange={(e) => handleSectionImageUpload(e, index)} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer" />
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">SPECS: JPG / PNG / GIF / MAX-1200PX</p>
                                                        </div>
                                                    ) : (
                                                        <input type="text" placeholder="HTTPS://PATH-TO-ASSET.JPG" className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-xs font-mono focus:border-${orgTheme.focus} outline-none uppercase placeholder-gray-300`} value={section.image || ''} onChange={(e) => handleSectionChange(index, 'image', e.target.value)} />
                                                    )}
                                                    {section.image && (
                                                        <div className="relative aspect-video border border-gray-200 rounded-sm overflow-hidden bg-white">
                                                            <img src={section.image} alt="Preview" className="h-full w-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700" onError={(e) => { e.target.style.display = 'none'; }} />
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="quill-wrapper border border-gray-200 rounded-sm overflow-hidden">
                                                <ReactQuill theme="snow" value={section.body} onChange={(content) => handleSectionChange(index, 'body', content)} modules={quillModules} formats={quillFormats} placeholder="COMMENCE SECTION MANUSCRIPT..." className="bg-white" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className={`flex items-center justify-between p-4 bg-${orgTheme.color}/5 border border-${orgTheme.focus}/20 rounded-sm shadow-sm`}>
                                                    <div className={`flex items-center gap-3 text-${orgTheme.color}`}>
                                                        <Lightbulb className="h-4 w-4" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{isEchoHive ? 'Creative Spark' : isDelacruz ? 'Innovation Pulse' : 'Integrated Strategic Insight'}</span>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" checked={section.hasInsight || false} onChange={(e) => handleSectionChange(index, 'hasInsight', e.target.checked)} className="sr-only peer" />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}"></div>
                                                    </label>
                                                </div>
                                                {section.hasInsight && (
                                                    <div className={`bg-${orgTheme.color}/5 p-6 rounded-sm border border-${orgTheme.focus}/20 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300`}>
                                                        <div>
                                                            <label className={`block text-[10px] font-bold text-${orgTheme.color} uppercase tracking-widest mb-2 font-mono flex items-center`}>
                                                                <Info className="h-3 w-3 mr-2" /> Insight Narrative
                                                            </label>
                                                            <div className={`quill-wrapper border border-${orgTheme.focus}/30 rounded-sm overflow-hidden shadow-sm`}>
                                                                <ReactQuill theme="snow" value={section.insight} onChange={(content) => handleSectionChange(index, 'insight', content)} modules={quillModules} formats={quillFormats} placeholder="Enter proprietary strategic insight..." className="bg-white" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className={`block text-[10px] font-bold text-${orgTheme.color}/60 uppercase tracking-[0.2em] mb-2 font-mono`}>Source Attributions</label>
                                                            <input type="text" placeholder="E.G. HARVARD BUSINESS REVIEW / MIT LABS" className={`w-full px-4 py-3 bg-white border border-${orgTheme.focus}/20 rounded-sm focus:border-${orgTheme.focus} outline-none text-[10px] font-bold uppercase tracking-widest`} value={section.sources ? section.sources.join(', ') : ''} onChange={(e) => handleSectionChange(index, 'sources', e.target.value.split(',').map(s => s.trim()))} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-sm shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Appendix: Author's Closing Statement</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.content.hasAuthorNote || false}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                content: { ...prev.content, hasAuthorNote: e.target.checked }
                                            }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}"></div>
                                    </label>
                                </div>

                                {formData.content.hasAuthorNote && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 border border-gray-200 rounded-sm overflow-hidden">
                                        <div className="quill-wrapper">
                                            <ReactQuill
                                                theme="snow"
                                                value={formData.content.authorNote}
                                                onChange={(content) => setFormData(prev => ({ ...prev, content: { ...prev.content, authorNote: content } }))}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Enter final executive conclusions..."
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    03. FREQUENTLY ASKED QUESTIONS
                                </h2>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.content.hasFAQs || false}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            content: { ...prev.content, hasFAQs: e.target.checked }
                                        }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-${orgTheme.color}"></div>
                                </label>
                            </div>

                            {formData.content.hasFAQs && (
                                <button
                                    type="button"
                                    onClick={addFAQ}
                                    className={`px-3 py-1.5 text-[10px] font-bold text-white bg-gray-900 hover:bg-${orgTheme.hover} rounded-sm transition-all flex items-center uppercase tracking-widest`}
                                >
                                    <Plus className="h-3 w-3 mr-1" />
                                    APPEND FAQ
                                </button>
                            )}
                        </div>

                        {formData.content.hasFAQs && (
                            <div className="p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                {(!formData.content.faqs || formData.content.faqs.length === 0) ? (
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center py-8 border-2 border-dashed border-gray-100 rounded-sm">NO FAQ ENTRIES DETECTED</p>
                                ) : (
                                    <div className="space-y-6">
                                        {formData.content.faqs.map((faq, index) => (
                                            <div key={index} className="border border-gray-100 rounded-sm p-5 bg-gray-50/30 group hover:border-gray-300 transition-all">
                                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">QUERY REFERENCE #{index + 1}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFAQ(index)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Subject Question</label>
                                                        <input
                                                            type="text"
                                                            className={`w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:border-${orgTheme.focus} outline-none text-sm font-bold placeholder-gray-200 uppercase`}
                                                            placeholder="ENTER QUESTION..."
                                                            value={faq.question}
                                                            onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Resolution Narrative</label>
                                                        <div className="quill-wrapper border border-gray-200 rounded-sm overflow-hidden">
                                                            <ReactQuill
                                                                theme="snow"
                                                                value={faq.answer}
                                                                onChange={(content) => handleFAQChange(index, 'answer', content)}
                                                                modules={quillModules}
                                                                formats={quillFormats}
                                                                placeholder="Enter detailed response..."
                                                                className="bg-white"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                </div >

                {/* Sidebar Controls */}
                < div className="space-y-10" >

                    {/* Media Section */}
                    < section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]" >
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">04. MEDIA / ASSET GALLERY</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="aspect-[16/10] bg-gray-50 rounded-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-blue-300">
                                {formData.media.coverImage ? (
                                    <>
                                        <img src={formData.media.coverImage} className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt="Cover preview" />
                                        <button
                                            onClick={() => setFormData(p => ({ ...p, media: { ...p.media, coverImage: '' } }))}
                                            className="absolute top-3 right-3 p-2 bg-gray-900/80 text-white rounded-sm hover:bg-red-600 transition-all"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="h-8 w-8 text-gray-300 mb-3" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            PREVIEW PENDING URL INPUT
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Manual Asset Source</label>
                                    <input
                                        type="text"
                                        name="media.coverImage"
                                        placeholder="HTTPS://UNSPLASH.COM/..."
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-xs font-mono focus:border-blue-500 outline-none uppercase placeholder-gray-300"
                                        value={formData.media.coverImage}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Descriptive Alt Text</label>
                                    <input
                                        type="text"
                                        name="media.coverImageAlt"
                                        placeholder="TECHNICAL VISUALIZATION OF..."
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-sm text-[10px] font-bold focus:border-blue-500 outline-none uppercase placeholder-gray-300"
                                        value={formData.media.coverImageAlt}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </section >

                    {/* Author Section */}
                    < section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]" >
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">05. PROVENANCE / AUTHOR-SHIP</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Author Name</label>
                                <input
                                    type="text"
                                    name="author.name"
                                    placeholder="DESIGNATED CONTRIBUTOR"
                                    className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-sm font-bold focus:border-${orgTheme.focus} outline-none uppercase placeholder-gray-300 transition-all`}
                                    value={formData.author.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Professional Biography</label>
                                <textarea
                                    name="author.bio"
                                    placeholder="ENTER BRIEF CREDENTIALS..."
                                    className={`w-full px-4 py-3 border border-gray-200 rounded-sm h-28 text-xs font-medium focus:border-${orgTheme.focus} outline-none uppercase resize-none transition-all leading-relaxed`}
                                    value={formData.author.bio}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </section >

                    {/* SEO Section */}
                    < section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]" >
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">06. SEARCH OPTIMIZATION</h2>
                        </div>
                        <div className="p-6 space-y-10">
                            {/* Visual Previews */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Google SERP Preview */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search Result Preview</h3>
                                    <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-sm max-w-lg">
                                        <div className="text-[#1a0dab] text-xl font-medium truncate mb-1 font-arial">
                                            {formData.seo.metaTitle || formData.title || "Your Blog Title Goes Here"}
                                        </div>
                                        <div className="text-[#006621] text-sm mb-1 truncate">
                                            https://{orgId}.com/insights/{formData.slug || "your-slug"}
                                        </div>
                                        <div className="text-[#4d5156] text-sm line-clamp-2 leading-relaxed">
                                            {formData.seo.metaDescription || "Provide a compelling meta description to improve your click-through rate in search results..."}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Card Preview */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Social Card Preview</h3>
                                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm max-w-sm">
                                        <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center relative">
                                            {formData.media.coverImage ? (
                                                <img src={formData.media.coverImage} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <ImageIcon className="w-8 h-8 text-gray-300" />
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-sm p-3">
                                                <div className="text-white text-[10px] font-bold uppercase tracking-widest truncate">
                                                    {orgId.toUpperCase()} INSIGHTS
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                                            <div className="text-gray-900 font-bold text-sm line-clamp-2 mb-1">
                                                {formData.seo.metaTitle || formData.title || "Social Media Headline"}
                                            </div>
                                            <div className="text-gray-500 text-xs truncate uppercase tracking-tighter">
                                                {orgId}.COM • READ MORE
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 flex justify-between">
                                        Meta Headline <span className={`${formData.seo.metaTitle.length > 50 && formData.seo.metaTitle.length <= 60 ? 'text-orange-500' : formData.seo.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'} font-mono tracking-tighter`}>{formData.seo.metaTitle.length}/60</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="seo.metaTitle"
                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-xs font-bold focus:border-${orgTheme.focus} outline-none uppercase border-l-4 border-l-${orgTheme.focus}`}
                                        value={formData.seo.metaTitle}
                                        onChange={handleInputChange}
                                        maxLength={70}
                                    />
                                    <p className="mt-1.5 text-[9px] text-gray-400 font-medium">Recommended length: 50-60 characters.</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 flex justify-between">
                                        Meta Description <span className={`${formData.seo.metaDescription.length > 150 && formData.seo.metaDescription.length <= 160 ? 'text-orange-500' : formData.seo.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'} font-mono tracking-tighter`}>{formData.seo.metaDescription.length}/160</span>
                                    </label>
                                    <textarea
                                        name="seo.metaDescription"
                                        className={`w-full px-4 py-3 border border-gray-200 rounded-sm h-24 text-xs font-medium focus:border-${orgTheme.focus} outline-none uppercase resize-none leading-relaxed border-l-4 border-l-${orgTheme.focus}`}
                                        value={formData.seo.metaDescription}
                                        onChange={handleInputChange}
                                        maxLength={200}
                                    />
                                    <p className="mt-1.5 text-[9px] text-gray-400 font-medium">Recommended length: 150-160 characters.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 items-center flex gap-2">
                                            <Globe className="h-3 w-3" /> Canonical URL
                                        </label>
                                        <input
                                            type="url"
                                            name="seo.canonicalURL"
                                            placeholder="https://example.com/original-post"
                                            className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-xs font-mono focus:border-${orgTheme.focus} outline-none bg-gray-50/20`}
                                            value={formData.seo.canonicalURL}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Spider Governance</label>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-gray-100 rounded-sm">
                                            <input
                                                type="checkbox"
                                                id="noIndex"
                                                name="seo.noIndex"
                                                checked={formData.seo.noIndex}
                                                onChange={handleInputChange}
                                                className={`w-4 h-4 rounded-sm border-gray-300 text-${orgTheme.color} focus:ring-${orgTheme.focus}`}
                                            />
                                            <label htmlFor="noIndex" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest cursor-pointer">
                                                Enable No-Index Protocol
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Settings Section */}
                    <section className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">07. GOVERNANCE / VISIBILITY</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <Link2 className="h-3 w-3" /> Related Insights (Cross-Linking)
                                </label>
                                <input
                                    type="text"
                                    name="relatedPosts"
                                    placeholder="Enter blog IDs separated by commas..."
                                    className={`w-full px-4 py-3 border border-gray-200 rounded-sm text-xs font-mono focus:border-${orgTheme.focus} outline-none bg-gray-50/20 uppercase placeholder-gray-300 transition-all`}
                                    value={Array.isArray(formData.relatedPosts) ? formData.relatedPosts.join(', ') : ''}
                                    onChange={(e) => {
                                        const ids = e.target.value.split(',').map(id => id.trim()).filter(id => id);
                                        setFormData(prev => ({ ...prev, relatedPosts: ids }));
                                    }}
                                />
                                <p className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">Linking related content boosts SEO and user session duration.</p>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-sm">
                                <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Mark as Featured Insight</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleInputChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-${orgTheme.color}"></div>
                                </label>
                            </div>

                            {/* Accessibility Guardrail */}
                            {!formData.media.coverImageAlt && formData.media.coverImage && (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-start gap-3">
                                    <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Accessibility Warning</p>
                                        <p className="text-[10px] text-amber-600 font-medium leading-relaxed">This report is missing Alternative Text for the primary cover image. Please provide a description in Section 01 to ensure compatibility with screen readers and search crawlers.</p>
                                    </div>
                                </div>
                            )}

                            {isEchoHive && (
                                <div className="flex items-center justify-between p-4 bg-emerald-50/50 border border-emerald-100 rounded-sm">
                                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest flex items-center">
                                        <CheckCircle className="w-3 h-3 mr-2" />
                                        Enable Registration Protocol
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="hasRegister"
                                            checked={formData.hasRegister || false}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;