import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BlockIcon from '@mui/icons-material/Block';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isTotalUsersOpen, setIsTotalUsersOpen] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <MenuItem
              active={selected === "Dashboard"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Dashboard")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard</Typography>
              <Link to="/" />
            </MenuItem> */}
            <MenuItem
              active={selected === "Total Users"}
              style={{ color: colors.grey[100] }}
              onClick={() => {
                setSelected("Total Users");
                setIsTotalUsersOpen(!isTotalUsersOpen);
              }}
              icon={<PeopleOutlinedIcon />}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography>Total Users</Typography>
                <IconButton sx={{ p: 0 }}>
                  {isTotalUsersOpen ? <KeyboardArrowDownIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize="small" />}
                </IconButton>
              </Box>
              <Link to="/allUser" />
            </MenuItem>
            {isTotalUsersOpen && (
              <Box pl={4}>
                <MenuItem
                  active={selected === "approved user"}
                  style={{ color: colors.grey[100] }}
                  onClick={() => setSelected("approved user")}
                  icon={<InsertInvitationIcon />}
                >
                  <Typography>Approved User</Typography>
                  <Link to="/approved" />
                </MenuItem>
                <MenuItem
                  active={selected === "New User"}
                  style={{ color: colors.grey[100] }}
                  onClick={() => setSelected("New User")}
                  icon={<BusinessCenterIcon />}
                >
                  <Typography>Pending Users</Typography>
                  <Link to="/newUser" />
                </MenuItem>
              </Box>
            )}
            <MenuItem
              active={selected === "Diactivate Account"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Diactivate Account")}
              icon={<BlockIcon />}
            >
              <Typography>Diactivate Accounts</Typography>
              <Link to="/blockaccounts" />
            </MenuItem>

            {/* <MenuItem
              active={selected === "Notification"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Notification")}
              icon={<NotificationsOutlinedIcon />}
            >
              <Typography>Notification</Typography>
              <Link to="/notification" />
            </MenuItem> */}

            <MenuItem
              active={selected === "Task Assign"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Task Assign")}
              icon={<PlaylistAddCheckIcon />}
            >
              <Typography>Task Assign</Typography>
              <Link to="/task" />
            </MenuItem>

            <MenuItem
              active={selected === "All Task"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("All Task")}
              icon={<TaskAltOutlinedIcon />}
            >
              <Typography>All Task</Typography>
              <Link to="/alltask" />
            </MenuItem>

            <MenuItem
              active={selected === "Add Offer"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Add Offer")}
              icon={<ReceiptOutlinedIcon />}
            >
              <Typography>Add Offers</Typography>
              <Link to="/offer" />
            </MenuItem>

            <MenuItem
              active={selected === "Withdraw Request"}
              style={{ color: colors.grey[100] }}
              onClick={() => setSelected("Withdraw Request")}
              icon={<RequestQuoteOutlinedIcon />}
            >
              <Typography>Withdraw Request</Typography>
              <Link to="/withdraw" />
            </MenuItem>

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
