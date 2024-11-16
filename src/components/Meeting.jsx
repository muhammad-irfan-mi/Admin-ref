import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, CardMedia, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import axios from 'axios';

const Meeting = () => {
  const [count, setCount] = useState(0);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null); // To store selected meeting ID
  const [singleMeeting, setSingleMeeting] = useState([]); // Store the fetched meeting details

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  // Fetch all meetings
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/meetings`);
        const result = await response.data;
        const updatedData = result.data.map(user => ({
          ...user,
          active: true
        }));
        setCount(result.count);
        setMeetings(updatedData);
      } catch (error) {
        console.error('Fetching data error', error);
      }
    };
    getData();
  }, []);

  // Fetch single meeting by ID when `selectedMeetingId` changes
  useEffect(() => {
    if (selectedMeetingId) {
      const getMeeting = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/meetings/${selectedMeetingId}`);
          const result = await response.data.user;
          setSingleMeeting(result); // Set the fetched single meeting data
        } catch (error) {
          console.log("Error fetching single meeting", error);
        }
      };
      getMeeting();
    }
  }, [selectedMeetingId]); // Trigger when selectedMeetingId changes

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to close the modal
  const closeModal = () => setSelectedMeetingId(null);

  return (
    <Box p={4}>
      {/* Render each meeting */}
      {meetings.map((meeting) => (
        <Box
          backgroundColor={colors.primary[400]}
          key={meeting._id}
          sx={{ width: '70%', m: "14px auto", borderRadius: "7px", cursor: 'pointer', padding: "7px" }}
          onClick={() => setSelectedMeetingId(meeting._id)} // Set meeting ID on click
        >
          <Box sx={{ display: 'flex', m: "13px" }}>
            <Typography variant="h5" fontWeight="bolder" fontSize="23px" sx={{ color: colors.greenAccent[400] }}>
              Meeting ID: <Typography variant='span' fontWeight="bold" fontSize="19px" sx={{ color: colors.greenAccent[100] }}>{meeting._id}</Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", px: "15px" }}>
            <Typography fontWeight="bolder" sx={{ mb: "10px" }}>
              Start Time: <Typography>{meeting.createdAt}</Typography>
            </Typography>
            <Typography fontWeight="bold" sx={{ mb: "10px" }}>
              Duration: <Typography>{meeting.updatedAt}</Typography>
            </Typography>
            <Typography fontWeight="bold" sx={{ mb: "10px" }}>
              End Time: <Typography>{meeting.createdAt}</Typography>
            </Typography>
          </Box>
        </Box>
      ))}

      {/* Modal to display selected meeting details */}
      <Modal open={Boolean(selectedMeetingId)} onClose={closeModal}>
        <Box
          backgroundColor={colors.primary[400]}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '45%',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            outline: 'none',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary',
            }}
            onClick={closeModal}
          >
            <CloseIcon />
          </IconButton>

          {/* Display meeting details in modal */}
          <Box>
            {singleMeeting.map((meeting, index) => (
              <Box key={meeting._id} sx={{ mb: 4 }} >
                <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
                  Meeting {index + 1}: {meeting.name}
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  {/* User Image */}
                  <Grid item xs={4} textAlign="center">
                    <CardMedia
                      component="img"
                      image={meeting.picUrl}
                      alt={meeting.name}
                      sx={{ width: 160, height: 144, borderRadius: 2 }}
                    />
                  </Grid>

                  {/* User Details (Name, Email, Role) */}
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      <strong>Name:</strong> {meeting.name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Email:</strong> {meeting.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Role:</strong> {meeting.role || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>

    </Box>
  );
};

export default Meeting;
