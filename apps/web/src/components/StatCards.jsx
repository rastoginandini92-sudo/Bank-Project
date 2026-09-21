import React from 'react';
import { Users, Clock, CheckCircle, XCircle, TrendingUp, CreditCard } from 'lucide-react';

export default function StatCards({ submissions }) {
  const total = submissions.length;
  const pending = submissions.filter((s) => s.status === 'pending').length;
  const approved = submissions.filter((s) => s.status === 'approved').length;
  const rejected = submissions.filter((s) => s.status === 'rejected').length;

  const stats = [
    {
      label: 'Total Applications',
      value: total,
      icon: Users,
      color: '#0072ce',
      bg: '#e0f2fe',
      trend: '+12% today'
    },
    {
      label: 'Pending Verification (18h)',
      value: pending,
      icon: Clock,
      color: '#d97706',
      bg: '#fef3c7',
      trend: 'Queue active'
    },
    {
      label: 'Approved & Enhanced',
      value: approved,
      icon: CheckCircle,
      color: '#059669',
      bg: '#d1fae5',
      trend: '94% success rate'
    },
    {
      label: 'Flagged / Rejected',
      value: rejected,
      icon: XCircle,
      color: '#dc2626',
      bg: '#fee2e2',
      trend: 'Risk screened'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="stat-card">
            <div className="stat-icon-circle" style={{ background: stat.bg, color: stat.color }}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            <div className="stat-details">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-trend" style={{ color: stat.color }}>
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
