import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Plus, Edit2, ExternalLink, Trash2, Copy, BarChart2, Globe, Eye, MoreHorizontal, Settings, Layout } from 'lucide-react';

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newPageTitle, setNewPageTitle] = useState('');
    const [newPageSlug, setNewPageSlug] = useState('');

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const { data } = await axios.get('/api/pages');
            setPages(data.pages);
        } catch (err) {
            console.error('Error fetching pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePage = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            const { data } = await axios.post('/api/pages', {
                title: newPageTitle,
                slug: newPageSlug,
                theme: 'minimal',
                sections: [
                    { id: 'hero-1', type: 'hero', content: { title: newPageTitle, subtitle: 'A new vibe project.' } },
                    { id: 'features-1', type: 'features', content: { title: 'Our Offerings', subtitle: 'Explore what we do.' } },
                    { id: 'contact-1', type: 'contact', content: { title: 'Contact Us', subtitle: 'Reach out for inquiries.' } }
                ]
            });
            setPages([data.page, ...pages]);
            setNewPageTitle('');
            setNewPageSlug('');
            setIsCreating(false);
        } catch (err) {
            alert(err.response?.data?.error || 'Error creating page');
            setIsCreating(false);
        }
    };

    const handleDeletePage = async (id) => {
        if (!confirm('Are you sure you want to delete this page?')) return;
        try {
            await axios.delete(`/api/pages/${id}`);
            setPages(pages.filter(p => p.id !== id));
        } catch (err) {
            alert('Error deleting page');
        }
    };

    const handleDuplicate = async (id) => {
        try {
            const { data } = await axios.post(`/api/pages/${id}/duplicate`);
            setPages([data.page, ...pages]);
        } catch (err) {
            alert('Error duplicating page');
        }
    };

    return (
        <div className="dashboard min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            <main className="container py-12">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-bold">Your Studio</h1>
                        <p className="opacity-60 mt-1">Manage and edit your vibe builder projects.</p>
                    </div>
                </header>

                <div className="dashboard-grid">
                    {/* Create New Page Card */}
                    <div className="card border-dashed border-2 border-primary bg-primary/5 flex flex-col justify-center items-center py-10">
                        <form onSubmit={handleCreatePage} className="w-full space-y-3 px-6">
                            <input 
                                type="text" 
                                placeholder="Project Name" 
                                className="input" 
                                value={newPageTitle}
                                onChange={(e) => {
                                    setNewPageTitle(e.target.value);
                                    if (!newPageSlug) setNewPageSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                                }}
                                required
                            />
                            <input 
                                type="text" 
                                placeholder="Slug (e.g. my-awesome-page)" 
                                className="input" 
                                value={newPageSlug}
                                onChange={(e) => setNewPageSlug(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={isCreating} className="btn btn-primary w-full py-3">
                                <Plus size={20} className="mr-2" /> {isCreating ? 'Creating...' : 'Create New Site'}
                            </button>
                        </form>
                    </div>

                    {/* Page Cards */}
                    {loading ? (
                        <div className="col-span-full text-center py-20 opacity-50">Loading your vibes...</div>
                    ) : pages.length === 0 ? (
                        <div className="col-span-full text-center py-20 opacity-50">No pages yet. Create your first vibe above!</div>
                    ) : pages.map(page => (
                        <div key={page.id} className="card group relative hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary rounded-xl text-primary">
                                    <Layout size={24} />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleDuplicate(page.id)} className="p-2 hover:bg-gray-100 rounded-lg" title="Duplicate"><Copy size={16} /></button>
                                    <button onClick={() => handleDeletePage(page.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg" title="Delete"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-1 truncate">{page.title}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <Globe size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-500 font-mono">/p/{page.slug}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm mb-8">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                                    <Eye size={12} />
                                    <span>{page.viewCount} views</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${page.isPublished ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {page.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <Link to={`/editor/${page.id}`} className="btn btn-primary flex-1">
                                    <Edit2 size={16} className="mr-2" /> Edit Vibe
                                </Link>
                                {page.isPublished && (
                                    <a href={`/p/${page.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary p-3">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
