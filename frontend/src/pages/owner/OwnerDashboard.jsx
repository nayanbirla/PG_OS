import { HiOutlineBuildingOffice2, HiOutlineUserGroup, HiOutlineBanknotes, HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function OwnerDashboard() {
  return (
    <div className="owner-dashboard">
      <div className="dashboard-page-header mb-lg">
        <div>
          <h2>Owner Transparency Portal</h2>
          <p>Real-time analytics across all your PG properties</p>
        </div>
        <button className="btn btn-primary">+ Add New Property</button>
      </div>

      <div className="metrics-grid mb-lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)' }}>
        <div className="card card-glass flex items-center gap-md">
          <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-400)' }}>
            <HiOutlineBanknotes size={28} />
          </div>
          <div>
            <p className="text-sm">Monthly Expected Rent</p>
            <h3>₹4,50,000</h3>
            <span className="badge badge-success mt-xs">₹3,80,000 Collected</span>
          </div>
        </div>

        <div className="card card-glass flex items-center gap-md">
          <div style={{ padding: '12px', background: 'rgba(20, 184, 166, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-accent-400)' }}>
            <HiOutlineBuildingOffice2 size={28} />
          </div>
          <div>
            <p className="text-sm">Total Occupancy</p>
            <h3>88%</h3>
            <span className="badge badge-info mt-xs">48 / 54 Beds Occupied</span>
          </div>
        </div>

        <div className="card card-glass flex items-center gap-md">
          <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning-500)' }}>
            <HiOutlineExclamationTriangle size={28} />
          </div>
          <div>
            <p className="text-sm">Pending Rent Overdue</p>
            <h3>₹70,000</h3>
            <span className="badge badge-warning mt-xs">6 Residents Pending</span>
          </div>
        </div>

        <div className="card card-glass flex items-center gap-md">
          <div style={{ padding: '12px', background: 'rgba(34, 197, 94, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-success-500)' }}>
            <HiOutlineUserGroup size={28} />
          </div>
          <div>
            <p className="text-sm">Active Complaints</p>
            <h3>2 Open</h3>
            <span className="badge badge-neutral mt-xs">Avg SLA: 14 hrs</span>
          </div>
        </div>
      </div>

      <div className="card card-glass">
        <h4>PG Properties Overview</h4>
        <p className="mt-xs">Sprint 2 will render interactive floor & room maps with dynamic color-coded bed statuses.</p>
      </div>
    </div>
  );
}
