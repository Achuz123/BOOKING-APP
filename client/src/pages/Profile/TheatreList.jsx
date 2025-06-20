import React, { useState } from "react";
import { Button } from "antd";
import "./TheatreList.css";
import TheatreFormModal from "./theatreForm";

function TheatreList() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end mx-0.7 ">
        <Button
          onClick={() => {
            setIsModelOpen(true);
          }}
          className="my-button"
        >
          Add Theatre
        </Button>
        {isModelOpen && (
          <TheatreFormModal
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
          />
        )}
      </div>
    </>
  );
}

export default TheatreList;
