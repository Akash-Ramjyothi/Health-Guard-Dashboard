import { useEffect, useState } from "react";
import "./UserDetails.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import healthGuardLogo from "./safety.png";
import { Alert, Button, Snackbar } from "@mui/material";

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

// Create a reference to the "Heartrate-Sensor-0/" location in the Firebase Realtime Database
const dbRef = ref(db, "Heartrate-Sensor-0/");

// Array list to store heartRate values
let heartRateList: any[] = [];

function UserDetails() {
  // State to store the data from the Realtime Database
  let [realtimeDatabaseData, setRealtimeDatabaseData] = useState<number | null>(
    null
  );

  // State for Snackbar open/close
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State to track whether the "Dispatch Medic" button is clicked
  const [dispatchButtonClicked, setDispatchButtonClicked] = useState(false);

  // Function to subscribe to real-time updates
  useEffect(() => {
    // Set up a listener for changes in the database
    onValue(dbRef, (snapshot) => {
      // Check if the data at the specified database location exists
      if (snapshot.exists()) {
        const resultData = snapshot.val(); // Get the data from the snapshot
        const resultDataKeys = Object.keys(resultData); // Get an array of keys (property names) from the data object

        // Check if there is at least one key in the array
        if (resultDataKeys.length > 0) {
          const lastKey = resultDataKeys[resultDataKeys.length - 1]; // Get the last key in the array
          const lastChild = resultData[lastKey]; // Get the child data associated with the last key
          console.log("lastChild: ", lastChild);

          // Get an array of values from lastChild
          const lastChildValues = Object.values(lastChild);

          // For each loop to iterate over lastChild object
          lastChildValues.forEach((value: any) => {
            heartRateList.push(value.heartRate); // Update Array list for Graph
          });

          console.log("heartRateList: ", heartRateList);

          const lastChildKeys = Object.keys(lastChild); // Get an array of keys from the lastChild object

          // Check if there is at least one key in the lastChildKeys array
          if (lastChildKeys.length > 0) {
            const lastNode = lastChild[lastChildKeys[lastChildKeys.length - 1]]; // Get the last key in the lastChildKeys array

            // Check if lastNode exists and has a property named "heartRate"
            if (lastNode && lastNode.heartRate) {
              const lastHeartRate = lastNode.heartRate; // Get the value of the "heartRate" property
              console.log("Last Heart Rate: ", lastHeartRate); // Log the last recorded heart rate to the console
              setRealtimeDatabaseData(lastHeartRate); // Set the state with the last recorded heart rate
            }
          }
        }
      } else {
        // Log a message to the console if no data is found at the specified location
        console.log("No data found");
      }
    });
  }, []);

  // Function to handle the "Dispatch Help" button click
  const handleDispatchMedic = () => {
    // Set Snackbar to open
    setSnackbarOpen(true);

    // Set helpButtonClicked to true
    setDispatchButtonClicked(true);
  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  console.log("realtimeDatabaseData: ", realtimeDatabaseData);
  return (
    <div className="App">
      <div className="parent-container">
        <div className="company-banner">
          <div className="product-wrapper">
            <img src={healthGuardLogo} width="50vh" height="50vh" alt="Logo" />
            <div className="company-text">Heart Guard Dashboard</div>
            <div className="user-details-text"> - User Details</div>
          </div>
        </div>
        <div className="cards-wrapper">
          <div className="row-one-wrapper">
            <div className="user-details-card">
              <div className="image-wrapper">
                <img
                  src="https://avatars.githubusercontent.com/u/54114888?v=4"
                  className="user-image"
                  alt="Health Guard Logo"
                />
              </div>
              <div className="divider"></div>
              <div className="user-info-wrapper">
                <table className="user-info-table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">First Name</div>
                          <div className="value"> Akash</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Last Name</div>
                          <div className="value"> Ram</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Age</div>
                          <div className="value"> 21</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Gender</div>
                          <div className="value"> Male</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Weight</div>
                          <div className="value"> 92 kg</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Last Checkup</div>
                          <div className="value"> 15-11-2023</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Phone No.</div>
                          <div className="value"> +91 8939928002</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Emergency No.</div>
                          <div className="value"> +91 8072137235</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">User ID</div>
                          <div className="value"> #144</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Blood Group</div>
                          <div className="value"> AB +ve</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Insurance ID</div>
                          <div className="value"> #RA2011</div>
                        </div>
                      </td>
                      <td>
                        <div className="user-attribute">
                          <div className="attribute">Assinged Doctor</div>
                          <div className="value"> Dr. Raj Shukla</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="heart-rate-card">
              <div className="user-location-text">User Location</div>
              {/*  If helpButtonClicked state is fale (Conditional Rendering) */}
              {dispatchButtonClicked ? (
                <div className="medic-dispatched-container">
                  <iframe
                    className="ambulance-lottie"
                    src="https://lottie.host/?file=1cc71fb7-e0b2-4d15-9200-110d0459eedb/PVUnduxKWh.json"
                  ></iframe>
                  <div className="medic-dispatched-text">
                    Medic Unit Dispatched
                  </div>
                </div>
              ) : (
                <div className="gps-container">
                  <iframe
                    className="maps-embeded"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d817.8360426975835!2d80.04179080814296!3d12.823507682393164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f70d55bee9e3%3A0x397c41fcb9ee02f6!2sUniversity%20Building!5e0!3m2!1sen!2sin!4v1699780289490!5m2!1sen!2sin"
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                  <Button
                    variant="contained"
                    sx={{
                      width: "40%",
                      height: "14%",
                      borderRadius: 2,
                      fontWeight: "bold",
                      backgroundColor: "red",
                    }}
                    onClick={handleDispatchMedic}
                  >
                    Dispatch Medic
                  </Button>
                </div>
              )}
              {/* Snackbar to show alert message */}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust the duration as needed
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="error"
                  variant="filled"
                  elevation={6}
                  sx={{
                    fontSize: 16,
                  }}
                >
                  Medical Unit dispatched to User's location
                </Alert>
              </Snackbar>
            </div>
          </div>
          <div className="row-two-wrapper">
            <div className="graph-chart-card"></div>
            <div className="dispatch-help-card">
              <div className="realtime-heartrate-text">Real-Time Heartrate</div>
              <div className="heartrate-container">
                {(() => {
                  if (realtimeDatabaseData != null) {
                    if (realtimeDatabaseData < 60) {
                      return (
                        <div className="low-bp-container">
                          <div className="low-bp-anim">
                            <img src="https://github.com/Akash-Ramjyothi/Leak-Master-App/assets/54114888/183ca62e-a906-4a07-9f51-f130743b415b" />
                          </div>
                          <div className="heartrate-info-section">
                            <div className="heartrate-value-wrapper">
                              <div className="status-text">Heartrate</div>
                              <div className="bpm-wrapper">
                                <div className="heart-rate-value">
                                  {realtimeDatabaseData}
                                </div>
                                <div className="bpm-text">bpm</div>
                              </div>
                            </div>
                            <div className="status-wrapper">
                              <div className="status-text">Status</div>
                              <div className="low-status-chip">Low BP</div>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (
                      realtimeDatabaseData >= 60 &&
                      realtimeDatabaseData <= 100
                    ) {
                      return (
                        <div className="low-bp-container">
                          <div className="low-bp-anim">
                            <img src="https://github.com/Akash-Ramjyothi/Leak-Master-App/assets/54114888/bd683396-b096-4ffe-9984-e8c69d4f7e68" />
                          </div>
                          <div className="heartrate-info-section">
                            <div className="heartrate-value-wrapper">
                              <div className="status-text">Heartrate</div>
                              <div className="bpm-wrapper">
                                <div className="heart-rate-value">
                                  {realtimeDatabaseData}
                                </div>
                                <div className="bpm-text">bpm</div>
                              </div>
                            </div>
                            <div className="status-wrapper">
                              <div className="status-text">Status</div>
                              <div className="normal-status-chip">
                                Normal BP
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="low-bp-container">
                          <div className="low-bp-anim">
                            <img src="https://github.com/Akash-Ramjyothi/Leak-Master-App/assets/54114888/d56dcb98-6384-4dea-b5f2-2b16f15246bf" />
                          </div>
                          <div className="heartrate-info-section">
                            <div className="heartrate-value-wrapper">
                              <div className="status-text">Heartrate</div>
                              <div className="bpm-wrapper">
                                <div className="heart-rate-value">
                                  {realtimeDatabaseData}
                                </div>
                                <div className="bpm-text">bpm</div>
                              </div>
                            </div>
                            <div className="status-wrapper">
                              <div className="status-text">Status</div>
                              <div className="high-status-chip">High BP</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
