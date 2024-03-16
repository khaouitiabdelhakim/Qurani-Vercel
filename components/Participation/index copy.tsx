"use client";
import { useEffect, useState } from "react";
import { getUnixTime } from "date-fns";
import {
  push as upload,
  ref,
  set,
  orderByChild,
  equalTo,
  get,
  query,
} from "@firebase/database";
import { database } from "../../configs/firebase.config";
import Link from "next/link";

const Participation = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    teamName: "",
    isQualified: false,
    profile1: { fullName: "", email: "", school: "", phone: "" },
    profile2: { fullName: "", email: "", school: "", phone: "" },
    profile3: { fullName: "", email: "", school: "", phone: "" },
    profile4: { fullName: "", email: "", school: "", phone: "" },
    profile5: { fullName: "", email: "", school: "", phone: "" },
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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessages] = useState("");

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 20000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 10000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [error]);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    setUploading(true);
    const participationsRef = ref(database, "fintech/2024/participations");

    // Check if there are existing participations with the same team name
    const myQuery = query(
      participationsRef,
      orderByChild("teamName"),
      equalTo(formData.teamName),
    );

    // Fetch existing participations with the same team name
    get(myQuery)
      .then((snapshot) => {
        const existingParticipations = [];
        snapshot.forEach((childSnapshot) => {
          existingParticipations.push(childSnapshot.val());
        });

        // If there are existing participations with the same team name, do not upload
        if (existingParticipations.length > 0) {
          setError(true);
          setMessage("A participation with the same team name already exists.");
          setUploading(false);
          console.log(
            "A participation with the same team name already exists.",
          );
        } else {
          // No existing participations with the same team name, proceed with upload
          const newParticipationRef = upload(participationsRef);
          const currentDate = getUnixTime(new Date());

          set(newParticipationRef, {
            id: newParticipationRef.key,
            projectTitle: formData.projectTitle,
            projectDescription: formData.projectDescription,
            teamName: formData.teamName,
            isQualified: formData.isQualified,
            dateParticipation: currentDate,
            profile1: formData.profile1,
            profile2: formData.profile2,
            profile3: formData.profile3,
            profile4: formData.profile4,
            profile5: formData.profile5,
          })
            .then(() => {
              setSuccesMessages(
                "Your team has been registered successfully. No further action is required.",
              );
              setSuccess(true);
              setUploading(false);
              console.log("saved successfully.");

              setFormData({
                projectTitle: "",
                projectDescription: "",
                teamName: "",
                isQualified: false,
                profile1: { fullName: "", email: "", school: "", phone: "" },
                profile2: { fullName: "", email: "", school: "", phone: "" },
                profile3: { fullName: "", email: "", school: "", phone: "" },
                profile4: { fullName: "", email: "", school: "", phone: "" },
                profile5: { fullName: "", email: "", school: "", phone: "" },
              })
            })
            .catch((error) => {
              setError(true);
              setMessage(error.message);
              console.log(error.message);
            });
        }
      })
      .catch((error) => {
        setError(true);
        setMessage(error.message);
        console.log(error.message);
      });
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

      {error && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
          id="toast-warning"
          className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {message || "An error occurred."}
          </div>
        </div>
      )}

      <div className="container">
        <div
          className="mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Danger</span>
          <div>
            <span className="font-medium">
              Before participating in the hackathon, ensure your team meets the
              following criteria:
            </span>
            <ul className="mt-1.5 list-inside list-disc">
              <li>Have 5 members in the group.</li>
              <li>Have a clear project idea with a title and description.</li>
              <li>That&apos;s better but not obligatory</li>
            </ul>
          </div>
        </div>

        <br />

        <div
          className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <svg
            className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              However, if you don&apos;t meet these criteria, don&apos;t worry.
              Our team allows you to participate even if you don&apos;t meet
              these requirements. If you lack a project idea or your team
              doesn&apos;t have the complete 5 members
            </span>
            <ul className="mt-1.5 list-inside list-disc">
              <li>
                You can still participate using the provided link and fill in
                the available information only.
              </li>
              <br />
              <li>
                <Link
                  className="text-sm hover:text-gray-600"
                  href="/main/incompleteparticipation"
                  style={{ fontSize: "28px" }}
                >
                  Click Here
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div
            className="wow fadeInUp mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              FINTECH HACKATHON
            </h2>
            <p className="mb-12 text-base font-medium text-body-color">
              Please fill in this form to participate in the Hackathon.
            </p>
            <form onSubmit={(e) => handleSubmit(e, formData)}>
              <div className="-mx-4 flex flex-wrap">
                {/*1st person*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      1<sup>st</sup> Member Name
                    </label>
                    <input
                      required
                      name="profile1.fullName"
                      value={formData.profile1.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 1st Member's Name"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      1 <sup>st</sup> Phone Number
                    </label>
                    <input
                      required
                      name="profile1.phone"
                      value={formData.profile1.phone}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 1st member phone number"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      1 <sup>st</sup> Member Email
                    </label>
                    <input
                      required
                      name="profile1.email"
                      value={formData.profile1.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter 1st Member's Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="school"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      1 <sup>st</sup> Member School Name
                    </label>
                    <input
                      required
                      name="profile1.school"
                      value={formData.profile1.school}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENSIAS-Rabat for example"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                {/*2nd person*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      2<sup>nd</sup> Member Name
                    </label>
                    <input
                      name="profile2.fullName"
                      value={formData.profile2.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 2nd Member's Name"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      2<sup>nd</sup> Member Email
                    </label>
                    <input
                      name="profile2.email"
                      value={formData.profile2.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter 2nd Member's Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="school"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      2<sup>nd</sup> Member School Name
                    </label>
                    <input
                      name="profile2.school"
                      value={formData.profile2.school}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENSIAS-Rabat for example"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                {/*3rd person*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      3<sup>rd</sup> Member Name
                    </label>
                    <input
                      name="profile3.fullName"
                      value={formData.profile3.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 3rd Member's Name"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      3<sup>rd</sup> Member Email
                    </label>
                    <input
                      name="profile3.email"
                      value={formData.profile3.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter 3rd Member's Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="school"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      3<sup>rd</sup> Member School Name
                    </label>
                    <input
                      name="profile3.school"
                      value={formData.profile3.school}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENSIAS-Rabat for example"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                {/*4th person*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      4<sup>th</sup> Member Name
                    </label>
                    <input
                      name="profile4.fullName"
                      value={formData.profile4.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 4th Member's Name"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      4<sup>th</sup> Member Email
                    </label>
                    <input
                      name="profile4.email"
                      value={formData.profile4.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter 4th Member's Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="school"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      4<sup>th</sup> Member School Name
                    </label>
                    <input
                      name="profile4.school"
                      value={formData.profile4.school}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENSIAS-Rabat for example"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                {/*5th person*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      5<sup>th</sup> Member Name
                    </label>
                    <input
                      name="profile5.fullName"
                      value={formData.profile5.fullName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter 5th Member's Name"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      5<sup>th</sup> Member Email
                    </label>
                    <input
                      name="profile5.email"
                      value={formData.profile5.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter 5th Member's Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="school"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      5<sup>th</sup> Member School Name
                    </label>
                    <input
                      name="profile5.school"
                      value={formData.profile5.school}
                      onChange={handleChange}
                      type="text"
                      placeholder="ENSIAS-Rabat for example"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Project Description [max 600 characters]
                    </label>
                    <textarea
                      required
                      maxLength={600}
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange2}
                      rows={8}
                      placeholder="Please describe your project in a few paragraphs. Include the main idea, key features, and any other relevant details."
                      className="w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    ></textarea>
                  </div>
                </div>

                {/*Project and team*/}
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Team Name
                    </label>
                    <input
                      required
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange2}
                      type="text"
                      placeholder="What is your team name? (e.g. Omega3, The Innovators, etc.)"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      Project Title
                    </label>
                    <input
                      required
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange2}
                      type="text"
                      placeholder="What's the title of your project?"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                </div>

                <div className="flex w-full items-center justify-center">
                  <button
                  disabled={uploading}
                    type="submit"
                    className="font-large mb-2 me-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
                    style={{
                      fontSize: "16px",
                      padding: "15px 25px",
                    }}
                  >
                    {uploading && (
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
                    Participate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Participation;
