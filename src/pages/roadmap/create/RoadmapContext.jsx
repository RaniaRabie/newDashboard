import React, { createContext, useState } from "react";

// @ts-ignore
export const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  const [roadmapCategory, setRoadmapCategory] = useState(""); 
  const [roadmapName, setRoadmapName] = useState("");
  const [roadmapDescription, setRoadmapDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <RoadmapContext.Provider
      value={{
        roadmapCategory, // Added category to context
        setRoadmapCategory, // Added category setter to context
        roadmapName,
        setRoadmapName,
        roadmapDescription,
        setRoadmapDescription,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};
