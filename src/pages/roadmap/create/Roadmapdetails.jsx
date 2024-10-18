import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Stack,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEdgesState, useNodesState } from "@xyflow/react";
import { RoadmapContext } from "./RoadmapContext";

export default function RoadmapDetails() {
  const {
    roadmapCategory, // Access the category from context
    setRoadmapCategory, // Access the category setter from context
    roadmapName,
    setRoadmapName,
    roadmapDescription,
    setRoadmapDescription,
    imageUrl,
    setImageUrl,
  } = useContext(RoadmapContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // function to update a roadmap
  const updateRoadmap = async () => {
    try {
      const parsedRoadmap = JSON.stringify({
        roadmapCategory, // Include the category in the update
        roadmapName,
        roadmapDescription,
        imageUrl,
        nodes,
        edges,
      });

      await axios.put(
        `https://careerguidance.runasp.net/api/Dashboard/Update/${id}`,
        {
          roadmapData: parsedRoadmap,
        }
      );

      console.log("Roadmap updated successfully.");
    } catch (error) {
      console.error("Error updating roadmap:", error);
    }
  };

  const handleContinueClick = async () => {
    await updateRoadmap();
    navigate(`/create/${id}`);
  };

  useEffect(() => {
    setRoadmapCategory("");
    setRoadmapName("");
    setRoadmapDescription("");
    setImageUrl("");
    if (location.state) {
      const {
        roadmapCategory,
        roadmapName,
        roadmapDescription,
        imageUrl,
        nodes,
        edges,
      } = location.state;
      setRoadmapCategory(roadmapCategory || ""); // Default category
      setRoadmapName(roadmapName || "");
      setRoadmapDescription(roadmapDescription || "");
      setImageUrl(imageUrl || "");
      setNodes(nodes || []);
      setEdges(edges || []);
    }
  }, [
    location.state,
    setRoadmapCategory,
    setRoadmapName,
    setRoadmapDescription,
    setImageUrl,
    setNodes,
    setEdges,
  ]);

  const isCreatePath = location.pathname === "/details";
  const isUpdatePath = location.pathname.startsWith("/details/");

  return (
    <Box sx={{ width: "80%", m: "auto", mt: 3 }}>
      <Stack direction={"column"} alignItems={"center"}>
        <FormControl sx={{ my: 2 }}>
          {/* Category Select */}
          <label className= "roadmapCategory">Roadmap Category</label>
          <br />
          <Select
            labelId="roadmap-category-label"
            value={roadmapCategory}
            onChange={(e) => setRoadmapCategory(e.target.value)}
            sx={{ backgroundColor: "#D9D9D9", borderRadius: "10px" }}
          >
            <MenuItem value="Web Development">Web Development</MenuItem>
            <MenuItem value="Network">Network</MenuItem>
          </Select>
          <br />

          {/* Roadmap Title */}
          <Box>
            <label className="roadmapTitle">Roadmap Title</label>
            <br />
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={roadmapName}
              onChange={(e) => setRoadmapName(e.target.value)}
              sx={{
                mt: 2,
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 45px transparent inset",
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "inherit",
                  transition: "background-color 5000s ease-in-out 0s",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Box>

          {/* Roadmap Description */}
          <Box sx={{ my: 3 }}>
            <label className="roadmapDescription">Roadmap Description</label>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              multiline
              value={roadmapDescription}
              onChange={(e) => setRoadmapDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>

          {/* Image URL */}
          <Box>
            <label className="roadmapImageUrl">Image URL</label>
            <br />
            <TextField
              id="outlined-image-url"
              variant="outlined"
              placeholder="Paste image URL here"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              sx={{
                my: 2,
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 45px transparent inset",
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "inherit",
                  transition: "background-color 5000s ease-in-out 0s",
                },
                "& input:-webkit-autofill:focus": {
                  WebkitBoxShadow: "0 0 0 1000px transparent inset",
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Box>

          {/* Image Preview */}
          {imageUrl && (
            <Box sx={{}}>
              <img
                src={imageUrl}
                alt="Preview"
                width="200"
                style={{ display: "block", margin: "auto" }}
              />
            </Box>
          )}

          {/* Buttons */}
          {isCreatePath && (
            <Button
              variant="contained"
              onClick={() => navigate("/create")}
              sx={{ width: "200px", display: "block", m: "auto", my: 2 }}
            >
              Create
            </Button>
          )}
          {isUpdatePath && (
            <Button
              onClick={handleContinueClick}
              variant="contained"
              sx={{ my: 2, cursor: "pointer" }}
            >
              Continue
            </Button>
          )}
        </FormControl>
      </Stack>
    </Box>
  );
}
