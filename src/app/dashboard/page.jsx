import React from "react";
import "./dashboard.css";
import Navbar from "../_components/Navbar";

const trainingCards = [
  {
    id: 1,
    title: "LLM",
    subtitle: "No of Requests per Agent",
    value: 40,
    percent: 65,
    color: "#22c55e",
  },
  {
    id: 2,
    title: "Feature Extraction",
    subtitle: "No of Requests per Agent",
    value: 35,
    percent: 60,
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "Recommendation System",
    subtitle: "No of Requests per Agent",
    value: 20,
    percent: 65,
    color: "#facc15",
  },
  {
    id: 4,
    title: "Predictive Analysis",
    subtitle: "No of Requests per Agent",
    value: 28,
    percent: 65,
    color: "#4ade80",
  },
  {
    id: 5,
    title: "Speech to text",
    subtitle: "No of Requests per Agent",
    value: 37,
    percent: 65,
    color: "#e879f9",
  },
  {
    id: 6,
    title: "Text to Speech",
    subtitle: "No of Requests per Agent",
    value: 16,
    percent: 65,
    color: "#facc15",
  },
  {
    id: 7,
    title: "Image to text",
    subtitle: "No of Requests per Agent",
    value: 18,
    percent: 65,
    color: "#38bdf8",
  },
];

const createdStats = [
  { label: "Agent Created", value: 20, total: 60, color: "#3b82f6" },
  { label: "Widgets Created", value: 10, total: 40, color: "#22c55e" },
  { label: "Function Created", value: 11, total: 50, color: "#facc15" },
];

const barData = [
  { label: "Agent1", value: 1200, color: "#facc15" },
  { label: "Test", value: 400, color: "#22c55e" },
  { label: "Test", value: 3000, color: "#3b82f6" },
  { label: "Test", value: 800, color: "#e879f9" },
  { label: "Test", value: 1500, color: "#22c55e" },
];

const agentStatus = [
  { label: "Configured", value: 63, color: "#22c55e" },
  { label: "Deployed", value: 25, color: "#3b82f6" },
  { label: "Deploying", value: 25, color: "#facc15" },
  { label: "Ready", value: 25, color: "#38bdf8" },
];

const agentPatterns = [
  { label: "LLM", value: 20.23, color: "#f97316" },
  { label: "Feature Extraction", value: 11.89, color: "#3b82f6" },
  { label: "Recommendation System", value: 15.19, color: "#22c55e" },
  { label: "Predictive Analysis", value: 15.19, color: "#22c55e" },
  { label: "Speech to Text", value: 11.89, color: "#a855f7" },
  { label: "Text to Speech", value: 11.89, color: "#facc15" },
  { label: "Image to Text", value: 7.44, color: "#06b6d4" },
];

function CircularProgress({ value, total, color, label }) {
  const percent = Math.round((value / total) * 100);
  const angle = (percent / 100) * 360;

  return (

    <div className="circle-card">
      <div
        className="circle-progress"
        style={{
          background: `conic-gradient(${color} ${angle}deg, #e5e7eb 0deg)`,
        }}
      >
        <div className="circle-progress-inner">
          <span className="circle-value">
            {value}/{total}
          </span>
        </div>
      </div>
      <p className="circle-label">{label}</p>
    </div>
  );
}

function GaugeCard({ title, used, total, color }) {
  const percent = Math.round((used / total) * 100);
  const angle = (percent / 100) * 180;

  return (
    <div className="card gauge-card">
      <div className="card-header-row">
        <h3>{title}</h3>
      </div>
      <div className="gauge-wrapper">
        <div
          className="gauge"
          style={{
            background: `conic-gradient(${color} ${angle}deg, #e5e7eb 0deg)`,
          }}
        >
          <div className="gauge-inner">
            <span className="gauge-value">{percent}%</span>
            <span className="gauge-subtitle">{title.toLowerCase()} used</span>
          </div>
        </div>
      </div>
      <div className="gauge-footer">
        <div>
          <div className="gauge-label">Total</div>
          <div className="gauge-number">
            {title === "Storage" ? `${total}MB` : total}
          </div>
        </div>
        <div className="gauge-divider" />
        <div>
          <div className="gauge-label">Remaining</div>
          <div className="gauge-number">
            {title === "Storage"
              ? `${total - used}MB`
              : total - used}
          </div>
        </div>
      </div>
    </div>
  );
}

function PieChart({ data, centerLabel }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  const segments = data.map((d) => {
    const angle = (d.value / total) * 360;
    const segment = `${d.color} ${currentAngle}deg ${currentAngle + angle}deg`;
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="pie-chart-wrapper">
      <div
        className="pie-chart"
        style={{
          background: `conic-gradient(${segments.join(", ")})`,
        }}
      >
        <div className="pie-chart-inner">
          <span className="pie-label">{centerLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <Navbar/>
      <div className="dashboard-root">
    
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-breadcrumb">Dashboard</span>
        </div>
        <div className="topbar-right">
          <button className="icon-button">
            <span className="icon-dot" />
          </button>
          <div className="user-pill">
            <div className="avatar-circle">Z</div>
            <span className="user-name">Zain</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        {/* Training & Inference */}
        <section className="section">
          <div className="section-header">
            <h2>Training & Inference made</h2>
            <span className="section-subtitle">
              7 of 26 – Use arrows to navigate
            </span>
          </div>
          <div className="training-row">
            {trainingCards.map((card) => {
              const percentWidth = `${card.percent}%`;
              return (
                <div key={card.id} className="training-card">
                  <div className="training-top">
                    <p className="training-subtitle">{card.subtitle}</p>
                    <span className="training-value">{card.value}</span>
                  </div>
                  <h3 className="training-title">{card.title}</h3>
                  <div className="training-progress">
                    <div
                      className="training-progress-fill"
                      style={{
                        width: percentWidth,
                        background: card.color,
                      }}
                    />
                  </div>
                  <div className="training-footer">
                    <span>{card.percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Middle row: Created + Storage + Token */}
        <section className="section section-grid-3">
          <div className="card created-card">
            <h3>No of Created</h3>
            <div className="created-row">
              {createdStats.map((item) => (
                <CircularProgress
                  key={item.label}
                  value={item.value}
                  total={item.total}
                  color={item.color}
                  label={item.label}
                />
              ))}
            </div>
          </div>

          <GaugeCard title="Storage" used={10} total={12} color="#3b82f6" />
          <GaugeCard title="Token" used={1000} total={1200} color="#f59e0b" />
        </section>

        {/* Bottom row */}
        <section className="section section-grid-3 bottom-row">
          {/* Bar chart */}
          <div className="card">
            <div className="card-header-row">
              <div className="card-header-left">
                <h3>Agent</h3>
                <div className="chip chip-primary">Storage</div>
                <div className="chip">No of Request Per Day</div>
              </div>
              <div className="card-header-right">
                <button className="chip chip-dropdown">Weekly ▾</button>
              </div>
            </div>

            <div className="bar-chart-wrapper">
              <div className="bar-chart">
                {barData.map((item, idx) => (
                  <div key={idx} className="bar-item">
                    <div
                      className="bar"
                      style={{
                        height: `${(item.value / 3200) * 100}%`,
                        background: item.color,
                      }}
                    >
                      {idx === 2 && (
                        <span className="bar-label-top">2GB</span>
                      )}
                    </div>
                    <span className="bar-label">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="bar-details">
                <h4>Details:</h4>
                <ul>
                  <li>Recommendation System Agent Test - 0</li>
                  <li>Test - 0</li>
                  <li>Test - 0</li>
                  <li>Test - 0</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Agent By Status */}
          <div className="card">
            <h3>Agent By Status</h3>
            <div className="status-row">
              <PieChart data={agentStatus} centerLabel="" />
              <ul className="legend">
                {agentStatus.map((s) => (
                  <li key={s.label}>
                    <span
                      className="legend-dot"
                      style={{ background: s.color }}
                    />
                    <span>{s.label}</span>
                    <span className="legend-percent">{s.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agent By Patterns */}
          <div className="card">
            <h3>Agent By Patterns</h3>
            <div className="status-row">
              <PieChart data={agentPatterns} centerLabel="60" />
              <div className="patterns-details">
                <h4>Details:</h4>
                <ul className="legend legend-compact">
                  {agentPatterns.map((s) => (
                    <li key={s.label}>
                      <span
                        className="legend-dot"
                        style={{ background: s.color }}
                      />
                      <span>{s.label}</span>
                      <span className="legend-percent">
                        {s.value.toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
    
  );
}
