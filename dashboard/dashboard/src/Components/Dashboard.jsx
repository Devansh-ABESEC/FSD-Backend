import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (

    <div className="dashboard">

      <nav className="navbar">

        <h2>🌈 MyApp</h2>

        <div className="navbar-right">

          <span>Welcome, User 👋</span>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>


      <div className="dashboard-content">

        <h1>Dashboard</h1>

        <p className="welcome">
          Welcome to your dashboard!
        </p>


        <div className="cards">

          <div className="card blue">

            <div className="icon">
              👤
            </div>

            <h2>Profile</h2>

            <p>
              Manage your personal profile.
            </p>

            <button>
              View Profile
            </button>

          </div>


          <div className="card purple">

            <div className="icon">
              📊
            </div>

            <h2>Analytics</h2>

            <p>
              Check your account activity.
            </p>

            <button>
              View Analytics
            </button>

          </div>


          <div className="card green">

            <div className="icon">
              ⚙️
            </div>

            <h2>Settings</h2>

            <p>
              Manage your account settings.
            </p>

            <button>
              Settings
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;