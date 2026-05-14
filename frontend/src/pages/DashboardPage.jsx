import useLeads from '../hooks/useLeads'
import './DashboardPage.css'

const STATUS_LABELS = {
  new: 'Nuevo',
  contacted: 'Contactado',
  proposal: 'Propuesta',
  closed: 'Cerrado',
  lost: 'Perdido'
}

const STATUS_COLORS = {
  new: '#378ADD',
  contacted: '#7F77DD',
  proposal: '#EF9F27',
  closed: '#639922',
  lost: '#E24B4A'
}

function DashboardPage() {
  const { leads, loading, error } = useLeads()

  if (loading) return <div className="dashboard-loading">Cargando...</div>
  if (error) return <div className="dashboard-error">Error: {error.message || 'Something went wrong'}</div>

  const totalLeads = leads.length

  const thisMonth = leads.filter(lead => {
    const created = new Date(lead.createdAt)
    const now = new Date()
    return created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
  }).length

  const closedLeads = leads.filter(lead => lead.status === 'closed').length
  const conversionRate = totalLeads > 0
    ? Math.round((closedLeads / totalLeads) * 100)
    : 0

  const statusCounts = ['new', 'contacted', 'proposal', 'closed', 'lost'].map(status => ({
    status,
    label: STATUS_LABELS[status],
    color: STATUS_COLORS[status],
    count: leads.filter(lead => lead.status === status).length
  }))

  const maxCount = Math.max(...statusCounts.map(s => s.count), 1)

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total leads</div>
          <div className="metric-value">{totalLeads}</div>
          <div className="metric-sub">total</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Leads of the month</div>
          <div className="metric-value">{thisMonth}</div>
          <div className="metric-sub">actual month</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Conversion rate</div>
          <div className="metric-value">{conversionRate}%</div>
          <div className="metric-sub">closed leads / total leads</div>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">Leads by status</div>
        <div className="chart-legend">
          {statusCounts.map(s => (
            <span key={s.status} className="legend-item">
              <span className="legend-dot" style={{ background: s.color }}></span>
              {s.label} {s.count}
            </span>
          ))}
        </div>
        <div className="chart-bars">
          {statusCounts.map(s => (
            <div key={s.status} className="bar-group">
              <div className="bar-wrap">
                <div
                  className="bar"
                  style={{
                    height: `${(s.count / maxCount) * 180}px`,
                    background: s.color
                  }}
                ></div>
              </div>
              <div className="bar-count">{s.count}</div>
              <div className="bar-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage