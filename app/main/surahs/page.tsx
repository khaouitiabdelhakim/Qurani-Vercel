import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Surah from "@/components/Surah";
import Surahs from "@/components/Surahs";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About KHAOUITI Blogs",
  description: "Embark on a journey of discovery with KHAOUITI Blogs: Where passion meets insight, and every word paints a vivid picture."
};

const SurahsPage = () => {

  return (
    <>
    
      <Breadcrumb
        pageName="سور القرآن الكريم"
        description="هنا يمكنم تصفح جميع سور القرآن الكريم"  />
      <Surah/>
    </>
  );
};

export default SurahsPage;
