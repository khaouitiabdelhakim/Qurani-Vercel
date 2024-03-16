"use client";
import { useEffect, useState } from "react";
import { database } from "../../configs/firebase.config";
import { ref, get, update, remove } from "@firebase/database";
import { useSearchParams } from "next/navigation"; // Assuming you're using React Router
import { Upload } from "@/models/Upload";

const ParticipationDetails = () => {
  const [participationDetails, setParticipationDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isDeleting, setDeleting] = useState(false);
  const [isQualifing, setQualifing] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessages] = useState("");

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

  const deleteTeam = async () => {
    setDeleting(true); // Set deleting state to true

    const teamRef = ref(database, `fintech/2024/teams/${id}`); // Reference to the team node in the database
    const participationRef = ref(database, `fintech/2024/participations/${id}`); // Reference to the participation node in the database

    try {
      await remove(teamRef); // Remove the team from the database
      await update(participationRef, { isQualified: false }); // Update isQualified to false in participations node
      console.log("Team deleted successfully!");
      setSuccesMessages("Team deleted successfully!");
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Error deleting team:", error.message);
    } finally {
      setDeleting(false); // Reset the deleting state
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
              <div className="w-full">
                <h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
                    {participationDetails.teamName}
                  </span>{" "}
                  Team.
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

                  {participationDetails.isQualified === false && (
                    <div className="mb-4">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        style={{
                          paddingTop: "15px",
                          paddingBottom: "15px",
                          paddingLeft: "22px",
                          paddingRight: "22px",
                        }}
                        onClick={qualifyTeam}
                        disabled={participationDetails.isQualified}
                      >
                        {isQualifing && (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="me-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                        Qualify this team
                      </button>
                    </div>
                  )}

                  {participationDetails.isQualified && (
                    <div className="mb-4">
                      <button
                        type="button"
                        className="mb-2 me-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
                        style={{
                          paddingTop: "15px",
                          paddingBottom: "15px",
                          paddingLeft: "22px",
                          paddingRight: "22px",
                        }}
                        onClick={deleteTeam} // Call deleteTeam function when button is clicked
                        disabled={isDeleting}
                      >
                        {isDeleting && (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="me-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                        Delete this team
                      </button>
                    </div>
                  )}

                  <div className="mb-12 w-full">
                    <small
                      className="ms-2 font-semibold text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: "23px",
                        marginLeft: "0px",
                        paddingLeft: "0px",
                      }}
                    >
                      Team Members
                    </small>

                    <table
                      className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
                      style={{ borderRadius: "10px" }}
                    >
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Full Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Phone
                          </th>
                          <th scope="col" className="px-6 py-3">
                            School
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {participationDetails.profile1.fullName}
                          </th>
                          <td className="px-6 py-4">
                            {participationDetails.profile1.email}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile1.phone}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile1.school}
                          </td>
                        </tr>

                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {participationDetails.profile2.fullName}
                          </th>
                          <td className="px-6 py-4">
                            {participationDetails.profile2.email}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile2.school}
                          </td>
                        </tr>

                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {participationDetails.profile3.fullName}
                          </th>
                          <td className="px-6 py-4">
                            {participationDetails.profile3.email}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile3.school}
                          </td>
                        </tr>

                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {participationDetails.profile4.fullName}
                          </th>
                          <td className="px-6 py-4">
                            {participationDetails.profile4.email}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile4.school}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {participationDetails.profile5.fullName}
                          </th>
                          <td className="px-6 py-4">
                            {participationDetails.profile5.email}
                          </td>
                          <td className="px-6 py-4">
                            {participationDetails.profile5.school}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationDetails;
