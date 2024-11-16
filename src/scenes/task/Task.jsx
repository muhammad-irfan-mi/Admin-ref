import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Box, Grid } from "@mui/material";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const Task = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
    { optionText: "", isCorrect: false },
  ]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionText: question,
      options: options,
    };

    console.log('Question Data:', questionData); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/addQuestion`, questionData);
      console.log('Question posted successfully', response.data);
      setQuestion('')
      setOptions([
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ]);
    } catch (error) {
      console.error('Error posting question', error);
    }
  };


  return (
    <Box
      bgcolor={colors.primary[900]}
      sx={{height: '87vh', overflowY: "auto", padding: '20px'}}
    >
      <Box
        sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* Question Input */}
          <TextField
            fullWidth
            // variant="outlined"
            label="Enter your question here"
            value={question}
            onChange={handleQuestionChange}
            margin="normal"
          />

          {/* Options with Checkboxes */}
          <Grid container spacing={2}>
            {options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`Option ${String.fromCharCode(65 + index)}`}
                  value={option.optionText}
                  onChange={(e) => handleOptionChange(e, index)}
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.isCorrect}
                      onChange={() => handleCheckboxChange(index)}
                      color="primary"
                    />
                  }
                  label="Correct Answer"
                />
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="info" fullWidth>
            Add Question
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Task;
