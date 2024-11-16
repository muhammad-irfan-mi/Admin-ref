import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StarIcon from '@mui/icons-material/Star';
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";
import img from '../../assets/user.jpg'
import UserVideo from "../../components/UserVideo";
import UserEvents from "../../components/UserEvents";
import UserJobs from "../../components/UserJobs";

const Team = ({ onBack, userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [allUsersIds, setAllUsersIds] = useState([]);
  const [count, setCount] = useState(0)
  const navigate = useNavigate();


  const [test, setTest] = useState([{}])
  useEffect(() => {
    // Fetch the data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getAllUser`);
        const userIds = response.data.map(user => user._id);
        setAllUsersIds(userIds)
        setTest(response.data);  // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();  // Call the function to fetch data
  }, []);
  console.log(JSON.stringify(test, null, 2))

  const handleBlockUser = async (userId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/api/block/${userId}`)
      if (response.status === 'Ok') {
        alert("User Blocked")
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  const handleUnblockUser = async (userId) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/api/unblock/${userId}`)
      if (response.status === 'Ok') {
        alert("User Blocked")
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  return (
    <Box
      backgroundColor={colors.primary[900]}
      sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="TOTAL REFERRAL" subtitle="Managing the All Referral" />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={`${count}`}
              subtitle="Total Referral"
              icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>
        <Box sx={{
          margin: "20px 0px",
          border: `3px solid ${colors.primary[400]}`,
          borderRadius: "10px",
          overflow: "hidden"
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.primary[400] }}> {/* Blue background */}
                  <TableCell sx={{ color: "#fff" }}>Profile</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Referral</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {test.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.fname} ${user.lname}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.referral}</TableCell>
                    <TableCell>
                      <Button sx={{ backgroundColor: colors.greenAccent[600], mx: "2px" }}>Profile</Button>
                      <Button
                        sx={{ backgroundColor: colors.greenAccent[600], mx: "2px" }}
                        onClick={() => user.isBlocked === "true" ? handleUnblockUser(user._id) : handleBlockUser(user._id)}
                      >
                        {user.isBlocked === 'true'? "Unblock" : "Block"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
