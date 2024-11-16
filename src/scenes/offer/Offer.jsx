import { Box, useTheme, IconButton, Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const Offer = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [formData, setFormData] = useState({
        newPointValue: '',
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Display preview
            setImageFile(file);
        }
    };

    const handleUpload = async () => {
        if (!imageFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACK_URL}/api/offer`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Image uploaded successfully!");
                console.log("Response data:", data);
                setSelectedImage(null);
                setImageFile(null);
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred while uploading the image.");
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePoint = async (e) => {
        e.preventDefault();
        const pointValue = parseInt(formData.newPointValue);

        if (!pointValue || isNaN(pointValue)) {
            alert("Please add a valid point value");
            return;
        }

        try {
            const response = await axios.put(`${process.env.REACT_APP_BACK_URL}/api/defaultPoint`, { newPointValue: pointValue }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert('Point Update successfully');
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Box
            backgroundColor={colors.primary[900]}
            sx={{
                height: "87vh",
                overflowY: "auto",
                padding: "20px",
                // display: "flex",
                // flexDirection: "column",
                // alignItems: "center",
                // justifyContent: "center",
            }}
        >
            <Box display="grid" gridTemplateColumns="repeat(6, 3fr)" p={'12px'} gridAutoRows="140px" gap="20px" backgroundColor={colors.primary[400]} sx={{ width: "49%", margin: "20px 0px" }}>
                <Box gridColumn="span 6">
                    <Typography variant="h4" sx={{ margin: '12px', color: colors.greenAccent[600] }}>
                        Update Point for New User
                    </Typography>
                    <input
                        type="text"
                        name="newPointValue"
                        value={formData.newPointValue}
                        placeholder="Add Point Only Number"
                        style={{ margin: "12px", padding: "7px", backgroundColor: "transparent", outline: "none", border: "1px solid white", color: 'white' }}
                        onChange={handleInputChange}
                    /><br />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ margin: '0px 12px 12px 12px', backgroundColor: colors.greenAccent[600] }}
                        onClick={handlePoint}

                    >
                        Update Point
                    </Button>
                </Box>
            </Box>
            {/* Image display box */}
            <Box
                sx={{
                    width: "300px",
                    height: "230px",
                    backgroundColor: colors.primary[500],
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "20px",
                }}
            >
                {selectedImage && (
                    <Box
                        component="img"
                        src={selectedImage}
                        alt="Selected"
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                )}

                <IconButton
                    color="primary"
                    component="label"
                    sx={{
                        color: colors.grey[100],
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        zIndex: "1",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                    }}
                >
                    <AddIcon fontSize="small" />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                    />
                </IconButton>
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
            >
                Uplaod Image
            </Button>
        </Box>
    );
};

export default Offer;
