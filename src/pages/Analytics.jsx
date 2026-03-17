import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './Analytics.css';

const platformData = [
  { name: 'Instagram', value: 45, fill: '#E1306C' },
  { name: 'YouTube', value: 25, fill: '#FF0000' },
  { name: 'LinkedIn', value: 20, fill: '#0077b5' },
  { name: 'Facebook', value: 10, fill: '#1877F2' },
];

const engagementTrend = [
  { date: '1 Mar', ig: 4000, yt: 2400, li: 2400 },
  { date: '5 Mar', ig: 3000, yt: 1398, li: 2210 },
  { date: '10 Mar', ig: 2000, yt: 9800, li: 2290 },
  { date: '15 Mar', ig: 2780, yt: 3908, li: 2000 },
  { date: '20 Mar', ig: 1890, yt: 4800, li: 2181 },
];

const topPerformingPosts = [
  { id: 1, title: 'Summer Sale Announcement', platform: 'YouTube', format: 'Live', reach: '45.2K', eng: '12.4%', clicks: '2.1k' },
  { id: 2, title: 'Behind The Scenes: Photoshoot', platform: 'Instagram', format: 'Reel', reach: '32.1K', eng: '8.2%', clicks: '840' },
  { id: 3, title: 'Hiring UI/UX Interns 2026', platform: 'LinkedIn', format: 'Carousel', reach: '18.9K', eng: '15.1%', clicks: '3.2k' },
  { id: 4, title: 'Weekly Newsletter Recap', platform: 'Facebook', format: 'Post', reach: '12.4K', eng: '4.5%', clicks: '120' },
]

export default function Analytics() {
  return (
    <div className="analytics-layout">
      <div className="analytics-header flex-between mb-24">
        <div>
          <h2 className="text-xl font-bold">Performance Analytics</h2>
          <p className="text-sm text-muted">Track and analyze your cross-platform content</p>
        </div>
        <div className="action-buttons">
          <button className="btn btn-outline"><Filter size={16}/> Filters</button>
          <button className="btn btn-primary"><Download size={16}/> Export Report</button>
        </div>
      </div>

      <div className="metrics-summary">
        {[
          { label: 'Total Impressions', val: '1.2M', trend: '+14%', up: true },
          { label: 'Total Engagements', val: '84.5K', trend: '+5.2%', up: true },
          { label: 'Avg Engagement Rate', val: '7.0%', trend: '-1.1%', up: false },
          { label: 'Link Clicks', val: '12.4K', trend: '+22%', up: true }
        ].map((m, i) => (
          <div key={i} className="card metric-card">
            <h4 className="text-sm text-muted font-medium mb-8">{m.label}</h4>
            <div className="flex-between">
              <span className="metric-val text-2xl font-bold">{m.val}</span>
              <span className={`badge ${m.up ? 'badge-success' : 'badge-error'} trend`}>
                {m.up ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {m.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid mt-24">
        <div className="card chart-card wide">
          <div className="card-header pb-0 border-none">
            <h3 className="card-title">Engagement Trends Over Time</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} dx={-10} />
                <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}/>
                <Legend iconType="circle" wrapperStyle={{ paddingTop: 20 }} />
                <Line type="monotone" dataKey="ig" name="Instagram" stroke="#E1306C" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="yt" name="YouTube" stroke="#FF0000" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="li" name="LinkedIn" stroke="#0077b5" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-header pb-0 border-none">
            <h3 className="card-title">Audience by Platform</h3>
          </div>
          <div className="chart-wrapper flex-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}/>
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header flex-between border-bottom">
          <h3 className="card-title">Top Performing Posts</h3>
          <button className="btn-ghost text-sm text-primary font-medium">View Full Report</button>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Content Title</th>
                <th>Platform</th>
                <th>Format</th>
                <th className="text-right">Reach</th>
                <th className="text-right">Eng. Rate</th>
                <th className="text-right">Link Clicks</th>
              </tr>
            </thead>
            <tbody>
              {topPerformingPosts.map(p => (
                <tr key={p.id}>
                  <td className="font-medium max-w-200 truncate">{p.title}</td>
                  <td>
                    <span className="platform-pill">{p.platform}</span>
                  </td>
                  <td>{p.format}</td>
                  <td className="text-right font-medium">{p.reach}</td>
                  <td className="text-right text-success">{p.eng}</td>
                  <td className="text-right">{p.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
