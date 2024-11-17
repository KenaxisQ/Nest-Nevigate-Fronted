/* eslint-disable jsx-a11y/img-redundant-alt */
import "./AdminDashboardHome.css";
export const AdminDashboardHome = () => {
  const onCollapse = () => {
    document
      .getElementById("toggle-btn")
      .addEventListener("click", function () {
        var sidebar = document.getElementById("sidebar");
        var content = document.getElementById("content");
        if (sidebar.classList.contains("sidebar-collapsed")) {
          sidebar.classList.remove("sidebar-collapsed");
          content.classList.remove("content-expanded");
          this.innerHTML = '<i class="fas fa-angle-left"></i>';
        } else {
          sidebar.classList.add("sidebar-collapsed");
          content.classList.add("content-expanded");
          this.innerHTML = '<i class="fas fa-angle-right"></i>';
        }
      });
  };
  return (
    <>
      <div class="d-flex">
        <div class="sidebar" id="sidebar">
          <button class="btn">+ Create new project</button>
          <button>
            <i class="fas fa-tachometer-alt"></i>
            Dashboard
          </button>
          <button>
            <i class="fas fa-home"></i>
            Properties
          </button>
          <button>
            <i class="fas fa-tasks"></i>
            Manage Requests
          </button>
          <button>
            <i class="fas fa-users"></i>
            Users
          </button>
          <button>
            <i class="fas fa-user-tie"></i>
            Agents
          </button>
          <button>
            <i class="fas fa-cog"></i>
            Settings
          </button>
        </div>
        <div class="content flex-grow-1" id="content">
          <button class="toggle-btn" id="toggle-btn" onClick={onCollapse}>
            <i class="fas fa-angle-left"></i>
          </button>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Admin Dashboard</h1>
            <div class="d-flex align-items-center">
              <input
                class="form-control me-3"
                placeholder="Search for anything..."
                type="text"
              />
              <div class="d-flex align-items-center">
                <img
                  alt="User profile picture"
                  class="rounded-circle me-2"
                  height="40"
                  src="https://storage.googleapis.com/a1aa/image/gYyeq39xzX3fmUfffVbzluZhcn5r6b22vCfQpl3mvXDxhUd8E.jpg"
                  width="40"
                />
                <div>
                  <strong>Alex meian</strong>
                  <br />
                  <small>Product manager</small>
                </div>
              </div>
            </div>
          </div>
          <h2>Overview</h2>
          <div class="row">
            <div class="col-md-3">
              <div class="overview-card">
                <i class="fas fa-users fa-2x" style={{ color: "#6f42c1;" }}></i>
                <h3>Total Users</h3>
                <p>450</p>
                <p class="increase">↑ 12% increase from last month</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="overview-card">
                <i
                  class="fas fa-user-tie fa-2x"
                  style={{ color: "#fd7e14;" }}
                ></i>
                <h3>Total Agents</h3>
                <p>120</p>
                <p class="decrease">↓ 10% decrease from last month</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="overview-card">
                <i
                  class="fas fa-building fa-2x"
                  style={{ color: "#0d6efd;" }}
                ></i>
                <h3>Total Properties - Sale</h3>
                <p>1024</p>
                <p class="increase">↑ 8% increase from last month</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="overview-card">
                <i class="fas fa-home fa-2x" style={{ color: "#ffc107;" }}></i>
                <h3>Total Properties - Rent</h3>
                <p>1350</p>
                <p class="increase">↑ 2% increase from last month</p>
              </div>
            </div>
          </div>
          <h2>Recent Listings</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="card listing-card">
                <img
                  alt="Skyper Pool Apartment"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/eXHqIphupSXIJyPGoc9mhNGVPn6QWN9s6BFYCKajez1JS1xTA.jpg"
                  width="600"
                />
                <div class="badge">FOR SALE</div>
                <div class="card-body">
                  <h5>Skyper Pool Apartment</h5>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    1020 Bloomingdale Ave
                  </p>
                  <p class="price">₹280,000</p>
                  <p>
                    <i class="fas fa-bed"></i>4<i class="fas fa-bath"></i>2
                    <i class="fas fa-ruler-combined"></i>
                    450
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card listing-card">
                <img
                  alt="North Dillard Street"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/djqBAOM9NUrRJlPFdMOU27efb1j4xpKLEFPl0ykgXfbLkqjnA.jpg"
                  width="600"
                />
                <div class="badge badge-rent">FOR RENT</div>
                <div class="card-body">
                  <h5>North Dillard Street</h5>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    4330 Bell Shoals Rd
                  </p>
                  <p class="price">₹250/month</p>
                  <p>
                    <i class="fas fa-bed"></i>4<i class="fas fa-bath"></i>2
                    <i class="fas fa-ruler-combined"></i>
                    400
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card listing-card">
                <img
                  alt="North Dillard Street"
                  height="400"
                  src="https://storage.googleapis.com/a1aa/image/djqBAOM9NUrRJlPFdMOU27efb1j4xpKLEFPl0ykgXfbLkqjnA.jpg"
                  width="600"
                />
                <div class="badge badge-rent">FOR RENT</div>
                <div class="card-body">
                  <h5>North Dillard Street</h5>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    4330 Bell Shoals Rd
                  </p>
                  <p class="price">₹250/month</p>
                  <p>
                    <i class="fas fa-bed"></i>4<i class="fas fa-bath"></i>2
                    <i class="fas fa-ruler-combined"></i>
                    400
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
