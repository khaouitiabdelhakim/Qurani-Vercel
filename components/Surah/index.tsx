"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const quran = require("holy-quran");

const Surah = () => {
  const color = "#620075";
  const index = 45
  const surahs = quran.HolyQuranHafsVersion[index]["verses"];
  const translation = quran.QuranEnglish[index];

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update current year when component mounts
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          {surahs.map((surah, index) => (
            <div key={index} style={{ marginBottom: "35px", marginTop:"10px" , borderRadius:"10px",
            padding:"16px"}}>
              <div className="flex w-full items-center">
                <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                  <div className="w-full">
                    <h4
                      className=" mb-1 text-sm font-medium text-dark dark:text-white"
                      style={{ fontSize: "28px", direction: "rtl" }}
                    >
                      {surah}
                    </h4>
                  </div>
                </div>
                <div className="inline-block">
                  <h4
                    className="mb-1 text-sm font-medium text-dark dark:text-white"
                    style={{ direction: "ltr" }}
                  >
                    {index + 1}
                  </h4>
                </div>
              </div>
              <div
                className="flex w-full items-center"
                style={{ marginTop: "20px" }}
              >
                <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 w-full">
                  <div className="w-full">
                    <h4
                      className="mb-1 text-sm font-medium text-dark dark:text-white"
                      style={{ fontSize: "18px", direction: "ltr" , color: "#007868"}}
                    >
                      {translation[index]}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Surah;
