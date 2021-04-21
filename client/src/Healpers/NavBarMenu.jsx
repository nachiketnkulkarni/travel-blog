export const SigninNavBarMenus = [
  {
    id: "1",
    link: "/home",
    title: "Dashboard",
  },
  // {
  //   id: "2",
  //   link: "/profile",
  //   title: "Profile",
  // },
  {
    id: "3",
    link: "/add",
    title: "Add Post",
  },
  {
    id: "4",
    link: "/",
    title: "SignOut",
    func: () => functionLogout(),
  },
];

const functionLogout = () => {
  localStorage.removeItem("authToken");
};
