import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const activities = [
  { initials: "AM", name: "Alex Morgan", action: "updated the launch plan", time: "12 min ago", tone: "lavender" },
  { initials: "JL", name: "Jamie Lee", action: "completed a task in Website redesign", time: "48 min ago", tone: "peach" },
  { initials: "SK", name: "Sam Kim", action: "shared a new project brief", time: "2 hours ago", tone: "mint" },
];

const projects = [
  { name: "Website redesign", team: "Product team", progress: 76, due: "Oct 12", tone: "violet" },
  { name: "Mobile app launch", team: "Growth team", progress: 54, due: "Oct 18", tone: "blue" },
  { name: "Q4 brand refresh", team: "Design team", progress: 32, due: "Oct 24", tone: "orange" },
];

function Dashboard() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("dashboardEmail") || "";
  const firstName = email.split("@")[0]?.split(/[._-]/)[0] || "there";
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date()).toUpperCase();
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Good afternoon";
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavigation, setActiveNavigation] = useState("Overview");

  const filteredActivities = useMemo(
    () =>
      activities.filter((activity) =>
        `${activity.name} ${activity.action}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const handleLogout = () => {
    sessionStorage.removeItem("dashboardEmail");
    navigate("/login", { replace: true });
  };

  const navigation = [
    { label: "Overview", icon: "◫" },
    { label: "My projects", icon: "▧", count: "8" },
    { label: "Inbox", icon: "✉", count: "3" },
    { label: "Calendar", icon: "▦" },
  ];

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <a className="brand dashboard-brand" href="#overview" aria-label="Northstar overview">
          <span className="brand-mark">N</span><span>northstar</span>
        </a>
        <button className="workspace-switcher" type="button">
          <span className="workspace-avatar">S</span>
          <span className="workspace-name"><strong>Studio North</strong><small>Free workspace</small></span>
          <span className="workspace-chevron" aria-hidden="true">⌄</span>
        </button>

        <p className="sidebar-label">WORKSPACE</p>
        <nav className="side-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              className={`nav-item${activeNavigation === item.label ? " active" : ""}`}
              key={item.label}
              type="button"
              onClick={() => setActiveNavigation(item.label)}
              aria-current={activeNavigation === item.label ? "page" : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {item.count && <span className="nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item" type="button" onClick={handleLogout}>
            <span className="nav-icon" aria-hidden="true">↪</span><span>Sign out</span>
          </button>
          <div className="sidebar-profile">
            <span className="profile-avatar">{displayName.charAt(0)}</span>
            <span className="profile-copy"><strong>{displayName}</strong><small>{email || "Your workspace"}</small></span>
            <span className="profile-menu" aria-hidden="true">···</span>
          </div>
        </div>
      </aside>

      <section className="dashboard-main" id="overview">
        <header className="dashboard-topbar">
          <div className="breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><strong>{activeNavigation}</strong></div>
          <div className="topbar-actions">
            <label className="dashboard-search">
              <span aria-hidden="true">⌕</span>
              <input type="search" placeholder="Search activity" aria-label="Search activity" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">♧<span className="notification-dot" /></button>
            <button className="topbar-avatar" type="button" aria-label={`Account for ${displayName}`}>{displayName.charAt(0)}</button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-heading">
            <div>
              <p className="dashboard-date">{dateLabel}</p>
              <h1>{greeting}, {displayName} <span aria-hidden="true">✦</span></h1>
              <p className="dashboard-subtitle">Here&apos;s what&apos;s happening with your workspace today.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => setActiveNavigation("My projects")}><span aria-hidden="true">＋</span> New project</button>
          </div>

          <section className="stats-grid" aria-label="Workspace summary">
            <article className="stat-card"><div className="stat-topline"><span>Active projects</span><span className="stat-icon violet-icon">▧</span></div><div className="stat-value">08</div><div className="stat-note"><span className="trend-up">↗ 2</span> from last month</div></article>
            <article className="stat-card"><div className="stat-topline"><span>Tasks completed</span><span className="stat-icon green-icon">✓</span></div><div className="stat-value">34</div><div className="stat-note"><span className="trend-up">↗ 12%</span> from last week</div></article>
            <article className="stat-card"><div className="stat-topline"><span>Team members</span><span className="stat-icon blue-icon">♧</span></div><div className="stat-value">12</div><div className="stat-note"><span className="trend-up">↗ 3</span> new this month</div></article>
            <article className="stat-card"><div className="stat-topline"><span>On-time delivery</span><span className="stat-icon orange-icon">◷</span></div><div className="stat-value">96<span className="stat-unit">%</span></div><div className="stat-note"><span className="trend-up">↗ 4%</span> from last month</div></article>
          </section>

          <div className="dashboard-columns">
            <section className="content-card projects-card" id="projects">
              <div className="card-heading">
                <div><h2>Projects</h2><p>Keep an eye on what&apos;s in motion.</p></div>
                <button className="text-button" type="button" onClick={() => setActiveNavigation("My projects")}>View all <span aria-hidden="true">→</span></button>
              </div>
              <div className="project-list">
                {projects.map((project) => (
                  <article className="project-row" key={project.name}>
                    <span className={`project-symbol ${project.tone}`} aria-hidden="true">{project.name.charAt(0)}</span>
                    <div className="project-info">
                      <div className="project-title-row"><strong>{project.name}</strong><span className="project-due">Due {project.due}</span></div>
                      <span className="project-team">{project.team}</span>
                      <div className="progress-row">
                        <div className="progress-track" role="progressbar" aria-label={`${project.name} progress`} aria-valuenow={project.progress} aria-valuemin="0" aria-valuemax="100"><span className={`progress-fill ${project.tone}`} style={{ width: `${project.progress}%` }} /></div>
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-card activity-card" id="activity">
              <div className="card-heading">
                <div><h2>Recent activity</h2><p>The latest from your team.</p></div>
                <button className="more-button" type="button" aria-label="More activity options">···</button>
              </div>
              <div className="activity-list">
                {filteredActivities.length ? filteredActivities.map((activity) => (
                  <article className="activity-row" key={activity.name}>
                    <span className={`activity-avatar ${activity.tone}`}>{activity.initials}</span>
                    <div className="activity-copy"><p><strong>{activity.name}</strong> {activity.action}</p><span>{activity.time}</span></div>
                  </article>
                )) : <p className="empty-activity">No activity matches “{searchTerm}”.</p>}
              </div>
              <button className="activity-link" type="button" onClick={() => setSearchTerm("")}>View all activity <span aria-hidden="true">→</span></button>
            </section>
          </div>

          <section className="focus-banner">
            <div className="focus-icon" aria-hidden="true">✦</div>
            <div><strong>Make today count</strong><p>You&apos;re off to a great start. Keep the momentum going.</p></div>
            <span className="focus-sparkle" aria-hidden="true">✧</span>
          </section>
          <footer className="dashboard-footer">A little more clarity, every day.<span>Made for the way you work.</span></footer>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
