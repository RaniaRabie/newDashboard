// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import './App.css'
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";


import BarChart from "./pages/Analystics/BarChart";
import PieChart from "./pages/Analystics/PieChart";
import LineChart from "./pages/Analystics/LineChart";
import AllUsers from "./pages/form/users/AllUsers";
import AddNewUser from "./pages/form/users/AddNewUser";
import Profile from "./pages/form/users/Profile";
import Faq from "./pages/faq/FAQ";
import Setting from './pages/setting/Setting'
import ManageRoadmap from "./pages/form/roadmap/ManageRoadmap";
import AddNewRoadmap from "./pages/form/roadmap/AddNewRoadmap";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="barchart" element={<BarChart />} />
      <Route path="piechart" element={<PieChart />} />
      <Route path="linechart" element={<LineChart />} />
      <Route path="allusers" element={<AllUsers />} />
      <Route path="addnewuser" element={<AddNewUser />} />
      <Route path="profile" element={<Profile />} />
      <Route path="manageroadmap" element={<ManageRoadmap />} />
      <Route path="addnewroadmap" element={<AddNewRoadmap />} />
      <Route path="faq" element={<Faq />} />
      <Route path="setting" element={<Setting />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
