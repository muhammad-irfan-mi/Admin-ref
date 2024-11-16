import { useEffect, useState } from "react";
import { Box, useTheme, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { tokens } from "../../theme";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useNavigate } from "react-router-dom";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import axios from "axios";

const ApprovedUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [team, setTeam] = useState([]);
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/api/getAllUser/approved`);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

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
                {team.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.fname} ${user.lname}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.referral}</TableCell>
                    <TableCell>
                      <Button sx={{ backgroundColor: colors.greenAccent[600], mx: "2px" }}>Profile</Button>
                      <Button sx={{ backgroundColor: colors.greenAccent[600], mx: "2px" }}>Block</Button>
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

export default ApprovedUser;
