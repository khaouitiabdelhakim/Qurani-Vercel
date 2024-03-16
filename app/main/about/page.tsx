import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About KHAOUITI Blogs",
  description: "Embark on a journey of discovery with KHAOUITI Blogs: Where passion meets insight, and every word paints a vivid picture."
};

const AboutPage = () => {

  return (
    <>
    
      <Breadcrumb
        pageName="KHAOUITI Blogs"
        description="Embark on a journey of discovery with KHAOUITI Blogs: Where passion meets insight, and every word paints a vivid picture."  />
      <AboutSectionTwo />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
