import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Tooltip,
  InputAdornment,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AddNewUser = () => {
  // Username Validation
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [usernameTooltipOpen, setUsernameTooltipOpen] = useState(false); // State for username tooltip

  const handleUsernameFocus = () => {
    setUsernameTooltipOpen(!isValidUsername); // Show tooltip if username is invalid
  };

  const handleUsernameBlur = () => {
    setUsernameTooltipOpen(false); // Hide tooltip when focus is lost
  };

  useEffect(() => {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    setIsValidUsername(usernameRegex.test(username));
  }, [username]);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Email Validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false); // State for email tooltip

  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // Store the new email value
    setEmail(newEmail);

    // Validate email and set error state
    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(newEmail); // Check validity of new email
    setEmailError(!isValid);

    // Show tooltip if the email is invalid and the input is not empty
    setEmailTooltipOpen(!isValid && newEmail.length > 0);
  };

  // Show tooltip on focus; hide if valid email
  const handleEmailFocus = () => {
    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(email); // Check validity of the current email
    setEmailTooltipOpen(!isValid); // Show tooltip if the email is invalid
  };

  // Hide tooltip when focus is lost
  const handleEmailBlur = () => {
    setEmailTooltipOpen(false); // Hide tooltip when focus is lost
  };

  /////////////////////////////////////////////////
  //Password Validaion
  // State for passwords
  const [password, setPassword] = useState(""); // Password for sign-up
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const validations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
  const validationCriteria = [
    { label: "At least 8 characters", valid: validations.minLength },
    { label: "At least one uppercase letter", valid: validations.hasUpperCase },
    { label: "At least one lowercase letter", valid: validations.hasLowerCase },
    { label: "At least one number", valid: validations.hasNumber },
    {
      label: "At least one special character",
      valid: validations.hasSpecialChar,
    },
  ];
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  /////////////////////////////////////////////////

  const [role, setRole] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setSnackbarOpen(false);

    try {
      const response = await fetch(
        "https://localhost:7265/api/Dashboard/AddUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      if (response.ok) {
        // Handle successful response
        setSnackbarMessage("User added successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // Reset fields
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
      } else {
        // Try to get error message from backend
        let errorMessage = "Failed to add user."; // Default message
        try {
          const errorData = await response.json();

          // Handle validation errors
          if (errorData.errors) {
            // Check if it's validation error for username or password
            if (errorData.errors.UserName) {
              errorMessage = errorData.errors.UserName[0]; // Specific username error
            } else if (errorData.errors.Password) {
              errorMessage = errorData.errors.Password[0]; // Specific password error
            } else if (errorData.errors.length > 0) {
              errorMessage = errorData.errors[1]; // Get the second error message for conflicts
            } else {
              errorMessage = errorData.title || errorMessage; // If no specific error, use title
            }
          } else if (errorData.title) {
            errorMessage = errorData.title; // If no specific error, use title
          }
        } catch (jsonError) {
          // If JSON parsing fails, try text
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }

        setSnackbarMessage(errorMessage);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("An error occurred: " + error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 500 }, // Use full width on extra small screens
        mx: "auto",
        p: { xs: 2, sm: 4 }, // Adjust padding based on screen size
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography
          sx={{
            fontSize: { xs: 24, md: 36 }, // Adjust font size for different screens
            fontWeight: "bold",
            color: "#293241",
            m: "auto",
          }}
        >
          Add New User
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Username field */}
          <Grid item xs={12}>
            <TextField
              placeholder="Username"
              type="text"
              
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!isValidUsername} // Show error when username is invalid
              onFocus={handleUsernameFocus} // Show tooltip on focus
              onBlur={handleUsernameBlur} // Hide tooltip on blur
              autoComplete="off"
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "#293241", // Maintain your desired text color
                  transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                },
                "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                  {
                    backgroundColor: "transparent",
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                    transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                  },
                width: { xs: "100%", sm: "400px" }, // Responsive width
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  height: "40px",
                  margin: "0",
                  border: "1px solid gray",
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": {
                    borderColor: "gray",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <PersonIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            {/* Tooltip for username */}
            <Tooltip
              title={
                !isValidUsername
                  ? "Username must be 3-15 characters long and contain only letters and numbers."
                  : ""
              }
              placement={isMobile ? "bottom" : "right-start"} // Conditionally set the placement
              open={usernameTooltipOpen}
              arrow
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5", // Set your desired background color here
                    color: "#ee6c4d", // Optional: Set text color for better visibility
                    textTransform: "bold",
                    fontSize: 13,
                  },
                },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: isMobile? [-100, 0] : [10, -5], // Larger vertical offset for mobile mode
                    },
                  },
                ],
              }}
            />
          </Grid>
          {/* Email field */}
          <Grid item xs={12}>
            <TextField
              placeholder="Email"
              type="email"
              
              error={emailError}
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              autoComplete="off"
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "#293241", // Maintain your desired text color
                  transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                },
                "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                  {
                    backgroundColor: "transparent",
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                    transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                  },
                width: { xs: "100%", sm: "400px" }, // Responsive width
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  height: "40px",
                  margin: "10px 0",
                  border: "1px solid gray",
                  "& fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": {
                    borderColor: "gray",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <EmailIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            {/* Tooltip for email */}
            <Tooltip
              title="Please enter a valid email"
              placement={isMobile ? "bottom" : "right-start"} // Conditionally set the placement
              open={emailTooltipOpen}
              arrow
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5",
                    color: "#ee6c4d",
                    textTransform: "bold",
                    fontSize: 13,
                  },
                },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: isMobile? [-10, 8] : [20, -5], // Larger vertical offset for mobile mode
                    },
                  },
                ],
              }}
            />
          </Grid>
          {/* Password field with tooltip */}
          <Grid item xs={12}>
            <Tooltip
              title={
                <Box sx={{ width: 230 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 13, fontWeight: "bold", color: "#293241" }}
                  >
                    Password Requirements:
                  </Typography>
                  <List>
                    {validationCriteria.map((item, index) => (
                      <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                        <Typography
                          color={item.valid ? "green" : "red"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "10px",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {item.valid ? "✔" : "✖"} {item.label}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              }
              open={tooltipOpen && validationCriteria.some((item) => !item.valid)} // Keep tooltip open if some criteria are not met
            placement={isMobile? "bottom" : "right-start"}
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: isMobile? [10, -5] : [0, -8], // Larger vertical offset for mobile mode
                    },
                  },
                ],
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5",
                    color: "#293241",
                  },
                },
              }}
            >
              <TextField
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
              
                sx={{
                  width: { xs: "100%", sm: "400px" }, // Responsive width
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    height: "40px",
                    border: "1px solid gray",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-root": {
                    "&.Mui-focused": { borderColor: "gray" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ee6c4d",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottom: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <LockIcon
                          style={{
                            color: "#ee6c4d",
                            fontSize: 30,
                            marginRight: 5,
                          }}
                        />
                      </div>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleShowPassword}
                        edge="end"
                        style={{ color: "gray" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>
          </Grid>
          {/* Select Role */}
          <Grid item xs={12}>
            <Select
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                width: { xs: "100%", sm: "400px" }, // Responsive width
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  border: "1px solid gray",
                  "& fieldset": { border: "none" },
                },
                "& .MuiSelect-select": {
                  color: "gray",
                  padding: "10px 14px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "15px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    "& .MuiMenuItem-root": {
                      color: "#293241",
                    },
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width:"200px",
                  borderRadius: "20px",
                  backgroundColor: "#ee6c4d",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#d95b38",
                  },
                }}
              >
                Add User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddNewUser;
