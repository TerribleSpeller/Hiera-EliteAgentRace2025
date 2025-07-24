import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import ChartFormat from '../components/chartjs-config';


export default function Home() {



  const exampleData = {
    "8": [],
    "7": ["Alice", "Bob"],
    "6": ["Charlie"],
    "5": ["David", "Doe"],
    "4": ["Eve"],
    "3": ["Frank"],
    "2": ["Grace", "Jane"],
    "1": ["Hank"],

  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cool-background">
        <div className="container mt-5">
          <div className="row">
            <div className="circle-cutout  col">
              <div className={` fill-background`} style={{ height: "1vh" }}>
                <div className=" row top-height">

                </div>
                {Object.keys(exampleData).reverse().map((key) => {
                  if (exampleData[key].length > 0) {
                    return (
                      <div key={key} className="color-test row other-heights ">
                        <div className="text-center">
                          {key} UNITS
                        </div>
                      </div>
                    );
                  }
                  return (
                      <div key={key} className="color-test row other-heights opacity-text">
                        <div className="text-center">
                          {key} UNITS
                        </div>
                      </div>
                    );
                })}

              </div>
            </div>
            <div className="col px-2">
              <div className=" row top-height mx-5">
                <div className="text-center">
                  <h1 className="text-white">Hiera - Elite Agent Race 2025</h1>
                </div>
              </div>
              {Object.keys(exampleData).reverse().map((key) => (
                <div key={key} className="color-test row other-heights mx-5">
                  <div className="text-center">
                    {key} UNITS
                  </div>
                  <div className="text-center">
                    {exampleData[key].join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </>
  );
}
