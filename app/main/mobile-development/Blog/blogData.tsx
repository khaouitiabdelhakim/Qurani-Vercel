import { Blog } from "@/models/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "How to access a view in Android",
    paragraph:"Here's a tutorial with code examples on how to access a view in Android",
    image: "https://lh3.googleusercontent.com/VhzhQj_OUkp-PgQNC1KQDposWzclAVkar34xrxQoXiNqAyACd_Ttfftcfdwnh2lmyBo9",
    author: {
      name: "KHAOUITI Abdelhakim",
      image: "/images/profile.jpg",
      designation: "KHAOUITI Blogs owner",
    },
    tags: ["Music Streaming"],
    publishDate: "March 15, 2024",
    link:"/main/mobile-development/blog-001"
  },
  
];
export default blogData;
