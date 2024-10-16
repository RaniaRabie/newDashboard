import {
  alpha,
  Box,
  IconButton,
  InputBase,
  Stack,
  styled,
  Toolbar,
  useTheme,
  Menu,
  MenuItem,
  List,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor
  const navigate = useNavigate(); // Initialize navigate function

  const toggleTheme = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element for the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };
  const handleProfileClick = () => {
    navigate("/profile"); // Replace "/profile" with your target route
  };

  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{  height: "69px", zIndex: 0, backgroundColor: "#1d242f" }}
    >
          

      <Toolbar >
         {/* top elements */}
         <Box display="flex" justifyContent="center" flexGrow={10}>

         <Stack direction="row" spacing={4} >
        
          <MenuItem sx={{fontSize:20}}>Home</MenuItem>
          <MenuItem sx={{fontSize:20}}>Start Here</MenuItem>
          <MenuItem sx={{fontSize:20}}>Service</MenuItem>
          <MenuItem sx={{fontSize:20}}>About Us</MenuItem>

       </Stack>
       </Box>
        <Box flexGrow="1" />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        
        <IconButton onClick={handleMenuClick} color="inherit">
        </IconButton>
       
        <Stack direction="row" spacing={1}>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === "light" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        
          <IconButton color="inherit" onClick={handleProfileClick} >

            <Person2OutlinedIcon />
          </IconButton>
        </Stack>



        {/* top elements */}
        <Stack direction="row" spacing={1}>
       
       
        </Stack>

      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
