import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineBanknotes,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2';
import './DashboardLayout.css';

const ownerNavItems = [
  { path: '/owner', icon: HiOutlineHome, label: 'Dashboard', end: true },
  { path: '/owner/properties', icon: HiOutlineBuildingOffice2, label: 'Properties' },
  { path: '/owner/residents', icon: HiOutlineUserGroup, label: 'Residents' },
  { path: '/owner/rent', icon: HiOutlineBanknotes, label: 'Rent' },
  { path: '/owner/complaints', icon: HiOutlineChatBubbleLeftRight, label: 'Complaints' },
  { path: '/owner/settings', icon: HiOutlineCog6Tooth, label: 'Settings' },
];

const caretakerNavItems = [
  { path: '/caretaker', icon: HiOutlineHome, label: 'Dashboard', end: true },
  { path: '/caretaker/room-map', icon: HiOutlineBuildingOffice2, label: 'Room Map' },
  { path: '/caretaker/residents', icon: HiOutlineUserGroup, label: 'Residents' },
  { path: '/caretaker/rent', icon: HiOutlineBanknotes, label: 'Rent Collection' },
  { path: '/caretaker/complaints', icon: HiOutlineChatBubbleLeftRight, label: 'Complaints' },
];

/**
 * Shared dashboard layout for Owner and Caretaker views.
 * Includes sidebar navigation, header, and main content area.
 */
export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = role === 'OWNER' ? ownerNavItems : caretakerNavItems;
  const roleLabel = role === 'OWNER' ? 'Owner' : 'Caretaker';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon">PG</div>
            <span className="sidebar__logo-text">PG OS</span>
          </div>
          <button
            className="sidebar__close btn-ghost"
            onClick={() => setSidebarOpen(false)}
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user?.fullName?.charAt(0) || roleLabel.charAt(0)}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">{user?.fullName || roleLabel}</span>
              <span className="sidebar__user-role">{roleLabel}</span>
            </div>
          </div>
          <button className="sidebar__logout btn-ghost" onClick={handleLogout}>
            <HiOutlineArrowRightOnRectangle size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <button
            className="dashboard-header__menu btn-ghost"
            onClick={() => setSidebarOpen(true)}
          >
            <HiOutlineBars3 size={24} />
          </button>

          <div className="dashboard-header__spacer" />

          <button className="dashboard-header__notification btn-ghost">
            <HiOutlineBell size={22} />
            <span className="notification-dot" />
          </button>

          <div className="dashboard-header__user">
            <div className="dashboard-header__avatar">
              {user?.fullName?.charAt(0) || roleLabel.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
