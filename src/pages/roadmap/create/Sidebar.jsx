import React from "react";
import { useDnD } from "./DnDContext";

export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // because of the onDragStart being triggered for the entire <aside> the text dragged with me 
  // add this function preventDrag to prevent dragging
  const preventDrag = (event) => {
    event.preventDefault(); // Prevent text drag
  };


  return (
    <aside>
      <div className="description" onDragStart={preventDrag}>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>

      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>

      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>


      
    </aside>
  );
}
