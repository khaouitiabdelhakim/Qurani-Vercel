import { Menu } from "@/models/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Main",
    path: "/admin",
    newTab: false,
  },
  {
    id: 2,
    title: "Participations",
    path: "/admin/participations",
    newTab: false,
  },
  {
    id: 3,
    title: "I-Participations [new]",
    path: "/admin/incompleteparticipations",
    newTab: false,
  },
  {
    id: 4,
    title: "Teams",
    path: "/admin/teams",
    newTab: false,
  },
  {
    id: 5,
    title: "Settings",
    path: "/admin/settings",
    newTab: false,
  },
  {
    id: 6,
    title: "Reset",
    path: "/main/passwordforgotten", 
    newTab: false,
  },
];
export default menuData;
