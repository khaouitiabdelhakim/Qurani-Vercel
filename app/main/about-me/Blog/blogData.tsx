import { Blog } from "@/models/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Who is Abdelhakim Khaouiti? - A Short Story",
    paragraph:
      "Hello everyone, I hope you're all doing well. Today, I want to share a bit about myself and how I got into coding orprogramming.",
    image: "/blogs/about-me/blog-001/2.jpg",
    author: {
      name: "KHAOUITI Apps",
      image: "/images/profile.jpg",
      designation: "App",
    },
    tags: ["About Me"],
    publishDate: "March 15, 2024",
    link:"/main/about-me/blog-001"
  },
  
];
export default blogData;
