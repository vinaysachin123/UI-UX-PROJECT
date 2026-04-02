import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Layout as LayoutIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar py-4">
      <div className="container flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="logo-text text-2xl font-bold flex items-center gap-2">
          <LayoutIcon size={24} className="text-primary" />
          VibeKit<span className="text-primary">Studio</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-secondary-text">
                <User size={16} />
                <span>{user.email}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary flex items-center gap-2">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
