import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Columns, 
  Type, 
  Radio,
  Calendar,
  Globe,
  Plus
} from 'lucide-react';
import './CreatePost.css';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'youtube', name: 'YouTube', icon: '▶️' },
  { id: 'facebook', name: 'Facebook', icon: '📘' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵' },
  { id: 'twitter', name: 'X (Twitter)', icon: '𝕏' }
];

export default function CreatePost() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [postContent, setPostContent] = useState('');
  const [previewPlatform, setPreviewPlatform] = useState('instagram');
  const [mediaUploaded, setMediaUploaded] = useState(false);

  const togglePlatform = (id) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
        if (previewPlatform === id) {
          setPreviewPlatform(selectedPlatforms.find(p => p !== id));
        }
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
      setPreviewPlatform(id);
    }
  };

  return (
    <div className="create-post-layout">
      {/* Universal Composer Left Panel */}
      <div className="composer-panel card">
        <div className="composer-header">
          <h2 className="text-lg font-bold">Create New Post</h2>
        </div>
        
        <div className="composer-body">
          {/* Platform Selection */}
          <div className="form-section">
            <div className="flex-between form-label">
              <label>Select Platforms</label>
              <span className="text-xs text-muted">Select at least one</span>
            </div>
            <div className="platform-selector">
              {platforms.map(p => (
                <button
                  key={p.id}
                  className={`platform-btn ${selectedPlatforms.includes(p.id) ? 'selected' : ''}`}
                  onClick={() => togglePlatform(p.id)}
                >
                  <span className="platform-icon">{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Format Compatibility Check */}
          {selectedPlatforms.length > 0 && (
            <div className="compatibility-widget">
              <div className="text-xs font-bold uppercase text-muted mb-8">Format Compatibility</div>
              <div className="compat-list">
                {selectedPlatforms.includes('instagram') && <div className="compat-item compat-ok"><span className="dot ok"></span> Instagram accepts Reels (9:16) & Square Images (1:1)</div>}
                {selectedPlatforms.includes('youtube') && <div className="compat-item compat-ok"><span className="dot ok"></span> YouTube accepts Long-Form (16:9) & Shorts (9:16)</div>}
                {selectedPlatforms.includes('linkedin') && <div className="compat-item compat-warn"><span className="dot warn"></span> LinkedIn prefers PDF Carousels or 4:5 Images</div>}
                {selectedPlatforms.includes('twitter') && <div className="compat-item compat-error"><span className="dot error"></span> X (Twitter) video length limit is 2m 20s</div>}
              </div>
            </div>
          )}

          {/* Media Upload */}
          <div className="form-section">
            <label className="form-label flex-between">
              Media
              <span className="text-xs text-muted">Supports JPG, PNG, MP4</span>
            </label>
            {!mediaUploaded ? (
              <div 
                className="media-upload-area" 
                onClick={() => setMediaUploaded(true)}
              >
                <div className="upload-icons">
                  <ImageIcon size={24} />
                  <Video size={24} />
                  <Columns size={24} />
                </div>
                <p className="font-medium mt-4">Click or drag media to upload</p>
                <p className="text-xs text-muted mt-2">Maximum file size: 2GB (Video)</p>
              </div>
            ) : (
              <div className="uploaded-media-preview">
                <img 
                  src="https://images.unsplash.com/photo-1515347619253-ab0db280aeb9?w=400&h=300&fit=crop" 
                  alt="Post preview" 
                />
                <button 
                  className="btn btn-ghost text-sm mt-2"
                  onClick={() => setMediaUploaded(false)}
                >
                  Remove media
                </button>
              </div>
            )}
          </div>

          {/* Content Details */}
          <div className="form-section">
            <label className="form-label">Caption & Description</label>
            <textarea
              className="caption-input"
              rows={6}
              placeholder="Write a caption for your post..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="tools-bar">
              <button className="tool-btn"><Type size={16} /></button>
              <button className="tool-btn">#</button>
              <button className="tool-btn">@</button>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="composer-footer">
          <button className="btn btn-outline">Save Draft</button>
          <div className="action-buttons">
            <button className="btn btn-outline">
              <Calendar size={16} /> Schedule
            </button>
            <button className="btn btn-primary">
              <Globe size={16} /> Publish Now
            </button>
          </div>
        </div>
      </div>

      {/* Platform Preview Right Panel */}
      <div className="preview-panel">
        <div className="preview-header">
          <h3 className="text-sm font-bold text-muted uppercase">Platform Preview</h3>
          <div className="preview-tabs">
            {selectedPlatforms.map(id => {
              const plat = platforms.find(p => p.id === id);
              return (
                <button
                  key={id}
                  className={`preview-tab ${previewPlatform === id ? 'active' : ''}`}
                  onClick={() => setPreviewPlatform(id)}
                >
                  {plat.icon} {plat.name}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="preview-content-area">
          {/* Mockup generic mobile phone preview */}
          <div className="mobile-mockup">
            <div className="mockup-header">
              <div className="mockup-avatar"></div>
              <div className="mockup-user-info">
                <div className="mockup-name">Purple Merit</div>
                <div className="mockup-time">Just now • {platforms.find(p => p.id === previewPlatform)?.name}</div>
              </div>
            </div>
            
            <div className="mockup-body">
              {postContent && <div className="mockup-text">{postContent}</div>}
              {mediaUploaded && (
                <div className={`mockup-image ratio-${previewPlatform}`}>
                  <img src="https://images.unsplash.com/photo-1515347619253-ab0db280aeb9?w=400&h=300&fit=crop" alt="" />
                </div>
              )}
              {!postContent && !mediaUploaded && (
                <div className="mockup-empty">Add media or text to see preview</div>
              )}
            </div>
          </div>
          
          <div className="platform-warnings mt-24">
            <div className="alert-info">
              Preview shows approximate rendering for {platforms.find(p => p.id === previewPlatform)?.name}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
