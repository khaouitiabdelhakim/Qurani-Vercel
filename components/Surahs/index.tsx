"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const quran = require("holy-quran");

const Surahs = () => {
  const color = "#620075";
  const surahs = quran.HolyQuranHafsVersion;

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
            <div
              className="flex w-full items-center"
              style={{ marginTop: "20px" }}
            >
              <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                <div className="relative mr-4">
                  <div className="relative flex h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src="/images/circle-decoration.png"
                      alt="author"
                      width={130}
                      height={130}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                    سورة
                  </h4>
                  <p className="text-xs text-body-color" style={{fontSize:"20px"}}>{surah.name}</p>
                </div>
              </div>
              <div className="inline-block">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  نوع السورة
                </h4>
                <p className="text-xs text-body-color" style={{fontSize:"20px"}}>{surah.englishName}</p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Surahs;
