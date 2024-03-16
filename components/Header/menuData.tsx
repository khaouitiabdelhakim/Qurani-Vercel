import { Menu } from "@/models/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "الرئيسية",
    path: "/main",
    newTab: false,
  },
  {
    id: 2,
    title: "القرآن الكريم",
    path: "/main/about",
    newTab: false,
  },
  {
    id: 3,
    title: "تلاوات",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Languages",
        path: "/main/languages",
        newTab: false,
      },
      {
        id: 32,
        title: "Public Speaking",
        path: "/main/public-speaking",
        newTab: false,
      },
      {
        id: 33,
        title: "Travel",
        path: "/main/travel",
        newTab: false,
      },
      {
        id: 34,
        title: "Relegion",
        path: "/main/relegion",
        newTab: false,
      },
      {
        id: 34,
        title: "About Me",
        path: "/main/about-me",
        newTab: false,
      },
    ],
  },
  
  {
    id: 4,
    title: "Technologies",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Frameworks",
        path: "/main/frameworks",
        newTab: false,
      },
      {
        id: 42,
        title: "Mobile Development",
        path: "/main/mobile-development",
        newTab: false,
      },
      {
        id: 43,
        title: "Softwares",
        path: "/main/softwares",
        newTab: false,
      },
      {
        id: 44,
        title: "Mobile Apps",
        path: "/main/mobile-apps",
        newTab: false,
      },
      {
        id: 45,
        title: "Design",
        path: "/main/design",
        newTab: false,
      },
      {
        id: 46,
        title: "Programing",
        path: "/main/programing",
        newTab: false,
      },
    ],
  },
];
export default menuData;
