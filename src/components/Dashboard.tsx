import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import PersonIcon from "@mui/icons-material/Person";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFZjbBnAowTs7jBTlDqErserc_6jDZy8E",
  authDomain: "health-guard-v1.firebaseapp.com",
  databaseURL:
    "https://health-guard-v1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-guard-v1",
  storageBucket: "health-guard-v1.appspot.com",
  messagingSenderId: "25738976542",
  appId: "1:25738976542:web:6688d8de3f2c82a64d7d0f",
  measurementId: "G-V6ZL7FGYW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Creating object for getDatabase function
const db = getDatabase(app);

function Dashboard() {
  // State to store the data from the Realtime Database
  let [realtimeDatabaseData, setRealtimeDatabaseData] = useState(null);
  // Function to subscribe to real-time updates
  useEffect(() => {
    const dbRef = ref(db, "Heartrate-Sensor-0/");

    // Set up a listener for changes in the database
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const resultData = snapshot.val();
        const resultDataKeys = Object.keys(resultData);

        if (resultDataKeys.length > 0) {
          const lastKey = resultDataKeys[resultDataKeys.length - 1];
          const lastChild = resultData[lastKey];

          const lastChildKeys = Object.keys(lastChild);

          if (lastChildKeys.length > 0) {
            const lastNode = lastChild[lastChildKeys[lastChildKeys.length - 1]];

            if (lastNode && lastNode.heartRate) {
              const lastHeartRate = lastNode.heartRate;
              console.log("Last Heart Rate: ", lastHeartRate);
              setRealtimeDatabaseData(lastHeartRate);
            }
          }
        }
      } else {
        console.log("No data found");
      }
    });
  }, []);

  console.log("realtimeDatabaseData: ", realtimeDatabaseData);
  return (
    <div className="App">
      <div className="table-container">
        <div className="table-heading">
          <div className="table-title">Monitor Users</div>
          <div className="users-chip">
            <PersonIcon />
            <div>4 users</div>
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
                <th>Heartrate</th>
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
                      alt="Health Guard Logo"
                    />
                    <div>Akash Ramjyothi</div>
                  </div>
                </td>
                <td>21 </td>
                <td>+91 8939928002</td>
                <td>
                  <div className="chips">
                    {realtimeDatabaseData !== null ? (
                      realtimeDatabaseData === 0 ? (
                        <div className="status-chip-disconnected">
                          Disconnected
                        </div>
                      ) : realtimeDatabaseData < 60 ? (
                        <div className="status-chip-low">Low BP</div>
                      ) : realtimeDatabaseData > 100 ? (
                        <div className="status-chip-high">High BP</div>
                      ) : (
                        <div className="status-chip-normal">Normal</div>
                      )
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </td>
                <td>{realtimeDatabaseData}</td>
                <td>
                  <Link to="/dashboard/Heartrate-Sensor-0">
                    <InfoTwoToneIcon />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="name-cell">
                    <img
                      src="https://media.licdn.com/dms/image/D5603AQENMbqcYYVEXQ/profile-displayphoto-shrink_800_800/0/1688925595055?e=2147483647&v=beta&t=gmQHwtcHrRL6VXO7ekbAwznXKnAqIFGhAM7a-bfcumY"
                      className="image--cover"
                      alt="Health Guard Logo"
                    />
                    <div>Raj Shukla</div>
                  </div>
                </td>
                <td>22 </td>
                <td>+91 6201991586</td>
                <td>
                  <div className="chips">
                    <div className="status-chip-high">High BP</div>
                  </div>
                </td>
                <td>124</td>
                <td>
                  <InfoTwoToneIcon />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="name-cell">
                    <img
                      src="https://media.licdn.com/dms/image/C5603AQEScHpTbc7SKQ/profile-displayphoto-shrink_800_800/0/1653956825675?e=2147483647&v=beta&t=s1kgm0boF5AnvI_l9oHTm4g0dKeBO1AyyrSF2gpmX98"
                      className="image--cover"
                      alt="Health Guard Logo"
                    />
                    <div>Pinak Bakshi</div>
                  </div>
                </td>
                <td>21 </td>
                <td>+91 9908289350</td>
                <td>
                  <div className="chips">
                    <div className="status-chip-low">Low BP</div>
                  </div>
                </td>
                <td>57</td>
                <td>
                  <InfoTwoToneIcon />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="name-cell">
                    <img
                      src="https://media.licdn.com/dms/image/D5603AQGWklpV8-Gz9g/profile-displayphoto-shrink_800_800/0/1672944339565?e=2147483647&v=beta&t=8pEJ8NfA38RRr2_VhBC66l6CxkuZmqatonXSOswau_w"
                      className="image--cover"
                      alt="Health Guard Logo"
                    />
                    <div>Jash Gandhi</div>
                  </div>
                </td>
                <td>22 </td>
                <td>+91 9741258877</td>
                <td>
                  <div className="chips">
                    <div className="status-chip-normal">Normal</div>
                  </div>
                </td>
                <td>84</td>
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
