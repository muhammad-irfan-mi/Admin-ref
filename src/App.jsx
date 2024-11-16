import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import BlockAccount from "./components/BlockAccount";
import AdminProfile from './scenes/AdminProfile/AdminProfile'

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "./theme";
// import Notifications from "./scenes/notification/Notifications";
import NotificationUser from "./components/NotificationUser";
import UserProfile from './components/userProfile'
// import Setting from "./scenes/setting/Setting";
import ApprovedUser from "./scenes/team/ApprovedUser";

// Users
import Team from "./scenes/team";
import NewUser from "./scenes/team/NewUser";
import Task from "./scenes/task/Task";
import Offer from "./scenes/offer/Offer";
import Request from "./scenes/withdraw/Request";
import AllTask from "./alltask/AllTask";
import Login from "./components/Login";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Conditionally render Sidebar outside Routes */}
          {location.pathname !== '/' && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/allUser" element={<Team />} />
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/blockaccounts" element={<BlockAccount />} />
              <Route path="notificationUser" element={<NotificationUser />} />
              <Route path="/user" element={<UserProfile />} />
              {/* <Route path="/setting" element={<Setting />} /> */}
              <Route path="/approved" element={<ApprovedUser />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/task" element={<Task />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/withdraw" element={<Request />} />
              <Route path="/alltask" element={<AllTask />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
