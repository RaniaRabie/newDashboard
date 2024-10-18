import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
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
import Setting from "./pages/setting/Setting";
import AllRoadmaps from "./pages/roadmap/create/AllRoadmaps";
import CreateRoadmap from "./pages/roadmap/create/CreateRoadmap";
import RoadmapDetails from "./pages/roadmap/create/Roadmapdetails";
import { RoadmapProvider } from "./pages/roadmap/create/RoadmapContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard newUsersCount={undefined} />} />
      <Route path="barchart" element={<BarChart />} />
      <Route path="piechart" element={<PieChart />} />
      <Route path="linechart" element={<LineChart />} />
      <Route path="allusers" element={<AllUsers />} />
      <Route path="addnewuser" element={<AddNewUser />} />
      <Route path="profile" element={<Profile />} />
      <Route path="faq" element={<Faq />} />
      <Route path="setting" element={<Setting />} />
      <Route path="allroadmaps" element={<AllRoadmaps />} />
      <Route path="create" element={<CreateRoadmap />} />
      <Route path="details" element={<RoadmapDetails />} />
      <Route path="/create/:id" element={<CreateRoadmap />} />
      <Route path="details/:id" element={<RoadmapDetails />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RoadmapProvider>
      <RouterProvider router={router} />
    </RoadmapProvider>
  </React.StrictMode>
);
