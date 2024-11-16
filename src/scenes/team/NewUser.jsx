import { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Avatar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Input } from "@mui/material";
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";

const NewUser = ({ onBack, userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pendingUser, setPendingUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingUserId, setPendingUserId] = useState(null)
  const [count, setCount] = useState(0)
  const navigate = useNavigate();


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/approve`);
        const result = response.data;
        setPendingUser(result);

        const userIds = result.map(user => user.userId)[0];
        setPendingUserId(userIds);
        console.log("result", result)
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const approvedUser = async () => {
    try {
      const approvedResponse = await axios.patch(`${process.env.REACT_APP_BACK_URL}/api/approve/${pendingUserId}`)

      if (approvedResponse.status === 200) {
        alert('User Approved Successfully')

        const deleteResponse = await axios.delete(`${process.env.REACT_APP_BACK_URL}/api/approve/${pendingUserId}`)

        if (deleteResponse.status === 200) {
          console.log(deleteResponse)
        }
      }
    }
    catch (err) {
      console.log('error is ', err)
      alert('An error occurred. Please try again.');
    }
  }

  console.log("pendingUserId", pendingUserId)


  return (
    <Box
      backgroundColor={colors.primary[900]}
      sx={{ height: "87vh", overflowY: "auto", padding: "20px" }}>
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" gridAutoRows="140px" gap="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center" gridColumn="span 6">
            <Header title="Pending User " subtitle="Managing the All Pending User" />
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
          <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
            <StatBox
              title={`${count}`}
              subtitle="Total Pending User"
              icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
            />
          </Box>
        </Box>


        <Box m="40px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .name-column--cell.inactive": { filter: 'blur(2px)', color: 'red', textDecoration: 'line-through' },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}>
          <Box sx={{ padding: '20px' }}>
            <Grid container spacing={2}>
              {/* Loop through the data to create boxes */}
              {pendingUser.map((item) => (
                <Grid item xs={12} sm={4} key={item._id}>
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      overflow: "hidden"
                    }}
                  >
                    {/* Display image */}
                    <img
                      src={`http://localhost:3001${item.imageUrl}`}
                      alt="Not Found"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Display status */}
                    <Typography variant="h6" sx={{ margin: '12px' }}>
                      Status: {item.status}
                    </Typography>
                    {/* Approve button */}
                    <Button variant="contained" color="primary" sx={{ margin: '0px 12px 12px 12px' }} onClick={approvedUser}>
                      Approve
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewUser;
