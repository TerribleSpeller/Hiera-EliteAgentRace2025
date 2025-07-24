import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js";
import ChartFormat from '../components/chartjs-config';
import { getDatabase, ref, get, onValue, child, set, push, query, update, remove } from 'firebase/database';
import { database } from '../lib/firebaseConfig';


const db = database;
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bunchofShit, setBunchofShit] = useState({});

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




  return (
    <>
      <div className="cool-background">
        <div className="container mt-5">
          <div className="row">
            <div className="col-5">
              <div className="row justify-content-left">
                <h1 style={{ "textAlign": "left" }}><b>Time Left</b></h1>
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
            <div className="col-7">
              <Image style={{ "float": "right" }} src="/topbar.png" alt="Description" width={300} height={100} />
            </div>
          </div>
          {/* {bunchofShit && (<p>Test</p>)} */}
          <div className="container ">
            <Image className="img-fluid" src="/bg-3.png" alt="Racing Background" width={1000} height={3332 / 8} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
            <div className="racing-background">

              {
                Object.entries(bunchofShit).map(([agent, progress]) => (
                  <div key={agent} className="row justify-content-center align-items-center px-5 py-5">
                    <div className="col-12 position-relative">
                      <h3 className="text-center">{agent}</h3>
                      <div className="progress position-relative" style={{ overflow: "visible" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(progress / 8) * 100}%` }}
                          aria-valuenow={progress}
                          aria-valuemin="0"
                          aria-valuemax="8"
                        >
                          {progress}/8
                        </div>
                        <img
                          src="/car1.png"
                          alt="Avatar"
                          className="position-absolute"
                          style={{
                            top: "-30px", // Moves the avatar above the progress bar
                            left: `${(progress / 8) * 100}%`,
                            transform: "translate(-50%, 0)", // Adjusts horizontal alignment
                            width: "200px", // Slightly larger for emphasis
                            height: "70px",
                            borderRadius: "50%",
                            zIndex: 10, // Ensures it appears above other elements
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="py-5">

              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
