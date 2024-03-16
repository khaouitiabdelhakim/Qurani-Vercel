import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KHAOUITI Blogs",
  description: "Embark on a journey of discovery with KHAOUITI Blogs: Where passion meets insight, and every word paints a vivid picture.",

};

export default function Home() {

  

  return (
    <>
      <Hero />
      <AboutSectionTwo />
      <AboutSectionOne />
    </>
  );
}
