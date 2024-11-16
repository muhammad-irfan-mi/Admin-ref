import { Box, Button, Typography, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserJobs = ({ open, handleClose, userId }) => {

  const [myjobs, setMyJobs] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);

        const job = await response.data.data.jobs;
        const jobLength = await response.data.data.jobs.length;
        console.log("jobLength", jobLength)

        console.log(job)
        setMyJobs(job)

      } catch (err) {
        console.error("Testing Error is ", err);
      }
    };

    if (userId) {
      getData();
    }
  }, [userId]);
  const data = [
    {
      id: 1,
      jobTitle: "Developer",
      salaryRange: "$3k-$5K",
      workplaceType: "Remote",
      applicationDeadline: "1 september"
    },
    {
      id: 2,
      jobTitle: "Designer",
      salaryRange: "$3k-$5K",
      workplaceType: "On-Site",
      applicationDeadline: "1 september"
    },
    {
      id: 3,
      jobTitle: "Designer",
      salaryRange: "$3k-$5K",
      workplaceType: "On-Site",
      applicationDeadline: "1 september"
    },
    {
      id: 4,
      jobTitle: "Designer",
      salaryRange: "$3k-$5K",
      workplaceType: "On-Site",
      applicationDeadline: "1 september"
    },
    {
      id: 5,
      jobTitle: "Designer",
      salaryRange: "$3k-$5K",
      workplaceType: "On-Site",
      applicationDeadline: "1 september"
    },
  ]
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        backgroundColor={colors.primary[400]}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: '60vh',
          borderRadius: 2,
          overflowY: "auto",
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Jobs
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={2}
          height="calc(100% - 48px)" // Subtract header height
        >
          {myjobs.map((job, index) => (
            <Box
              key={job._id}
              height="auto"
              boxShadow={3}
              borderRadius={2}
              border={1}
              borderColor="grey.300"
              position="relative"
              p={2}
              mb={2}
            >
              <Box>
                <Box display="flex" gap={2} alignItems="center">
                  <IconButton
                    style={{
                      backgroundColor: "rgb(61,165,138)",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "2rem",
                      // padding: "0.5rem",
                    }}
                  >
                    {/* Add icon here if needed */}
                  </IconButton>
                  <Box >
                    <Typography variant="h6" fontWeight="bold" style={{ color: "#4CCEAC" }}>
                      {job.location}
                    </Typography>
                    <Typography variant="h5" fontWeight="bolder" style={{ color: "#4CCEAC" }}>
                      {job.jobTitle}
                    </Typography>
                    <Typography variant="p">
                      {job.jobDescription}
                    </Typography>
                    <Typography variant="body2">DeadLine: {job.applicationDeadline}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mt={2} color="textSecondary">
                  Job Type: {job.jobType}
                </Typography>
                <Typography variant="body2" mt={2} color="textSecondary">
                  Location: {job.workplaceType}
                </Typography>
                <Typography variant="body2" mt={1} color="textSecondary">
                  Salary in PKR/- : {job.salaryRange}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default UserJobs;
