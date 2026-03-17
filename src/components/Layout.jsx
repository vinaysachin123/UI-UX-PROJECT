import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenSquare, 
  CalendarDays, 
  BarChart3, 
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import './Layout.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PenSquare, label: 'Create Post', path: '/create' },
  { icon: CalendarDays, label: 'Calendar', path: '/calendar' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-placeholder">PM</div>
          <h2>Purple Merit</h2>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.path} 
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item btn-ghost">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <button className="mobile-menu-btn btn-ghost">
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="Search content, campaigns..." />
            </div>
          </div>
          
          <div className="header-right">
            <button className="btn-ghost icon-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <img src="https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
