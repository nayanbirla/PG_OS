import { useAuth } from '../../context/AuthContext';
import { HiOutlineSparkles, HiOutlineDocumentText, HiOutlineChatBubbleLeftRight, HiOutlineQrCode, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function ResidentHome() {
  const { user, logout } = useAuth();

  return (
    <div className="resident-home" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-md)' }}>
      {/* Top Banner */}
      <div className="card card-glass mb-md" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(20, 184, 166, 0.15))' }}>
        <div className="flex justify-between items-center">
          <div>
            <span className="badge badge-info">Resident App</span>
            <h3 className="mt-xs">Hi, {user?.fullName || 'Resident'} 👋</h3>
            <p className="text-sm">Sunrise PG · Room 202 (Bed B)</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={logout} title="Logout">
            <HiOutlineArrowRightOnRectangle size={20} />
          </button>
        </div>
      </div>

      {/* Rent Card */}
      <div className="card card-glass mb-md">
        <div className="flex justify-between items-center mb-xs">
          <span className="text-sm">August 2026 Rent</span>
          <span className="badge badge-warning">Due in 5 Days</span>
        </div>
        <h2>₹8,500</h2>
        <p className="text-xs mb-md">Due date: 15 Aug 2026</p>
        <button className="btn btn-primary w-full">
          <HiOutlineSparkles size={18} />
          Pay Rent / Download Receipt
        </button>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-grid mb-md" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <div className="card text-center p-md cursor-pointer hover:border-primary-400">
          <HiOutlineChatBubbleLeftRight size={28} className="text-primary-400 mb-xs" style={{ margin: '0 auto' }} />
          <h5>Raise Complaint</h5>
          <p className="text-xs">Plumbing, WiFi, Cleaning</p>
        </div>

        <div className="card text-center p-md cursor-pointer hover:border-accent-400">
          <HiOutlineDocumentText size={28} className="text-accent-400 mb-xs" style={{ margin: '0 auto' }} />
          <h5>Agreement & KYC</h5>
          <p className="text-xs">Rental Contract PDF</p>
        </div>
      </div>

      {/* Daily Food Menu */}
      <div className="card card-glass">
        <h4>Today's Food Menu 🍲</h4>
        <div className="mt-sm text-sm">
          <p><strong>Breakfast:</strong> Aloo Paratha + Tea</p>
          <p><strong>Lunch:</strong> Paneer Butter Masala, Roti, Rice, Dal</p>
          <p><strong>Dinner:</strong> Veg Biryani + Raita</p>
        </div>
      </div>
    </div>
  );
}
