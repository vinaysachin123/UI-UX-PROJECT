import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SectionRenderer from '../components/SectionRenderer';
import ThemeSelector from '../components/ThemeSelector';
import { Save, Globe, Eye, ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, Monitor, Smartphone, Tablet } from 'lucide-react';

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile

    useEffect(() => {
        if (id) fetchPage();
    }, [id]);

    const fetchPage = async () => {
        try {
            const { data } = await axios.get(`/api/pages/${id}`);
            const sections = typeof data.page.sections === 'string' ? JSON.parse(data.page.sections) : data.page.sections;
            setPage({ ...data.page, sections });
        } catch (err) {
            console.error('Error fetching page:', err);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await axios.put(`/api/pages/${id}`, {
                title: page.title,
                slug: page.slug,
                theme: page.theme,
                sections: page.sections
            });
            alert('Vibe saved successfully!');
        } catch (err) {
            alert('Error saving page');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePublish = async () => {
        try {
            await axios.post(`/api/pages/${id}/publish`);
            setPage({ ...page, isPublished: true });
            alert('Vibe published live!');
        } catch (err) {
            alert('Error publishing page');
        }
    };

    const updateSection = (index, content) => {
        const newSections = [...page.sections];
        newSections[index].content = { ...newSections[index].content, ...content };
        setPage({ ...page, sections: newSections });
    };

    const moveSection = (index, direction) => {
        if (index + direction < 0 || index + direction >= page.sections.length) return;
        const newSections = [...page.sections];
        const temp = newSections[index];
        newSections[index] = newSections[index + direction];
        newSections[index + direction] = temp;
        setPage({ ...page, sections: newSections });
    };

    const removeSection = (index) => {
        const newSections = page.sections.filter((_, i) => i !== index);
        setPage({ ...page, sections: newSections });
    };

    if (loading) return <div className="editor-loading">Loading VibeKit Studio...</div>;

    return (
        <div className="editor-container h-screen flex flex-col">
            <header className="editor-header flex justify-between items-center px-4 py-3 bg-white border-b shadow-sm z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="font-bold text-lg">{page.title} Builder</h1>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${page.isPublished ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'}`}>
                        {page.isPublished ? 'Live' : 'Draft'}
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setViewMode('desktop')} className={`p-2 rounded-md ${viewMode === 'desktop' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}><Monitor size={18} /></button>
                    <button onClick={() => setViewMode('tablet')} className={`p-2 rounded-md ${viewMode === 'tablet' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}><Tablet size={18} /></button>
                    <button onClick={() => setViewMode('mobile')} className={`p-2 rounded-md ${viewMode === 'mobile' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}><Smartphone size={18} /></button>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={handleSave} disabled={isSaving} className="btn btn-secondary flex items-center gap-2">
                        <Save size={18} /> {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={handlePublish} className="btn btn-primary flex items-center gap-2">
                        <Globe size={18} /> Publish
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="editor-sidebar w-80 bg-white border-r overflow-y-auto p-4 flex flex-col gap-6">
                    <ThemeSelector 
                        selectedTheme={page.theme} 
                        onThemeChange={(theme) => setPage({...page, theme})} 
                    />

                    <div className="sections-list space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex justify-between items-center">
                            Page Sections
                            <button className="text-primary hover:bg-primary/10 p-1 rounded"><Plus size={14} /></button>
                        </h3>
                        {page.sections.map((section, idx) => (
                            <div key={section.id} className="section-item card p-3 group">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold uppercase text-primary">{section.type}</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveSection(idx, -1)} className="p-1 hover:bg-gray-100 rounded"><ChevronUp size={14} /></button>
                                        <button onClick={() => moveSection(idx, 1)} className="p-1 hover:bg-gray-100 rounded"><ChevronDown size={14} /></button>
                                        <button onClick={() => removeSection(idx)} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <input 
                                        type="text" 
                                        className="text-xs w-full p-1 bg-gray-50 border rounded" 
                                        value={section.content.title || ''} 
                                        onChange={(e) => updateSection(idx, { title: e.target.value })}
                                        placeholder="Section Title"
                                    />
                                    {section.type === 'hero' && (
                                        <textarea
                                            className="text-xs w-full p-1 bg-gray-50 border rounded"
                                            value={section.content.subtitle || ''}
                                            onChange={(e) => updateSection(idx, { subtitle: e.target.value })}
                                            placeholder="Hero subtitle text..."
                                            rows={2}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Preview Window */}
                <main className="flex-1 bg-gray-100 overflow-y-auto p-8 flex justify-center items-start">
                  <div 
                    className={`preview-frame bg-white shadow-2xl transition-all duration-500 overflow-y-auto ${
                      viewMode === 'desktop' ? 'w-full' : viewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                    }`}
                    style={{ minHeight: '100%', dataTheme: page.theme }}
                    data-theme={page.theme}
                  >
                    {page.sections.map((section) => (
                      <SectionRenderer key={section.id} section={section} pageTheme={page.theme} />
                    ))}
                  </div>
                </main>
            </div>
        </div>
    );
};

export default Editor;
