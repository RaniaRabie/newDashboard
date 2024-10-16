import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid/components";
import { DataGrid } from "@mui/x-data-grid";
import GroupIcon from "@mui/icons-material/Group";

export default function Contacts() {
  const [rows, setRows] = useState([]); // Use state to store rows data

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("https://localhost:7265/api/Dashboard/GetAllUsers")
      .then((response) => response.json())
      .then((data) => {
        // Map API response to match DataGrid row format
        const formattedData = data.map((user, index) => ({
          id: index + 1,
          name: user.userName,
          email: user.email,
          role: user.role || "N/A", // Handle if role is empty
        }));
        setRows(formattedData); // Update rows with fetched data
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Empty dependency array ensures this runs once on mount

  const columns = [
    {
      field: "name",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          mt: -10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <GroupIcon sx={{ fontSize: 40, color: "#293241", mt: 10 }} />
          <Typography
            sx={{ fontSize: 40, fontWeight: "bold", color: "#293241", mt: 10 }}
          >
            Users
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
            maxWidth: 800,
            boxShadow: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
            }}
          >
            <DataGrid
              slots={{ toolbar: GridToolbarQuickFilter }}
              rows={rows} // Use the rows state here
              columns={columns}
              autoHeight={false}
              checkboxSelection
              disableSelectionOnClick
              sx={{
                height: "400px",
                "& .MuiInputBase-root": {
                  color: "#293241",
                },
                "& .MuiDataGrid-columnHeaders": {
                  color: "#293241",
                  fontSize: 16,
                },
                "& .MuiDataGrid-cell": {
                  color: "#293241",
                  fontSize: 14,
                },
                "& .MuiDataGrid-toolbarContainer": {
                  padding: "16px",
                  minHeight: "48px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
