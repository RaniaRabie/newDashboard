import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import { Box, Button, Paper, Stack, Tooltip, Typography } from "@mui/material";

const AllRoadmaps = () => {
  // const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    // Fetch all roadmaps from the JSON server
    axios
      .get("https://careerguidance.runasp.net/api/Dashboard/GetALlRoadmapsInDatabase")
      .then((response) => {
        // Assuming response.data is an array of roadmaps
        const parsedRoadmaps = response.data.map((roadmap) => {
          // Parse StringDataToPublish from JSON string
          if (typeof roadmap.roadmapData === "string") {
            roadmap.roadmapData = JSON.parse(roadmap.roadmapData);
          }
          return roadmap;
        });

        setRoadmaps(parsedRoadmaps); // Set the fetched and parsed roadmaps
        console.log(parsedRoadmaps);
      })
      .catch((error) => {
        console.error("Error fetching roadmaps:", error);
      });
  }, []);



  


  // useEffect(() => {
  //   const fetchAllRoadmaps = async () => {
  //     try {
  //       // Fetch all roadmaps from the server
  //       const response = await axios.get("https://careerguidance.runasp.net/api/Dashboard/GetALlRoadmapsInDatabase");
        
  //       // Assuming response.data is an array of roadmaps
  //       const parsedRoadmaps = response.data.map((roadmap) => {
  //         // Parse roadmapData if it's a JSON string
  //         if (typeof roadmap.roadmapData === "string") {
  //           try {
  //             roadmap.roadmapData = JSON.parse(roadmap.roadmapData);
  //           } catch (parseError) {
  //             console.error("Error parsing roadmap data:", parseError);
  //           }
  //         }
  //         return roadmap;
  //       });
  
  //       // Update the state with the parsed roadmaps
  //       setRoadmaps(parsedRoadmaps);
  //       console.log("Fetched and parsed roadmaps:", parsedRoadmaps);
        
  //     } catch (error) {
  //       console.error("Error fetching roadmaps:", error);
  //     }
  //   };
  
  //   fetchAllRoadmaps(); // Call the fetch function on component mount
  // }, []); // Empty dependency array ensures it only runs on mount
  

  const handleNodeClick = (id, roadmapData) => {
    navigate(`/details/${id}`, { state: roadmapData });
  };

  const handleCreateNewRoadmao = () => {
    navigate("/details");
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://careerguidance.runasp.net/api/Dashboard/Delete/${id}`)
      .then(() => {
        console.log("Roadmap deleted successfully.");

        // Update local state to remove the deleted node
        setRoadmaps((prevNodes) => prevNodes.filter((node) => node.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting roadmap:", error);
      });
  };

  return (
    <Box>
      <Typography
        component={"h2"}
        variant="h5"
        sx={{ my: 2, textAlign: "center" }}
      >
        All Roadmaps
      </Typography>
      <Stack spacing={2} alignItems={"center"}>
        {roadmaps.map((roadmap) => (
          <Paper
            key={roadmap.id}
            elevation={2}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              py: 1,
              px: 2,
            }}
          >
            <Typography sx={{ flexGrow: 1 }}>
              {roadmap.roadmapData.roadmapName}
            </Typography>

            <Tooltip title="Edit roadmap">
              <IconButton
                aria-label="delete"
                onClick={() => handleNodeClick(roadmap.id, roadmap.roadmapData)}
              >
                <EditRoadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete roadmap">
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(roadmap.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Stack>
      <Button
        variant="contained"
        sx={{ display: "block", m: "auto", mt: 4, mb: 2, textTransform: "capitalize", fontSize:"18px" }}
        onClick={handleCreateNewRoadmao}
      >
        Create new Roadmap
      </Button>
    </Box>
  );
};

export default AllRoadmaps;
