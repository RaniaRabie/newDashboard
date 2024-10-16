import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  Alert
} from "@mui/material";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer.",
    avatarUrl: "https://via.placeholder.com/150"
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
    console.log("Profile updated:", user);
    setOpenSnackbar(true); // Show snackbar notification
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundColor: '#f4f6f8',
        borderRadius: 2,
        boxShadow: 3,
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Avatar
        alt={user.name}
        src={user.avatarUrl}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

   

      {/* Form Fields */}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={user.bio}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
        />
        
      </form>

   {/* Save Button */}
   <Button
        variant="contained"
        type="button" // Change type to "button"
        onClick={handleSubmit} // Handle the form submission
        sx={{
          borderRadius: "8px",
          width: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#ee6c4d",
          "&:hover": {
            bgcolor: "#ee6c4d",
            boxShadow: "none",
          },
        }}
      >
        Save
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfile;
