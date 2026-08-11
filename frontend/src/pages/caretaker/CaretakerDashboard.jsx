import { HiOutlineCheckCircle, HiOutlineClipboardDocumentList, HiOutlineWrenchScrewdriver, HiOutlineUserPlus } from 'react-icons/hi2';

export default function CaretakerDashboard() {
  return (
    <div className="caretaker-dashboard">
      <div className="dashboard-page-header mb-lg">
        <div>
          <h2>Caretaker Daily Workspace</h2>
          <p>Today's tasks, room allocations, rent collection & notices</p>
        </div>
        <button className="btn btn-primary">
          <HiOutlineUserPlus size={18} />
          Onboard Resident
        </button>
      </div>

      <div className="card card-glass mb-lg">
        <h4 className="flex items-center gap-sm">
          <HiOutlineClipboardDocumentList size={22} className="text-primary-400" />
          Today's Operational Checklist
        </h4>
        <div className="task-list mt-md flex flex-col gap-sm">
          <div className="task-item flex items-center justify-between p-sm card" style={{ background: 'var(--bg-primary)' }}>
            <div className="flex items-center gap-sm">
              <HiOutlineCheckCircle size={20} className="text-success-500" />
              <span>Verify Rent payment for Room 204 (Amit Sharma)</span>
            </div>
            <span className="badge badge-warning">High Priority</span>
          </div>

          <div className="task-item flex items-center justify-between p-sm card" style={{ background: 'var(--bg-primary)' }}>
            <div className="flex items-center gap-sm">
              <HiOutlineWrenchScrewdriver size={20} className="text-warning-500" />
              <span>Inspect Plumbing Complaint #COMP-2026-004 (Room 102)</span>
            </div>
            <span className="badge badge-info">In Progress</span>
          </div>
        </div>
      </div>

      <div className="card card-glass">
        <h4>Visual Room Map & Allocations</h4>
        <p className="mt-xs">Quick allocation, bed shifting, and vacancy tracking will be active in Sprint 2.</p>
      </div>
    </div>
  );
}
