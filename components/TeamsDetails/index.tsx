"use client";
import { useEffect, useState } from "react";
import { database } from "../../configs/firebase.config";
import { ref, get, update, remove, onValue, off } from "@firebase/database";
import { useSearchParams } from "next/navigation"; // Assuming you're using React Router
import { Upload } from "@/models/Upload";
import { TeamData } from "@/models/TeamData";

const TeamsDetails = () => {
  const [participationDetails, setParticipationDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const [isQualifing, setQualifing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessages] = useState("");
  const [password, updatePassword] = useState("");

  const [isGettingStatus, setStatus] = useState(true);

  const [teamData, setTeamData] = useState({} as TeamData);

  useEffect(() => {
    if (!id) return; // If id is not available, return early

    // Reference to 'participation' node in your Firebase Realtime Database
    const teamRef = ref(database, `fintech/2024/teams/${id}`);

    // Listen for changes to the 'participation' node
    const unsubscribe = onValue(teamRef, (snapshot) => {
      const data = snapshot.val(); // Retrieve the data from the snapshot
      if (data) {
        // Convert upload_01 to upload_04 values from string to boolean
        const mappedDataArray = {
          ...data,
          login: data.login,
          password: data.password,
          upload_01: !!data.uploads?.upload_01,
          upload_02: !!data.uploads?.upload_02,
          upload_03: !!data.uploads?.upload_03,
          upload_04: !!data.uploads?.upload_04,
        };
        updatePassword(data.password);

        setTeamData(mappedDataArray); // Set the fetched data to state
        setLoading(false);
        setStatus(false);
        console.log(mappedDataArray);
      }
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      // Stop listening for changes when component unmounts
      unsubscribe();
    };
  }, [id]); // Run this effect whenever id changes

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [success]);

  useEffect(() => {
    if (!id) return; // If id is not available, return early

    const participationsRef = ref(
      database,
      `fintech/2024/participations/${id}`,
    );

    const fetchParticipationDetails = async () => {
      try {
        const snapshot = await get(participationsRef);
        if (snapshot.exists()) {
          setLoading(false);
          setParticipationDetails(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching participation details:", error.message);
      }
    };

    fetchParticipationDetails();

    // Clean-up function
    return () => {
      setParticipationDetails(null); // Reset state on unmount
    };
  }, [id]);

  const updateTeamPassword = async () => {
    const teamRef = ref(database, `fintech/2024/teams/${id}`); // Reference to the team node in the database

    try {
      await update(teamRef, { password: password }); // Update isQualified to false in participations node
      console.log("Password updated successfully!");
      setSuccesMessages("Password updated successfully!");
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Error Updating Password!", error.message);
    }
  };

  const qualifyTeam = async () => {
    setQualifing(true);
    setSuccess(false);
    const teamName = participationDetails.teamName
      .toLowerCase()
      .replace(/\s+/g, "");
    const password = generatePassword(10); // Generate a random password
    const login = `ensias-fintech-${teamName}-hackathon`;

    const upload: Upload = {
      upload_01: "",
      upload_02: "",
      upload_03: "",
      upload_04: "",
    };

    const teamData = {
      id,
      login,
      password,
      name: participationDetails.teamName,
      uploads: upload,
    };

    const teamsRef = ref(database, `fintech/2024/teams/${id}`);
    const participationsRef = ref(
      database,
      `fintech/2024/participations/${id}`,
    );

    try {
      await update(teamsRef, teamData);
      await update(participationsRef, { isQualified: true }); // Set isQualified to true
      console.log("Team qualified successfully!");
      setSuccesMessages("Team qualified successfully!");
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setSuccesMessages("Error qualifying team");
      console.error("Error qualifying team:", error.message);
    } finally {
      setQualifing(false);
    }
  };

  const generatePassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      {success && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
          id="toast-default"
          className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
              />
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{successMessage}</div>
        </div>
      )}
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            {isLoading && (
              <div role="status" className="max-w-lg animate-pulse space-y-2.5">
                <div className="flex w-full items-center">
                  <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="flex w-full max-w-[480px] items-center">
                  <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="flex w-full max-w-[400px] items-center">
                  <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="flex w-full max-w-[480px] items-center">
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div className="flex w-full max-w-[440px] items-center">
                  <div className="ms-2 h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex w-full max-w-[360px] items-center">
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {participationDetails && (
              <div>
                <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
                    {participationDetails.teamName}
                  </span>{" "}
                  Uploads.
                </h3>

                <br />

                <div className="grid grid-cols-2 gap-x-4">
                  <div className="mb-4">
                    <small
                      className="ms-2 font-semibold text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: "23px",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      Project Title
                    </small>

                    <p>{participationDetails.projectTitle}</p>
                  </div>

                  <div className="mb-4">
                    <small
                      className="ms-2 font-semibold text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: "23px",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      Team Name
                    </small>
                    <p>{participationDetails.teamName}</p>
                  </div>
                  <div className="mb-4">
                    <small
                      className="ms-2 font-semibold text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: "23px",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      Is Qualified?
                    </small>
                    <p>{participationDetails.isQualified ? "Yes" : "No"}</p>
                  </div>

                  <div className="mb-4">
                    <small
                      className="ms-2 font-semibold text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: "23px",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      Project Description
                    </small>
                    <p>{participationDetails.projectDescription}</p>
                  </div>

                  {teamData.login && (
                    <div className="mb-4">
                      <form className="mx-auto max-w-sm">
                        <div className="mb-5">
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your email
                          </label>
                          <input
                            disabled
                            type="email"
                            id="email"
                            value={teamData.login}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="name@flowbite.com"
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your password
                          </label>
                          <input
                            min={10}
                            onChange={(e) => updatePassword(e.target.value)}
                            value={password}
                            type="text"
                            id="password"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            required
                          />
                        </div>

                        <button
                          onClick={updateTeamPassword}
                          type="button"
                          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="grid grid-cols-3 gap-x-4" data-wow-delay=".15s">
            <div className="mb-4 ">
              <div
                className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  1 <sup>st</sup> File | {teamData.name}
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Status{" "}
                  {!isGettingStatus && teamData.upload_01 && (
                    <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Uploaded.
                    </span>
                  )}
                  {!isGettingStatus && !teamData.upload_01 && (
                    <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      No file is uploaded yet.
                    </span>
                  )}
                </p>

                {teamData.upload_01 && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={teamData.uploads.upload_01}
                    className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="w-full">
                      Get the 1 <sup>st</sup> file
                    </span>
                    <svg
                      className="ms-2 h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="mb-4 ">
              <div
                className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  2<sup>nd</sup> File | {teamData.name}
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Status{" "}
                  {!isGettingStatus && teamData.upload_02 && (
                    <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Uploaded.
                    </span>
                  )}
                  {!isGettingStatus && !teamData.upload_02 && (
                    <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      No file is uploaded yet.
                    </span>
                  )}
                </p>

                {teamData.upload_02 && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={teamData.uploads.upload_02}
                    className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="w-full">
                      Get the 2<sup>nd</sup> file
                    </span>
                    <svg
                      className="ms-2 h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="mb-4 ">
              <div
                className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  3<sup>rd</sup> File | {teamData.name}
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Status{" "}
                  {!isGettingStatus && teamData.upload_03 && (
                    <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Uploaded.
                    </span>
                  )}
                  {!isGettingStatus && !teamData.upload_03 && (
                    <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      No file is uploaded yet.
                    </span>
                  )}
                </p>

                {teamData.upload_03 && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={teamData.uploads.upload_03}
                    className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="w-full">
                      Get the 3<sup>rd</sup> file
                    </span>
                    <svg
                      className="ms-2 h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div
                className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  4<sup>th</sup> File | {teamData.name}
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Status{" "}
                  {!isGettingStatus && teamData.upload_04 && (
                    <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Uploaded.
                    </span>
                  )}
                  {!isGettingStatus && !teamData.upload_04 && (
                    <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                      No file is uploaded yet.
                    </span>
                  )}
                </p>

                {teamData.upload_04 && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={teamData.uploads.upload_04}
                    className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-5 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="w-full">
                      Get the 4<sup>th</sup> file
                    </span>
                    <svg
                      className="ms-2 h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsDetails;
