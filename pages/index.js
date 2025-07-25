import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import ChartFormat from '../components/chartjs-config';
import { getDatabase, ref, get, onValue, child, set, push, query, update, remove } from 'firebase/database';
import { database } from '../lib/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const db = database;
const auth = getAuth();

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bunchofShit, setBunchofShit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const dbRef = ref(db, 'CoordinationSystem/EliteHieraRace/');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBunchofShit(data);
        console.log("Data fetched:", data);
      } else {
        setBunchofShit({});
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user);
      window.location.href = "/dashboard"; // Redirect to another page
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const exampleData = {
    "8": [],
    "7": ["Alice", "Bob"],
    // "7": [],

    "6": ["Charlie"],
    "5": ["David", "Doe"],
    "4": ["Eve"],
    "3": ["Frank"],
    "2": ["Grace", "Jane"],
    "1": ["Hank"],
  }

  const currentDate = new Date();
  const targetDate = new Date("2025-10-31")
  const differential = targetDate - currentDate;
  const monthsLeft = Math.floor(differential / (1000 * 60 * 60 * 24 * 30));
  const daysLeft = Math.floor(differential / (1000 * 60 * 60 * 24)) % 30;
  const hoursLeft = Math.floor(differential / (1000 * 60 * 60)) % 24;

  const splitAgentName = (name) => name.replace(/([a-z])([A-Z])/g, "$1 $2");




  return (
    <>
      <div className="cool-background">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-7 order-1 order-md-2">
              <div className="row justify-content-end">
                <div className="col">

                </div>
                <div className="col-12 col-md-6 text-end">
                  <Image style={{ float: "right" }} src="/topbar.png" alt="Description" width={300} height={100} />

                </div>
              </div>
              <div className="row">
                <div className="text-end mt-3">
                  <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 order-2 order-md-1">
              <div className="row justify-content-left">
                <h1 style={{ textAlign: "left" }}><b>Time Left</b></h1>
              </div>
              <div className="row">
                <div className="col">
                  <div className="text-center d-flex justify-content-around align-items-center">
                    <h3>{monthsLeft} months</h3>
                    <h3>{daysLeft} days</h3>
                    <h3>{hoursLeft} hours</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {bunchofShit && (<p>Test</p>)} */}
          <div className="container mt-5">
            <Image className="img-fluid" src="/bg-3.png" alt="Racing Background" width={1000} height={3332 / 8} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
            <div className="racing-background">

              {
                Object.entries(bunchofShit).map(([agent, progress], index) => {
                  const displayName = splitAgentName(agent);
                  return (
                    <div key={agent} className="row justify-content-center align-items-center px-md-5 py-5 px-sm-0" >
                      <div className="col-10 col-12-sm position-relative px-md-5 px-sm-0">
                        {/* <h3 className="text-center" style={{ color: "white" }}>{agent}</h3> */}
                        <div className="progress position-relative" style={{ overflow: "visible" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${(progress / 8) * 100}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="8"
                          >
                            {/* {progress}/8 */}
                          </div>
                          <img
                            src={`/car${(index % 8) + 1}.png`} // Cycles through car1.png to car5.png
                            alt="Avatar"
                            className="position-absolute"
                            style={{
                              top: "-3vh", // Moves the avatar above the progress bar
                              left: `${(progress / 8) * 100}%`,
                              transform: "translate(-50%, 0)", // Adjusts horizontal alignment
                              width: "clamp(150px, 30vw, 250px)", // Dynamically sized based on viewport width
                              height: "auto", // Maintains aspect ratio
                              borderRadius: "50%",
                              zIndex: 10, // Ensures it appears above other elements
                            }}
                          />
                          {progress > 0 && (
                            <img
                              src={`/${progress}.png`} // Cycles through car1.png to car5.png
                              alt="AvatarUnit"
                              className="position-absolute"
                              style={{
                                top: "-3vh", // Moves the avatar above the progress bar
                                left: `${(progress / 8) * 100}%`,
                                transform: "translate(-140%, 15%)", // Adjusts horizontal alignment
                                width: "clamp(30px, 3vw, 250px)", // Dynamically sized based on viewport width
                                height: "auto", // Maintains aspect ratio
                                borderRadius: "50%",
                                zIndex: 10, // Ensures it appears above other elements
                              }}
                            />
                          )}
                          <div
                            className="position-absolute text-center"
                            style={{
                              top: "calc(-3vh + 50px)", // Adjusts position to follow the avatar
                              left: `${(progress / 8) * 100}%`,
                              transform: "translate(-50%, 0)", // Centers the text below the avatar
                              zIndex: 11, // Ensures it appears above other elements
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.9)", // Adds a semi-transparent bubble
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "15px",
                                fontSize: "clamp(10px, 1.5vw, 16px)", // Dynamically sized text
                              }}
                            >
                              {displayName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className="py-5">

              </div>
            </div>
            <Image className="img-fluid" src="/bg-4-bottom.png" alt="Racing Background" width={1000} height={3332 / 8} style={{ objectFit: "contain", width: "100%", height: "auto" }} />

          </div>
        </div>
      </div >


      {showModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-3"
                />
                {error && <p className="text-danger">{error}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
