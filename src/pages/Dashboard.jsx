import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  Clock
} from 'lucide-react';
import './Dashboard.css';

const performanceData = [
  { name: 'Mon', views: 4210, engagement: 2415 },
  { name: 'Tue', views: 3105, engagement: 1420 },
  { name: 'Wed', views: 2500, engagement: 8900 },
  { name: 'Thu', views: 2880, engagement: 3108 },
  { name: 'Fri', views: 1950, engagement: 4200 },
  { name: 'Sat', views: 2790, engagement: 3900 },
  { name: 'Sun', views: 3890, engagement: 4500 },
];

const scheduledPostsCache = [
  { 
    id: 1, 
    type: 'video', 
    platform: 'Instagram', 
    title: 'New Spring Activewear Drop', 
    time: '2:30 PM', 
    status: 'Scheduled',
    image: 'https://images.unsplash.com/photo-1515347619253-ab0db280aeb9?w=100&h=100&fit=crop'
  },
  { 
    id: 2, 
    type: 'live', 
    platform: 'YouTube', 
    title: 'Yoga Flow Live Session', 
    time: '5:00 PM', 
    status: 'Ready',
    image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=100&h=100&fit=crop'
  },
  { 
    id: 3, 
    type: 'carousel', 
    platform: 'LinkedIn', 
    title: 'Our Sustainability Mission', 
    time: 'Tomorrow, 9:00 AM', 
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
  }
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header flex-between mb-24">
        <div>
          <h1 className="page-title">Welcome back, Sarah 👋</h1>
          <p className="text-muted mt-4">Here's what is happening with your accounts today.</p>
        </div>
        <button className="btn btn-primary">Create New Post</button>
      </div>

      <div className="metrics-grid">
        <div className="card metric-card">
          <div className="metric-header">
            <span className="text-muted text-sm font-medium">Total Audience</span>
            <span className="badge badge-success trend">
              <ArrowUpRight size={14} /> 12.5%
            </span>
          </div>
          <h2 className="metric-value">254.2K</h2>
          <p className="text-muted text-xs">+28k this week</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span className="text-muted text-sm font-medium">Total Engagement</span>
            <span className="badge badge-success trend">
              <ArrowUpRight size={14} /> 4.3%
            </span>
          </div>
          <h2 className="metric-value">18.5%</h2>
          <p className="text-muted text-xs">Avg. across 4 platforms</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span className="text-muted text-sm font-medium">Posts Published</span>
            <span className="badge badge-error trend">
              <ArrowDownRight size={14} /> 2.1%
            </span>
          </div>
          <h2 className="metric-value">42</h2>
          <p className="text-muted text-xs">Last 30 days</p>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span className="text-muted text-sm font-medium">Active Campaigns</span>
            <MoreHorizontal size={20} className="text-muted" />
          </div>
          <h2 className="metric-value">3</h2>
          <p className="text-muted text-xs">Summer Sale ends soon</p>
        </div>
      </div>

      <div className="dashboard-grid mt-24">
        <div className="card charts-card">
          <div className="card-header flex-between">
            <h3 className="card-title">Performance Overview</h3>
            <select className="select-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="chart-container" style={{ height: 300, padding: 24 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="views" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card list-card">
          <div className="card-header flex-between">
            <h3 className="card-title">Upcoming Posts</h3>
            <button className="btn-ghost text-sm text-primary font-medium">View All</button>
          </div>
          <div className="post-list">
            {scheduledPostsCache.map(post => (
              <div key={post.id} className="post-item">
                <img src={post.image} alt="" className="post-thumb" />
                <div className="post-info">
                  <h4 className="post-title">{post.title}</h4>
                  <div className="post-meta">
                    <span className="platform-tag">{post.platform}</span>
                    <span className="time-tag">
                      <Clock size={12} /> {post.time}
                    </span>
                  </div>
                </div>
                <div className={`status-badge status-${post.status.toLowerCase()}`}>
                  {post.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
