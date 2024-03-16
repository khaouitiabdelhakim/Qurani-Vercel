"use client";

import { useEffect, useState } from "react";
import { getUnixTime } from "date-fns";
import { push as upload, ref, set, onValue, off } from "@firebase/database";
import { database } from "../../configs/firebase.config";
import Link from "next/link";

const Score = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    teamName: "",
    isQualified: false,
    profile1: { fullName: "", email: "" },
    profile2: { fullName: "", email: "" },
    profile3: { fullName: "", email: "" },
    profile4: { fullName: "", email: "" },
    profile5: { fullName: "", email: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name.includes(".") ? name.split(".")[0] : name]: {
        ...prevState[name.includes(".") ? name.split(".")[0] : name],
        [name.includes(".") ? name.split(".")[1] : null]: value,
      },
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [successMessage, setSuccessMessages] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 10000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [success]);

  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Reference to 'participation' node in your Firebase Realtime Database
    const participationRef = ref(database, "fintech/2024/teams");

    // Listen for changes to the 'participation' node
    onValue(participationRef, (snapshot) => {
      const data = snapshot.val(); // Retrieve the data from the snapshot
      if (data) {
        // Convert the object of objects into an array of objects
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Convert upload_01 to upload_04 values from string to boolean
        const mappedDataArray = dataArray.map((item) => ({
          ...item,
          upload_01: !!item.uploads.upload_01,
          upload_02: !!item.uploads.upload_02,
          upload_03: !!item.uploads.upload_03,
          upload_04: !!item.uploads.upload_04,
        }));

        setTeamsData(mappedDataArray); // Set the fetched data to state
        setLoading(false);
        console.log(mappedDataArray);
      }
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      // Stop listening for changes when component unmounts
      off(participationRef);
    };
  }, []); // Run this effect only once after component mounts

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div
        className=" overflow-x-auto shadow-md sm:rounded-lg"
        style={{ margin: 20 }}
      >
        <div className="flex-column flex flex-wrap items-center justify-between space-y-4  pb-4 dark:bg-gray-900 md:flex-row md:space-y-0">
          <div></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full rounded-lg text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team
              </th>
              <th scope="col" className="px-6 py-3">
                1 <sup>st</sup> file
              </th>
              <th scope="col" className="px-6 py-3">
                2 <sup>nd</sup> file
              </th>
              <th scope="col" className="px-6 py-3">
                3 <sup>rd</sup> file
              </th>
              <th scope="col" className="px-6 py-3">
                4 <sup>th</sup> file
              </th>
              <th scope="col" className="px-6 py-3">
                Explore
              </th>
            </tr>
          </thead>

          <tbody>
            {teamsData.map((team) => (
              <tr
                key={team.id}
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <div className="ps-3">
                    <div className="text-base font-semibold">{team.name}</div>
                    <div className="font-normal text-gray-500">
                      {team.login}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`me-2 h-2.5 w-2.5 rounded-full  ${team.upload_01 ? "bg-green-500" : "bg-red-500"}`}
                    ></div>{" "}
                    {team.upload_01 ? "Submited" : "Not Yet"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`me-2 h-2.5 w-2.5 rounded-full  ${team.upload_02 ? "bg-green-500" : "bg-red-500"}`}
                    ></div>{" "}
                    {team.upload_02 ? "Submited" : "Not Yet"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`me-2 h-2.5 w-2.5 rounded-full  ${team.upload_03 ? "bg-green-500" : "bg-red-500"}`}
                    ></div>{" "}
                    {team.upload_03 ? "Submited" : "Not Yet"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`me-2 h-2.5 w-2.5 rounded-full  ${team.upload_04 ? "bg-green-500" : "bg-red-500"}`}
                    ></div>{" "}
                    {team.upload_04 ? "Submited" : "Not Yet"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={{
                      pathname: `/admin/team`,
                      query: { id: team.id },
                    }}
                    className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
                    style={{
                      textDecoration: "none",
                      margin: "auto",
                      fontSize: "1rem",
                    }}
                  >
                    Explore
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </section>
  );
};

export default Score;
