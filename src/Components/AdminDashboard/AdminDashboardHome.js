/* eslint-disable jsx-a11y/img-redundant-alt */
import "./AdminDashboardHome.css";
import AdminDashboard from "../../Assets/AdminDashboard.svg";
import AdminProperties from "../../Assets/AdminProperties-icon.svg";
import AdminManageRequests from "../../Assets/AdminManageRequests_icon.svg";
import AdminUsers from "../../Assets/AdminUsers-icon.svg";
import AdminSettings from "../../Assets/AdminSettings-icon.svg";
import Plusframe from "../../Assets/plus.png";
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
      <div className="container-fluid"> 
      <div className="row">
        <div className="col-md-3">
          <div className="sidebar" id="sidebar">
            <button className="adminbtn">
            <div><img src={Plusframe} alt="+"/> &nbsp;Create new project</div></button>
            <button className="adminbtn">
              <img src={AdminDashboard} alt="Dashboard" />
              &nbsp; Dashboard
            </button>
            <button className="adminbtn">
            <img src={AdminProperties} alt="Dashboard" />
            &nbsp; Properties
            </button>
            <button className="adminbtn">
            <img src={AdminManageRequests} alt="Dashboard" />
            &nbsp; Manage Requests
            </button>
            <button className="adminbtn">
            <img src={AdminUsers} alt="Dashboard" />
            &nbsp; Users
            </button>
            <button className="adminbtn">
            <img src={AdminUsers} alt="Dashboard" />
            &nbsp; Agents
            </button>
            <button className="adminbtn">
            <img src={AdminSettings} alt="Dashboard" />
            &nbsp; Settings
            </button>
          </div>
        </div>
        <div className="col-md-9">
        </div>
      </div>
      </div>
    </>
  );
};
