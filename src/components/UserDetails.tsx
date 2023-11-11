import { useEffect, useState } from "react";
import "./UserDetails.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import healthGuardLogo from "./safety.png";

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
  let [realtimeDatabaseData, setRealtimeDatabaseData] = useState(null);
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
          <div className="user-details-card">
            <div className="image-wrapper">
              <img
                src="https://avatars.githubusercontent.com/u/54114888?v=4"
                className="user-image"
                alt="Health Guard Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
