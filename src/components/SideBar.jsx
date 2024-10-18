import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "../components/SidebarMenu";

import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DataObjectIcon from "@mui/icons-material/DataObject";
import CodeIcon from "@mui/icons-material/Code";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";

import "./sideBar.css";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },

  {
    path: "/Analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
    subRoutes: [
      {
        path: "/barchart",
        name: "Bar Chart ",
        icon: <BarChartIcon />,
      },
      {
        path: "/linechart",
        name: "Line Chart",
        icon: <ShowChartIcon />,
      },
      {
        path: "/piechart",
        name: "Pie Chart",
        icon: <PieChartIcon />,
      },
    ],
  },

  {
    path: "/Users",
    name: "Users",
    icon: <GroupIcon />,
    subRoutes: [
      {
        path: "/allusers",
        name: "All Users ",
        icon: <PersonSearchIcon />,
      },
      {
        path: "/addnewuser",
        name: "Add New User",
        icon: <PersonAddIcon />,
      },
    ],
  },

  

  {
    path: "/roadmap",
    name: "Roadmap",
    icon: <AddRoadIcon />,
    subRoutes: [
      {
        path: "/allroadmaps",
        name: "All Roadmaps",
        icon: <EditRoadIcon />,
      },
    ],
  },

  {
    path: "/faq",
    name: "FAQ",
    icon: <LiveHelpIcon />,
    exact: true,
  },

  {
    path: "/setting",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="container">
        <div className="main-container">
          <motion.div
            animate={{
              width: isOpen ? "200px" : "45px",
              transition: { duration: 0.5, type: "spring", damping: 10 },
            }}
            className={`sidebar`}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    Dashboard
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars" onClick={toggle}>
                <FaBars />
              </div>
            </div>

            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                      key={index}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          </motion.div>
          <motion.main
        animate={{
          marginLeft: isOpen ? "170px" : "45px",
          transition: { duration: 0.5 },
        }}
        className="main-content"
      >
        {children}
      </motion.main>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default SideBar;
