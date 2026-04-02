import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SectionRenderer from '../components/SectionRenderer';
import { Mail, CheckCircle } from 'lucide-react';

const PublicView = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const { data } = await axios.get(`/api/public/pages/${slug}`);
      const sections = typeof data.page.sections === 'string' ? JSON.parse(data.page.sections) : data.page.sections;
      setPage({ ...data.page, sections });
      
      // Increment view count
      axios.post(`/api/public/pages/${slug}/view`).catch(err => console.error('View count error:', err));
    } catch (err) {
      console.error('Error fetching public page:', err);
      setError('Page not found or not published.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      await axios.post(`/api/public/pages/${slug}/contact`, data);
      setSubmitted(true);
    } catch (err) {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading-vibe">Vibing...</div>;
  if (error) return <div className="error-vibe">{error}</div>;

  return (
    <div className="public-site" data-theme={page.theme}>
      {page.sections.map((section) => (
        section.type === 'contact' ? (
          <section key={section.id} className="section py-16" id={section.id}>
            <div className="container max-w-xl mx-auto">
              <div className="card">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold">Message Sent!</h2>
                    <p className="opacity-70 mt-2">Thanks for reaching out. We'll get back to you soon.</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-secondary mt-8">Send another message</button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-10">
                      <Mail size={40} className="text-primary mx-auto mb-4" />
                      <h2 className="text-3xl font-bold">{section.content.title || 'Get in Touch'}</h2>
                      <p className="opacity-70 mt-2">{section.content.subtitle || 'Send us a message and we\'ll get back to you soon.'}</p>
                    </div>
                    <form onSubmit={handleContactSubmit}>
                      <input name="name" type="text" placeholder="Your Name" className="input" required />
                      <input name="email" type="email" placeholder="Your Email" className="input" required />
                      <textarea name="message" placeholder="Message" className="input" rows="4" required></textarea>
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </section>
        ) : (
          <SectionRenderer key={section.id} section={section} pageTheme={page.theme} />
        )
      ))}
      
      <footer className="py-8 border-t text-center opacity-40 text-sm">
        Built with VibeKit Studio
      </footer>
    </div>
  );
};

export default PublicView;
