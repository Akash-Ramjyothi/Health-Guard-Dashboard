import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import PersonIcon from "@mui/icons-material/Person";

function Dashboard() {
  return (
    <div className="App">
      <div className="table-container">
        <div className="table-heading">
          <div className="table-title">Monitor Users</div>
          <div className="users-chip">
            <PersonIcon />
            <div>2 users</div>
          </div>
          <div className="table-description">
            Monitor all the current registered users in real-time and view more
            details about them
          </div>
        </div>
        <div className="tbl-content">
          <table className="user-table">
            <thead className="tbl-header">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Status</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="name-cell">
                    <img
                      src="https://avatars.githubusercontent.com/u/54114888?v=4"
                      className="image--cover"
                    />
                    <div>Akash Ramjyothi</div>
                  </div>
                </td>
                <td>21 </td>
                <td>+91 8939928002</td>
                <td>
                  <div className="chips">
                    <div className="status-chip">Normal</div>
                  </div>
                </td>
                <td>
                  <InfoTwoToneIcon />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="name-cell">
                    <img
                      src="https://media.licdn.com/dms/image/D5603AQENMbqcYYVEXQ/profile-displayphoto-shrink_800_800/0/1688925595055?e=2147483647&v=beta&t=gmQHwtcHrRL6VXO7ekbAwznXKnAqIFGhAM7a-bfcumY"
                      className="image--cover"
                    />
                    <div>Raj Shukla</div>
                  </div>
                </td>
                <td>22 </td>
                <td>+91 6201991586</td>
                <td>
                  <div className="chips">
                    <div className="status-chip">High BP</div>
                  </div>
                </td>
                <td>
                  <InfoTwoToneIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
