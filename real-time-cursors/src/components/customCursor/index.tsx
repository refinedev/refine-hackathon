import React from "react";
import { motion } from "framer-motion";

type CustomCursorPropsType = {
  username: string;
  x: number;
  y: number;
};

const COLORS = [
  "#FF3366",
  "#FFBB00",
  "#0088FF",
  "#22DD88",
  "#FF8800",
  "#FF0099",
  "#AA44FF",
];

export const CustomCursor: React.FC<CustomCursorPropsType> = ({
  username,
  x,
  y,
}) => {
  const getColor = (username: string) => {
    const index = (username?.charCodeAt(0) || 0) % COLORS.length;
    return COLORS[index];
  };

  return (
    <motion.div
      animate={{ x, y }}
      transition={{ type: "tween" }}
      style={{
        zIndex: 999,
        position: "absolute",
      }}
    >
      <svg
        style={{ position: "absolute", top: -10, left: -10 }}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={getColor(username)}
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
      </svg>
      <div
        style={{
          backgroundColor: getColor(username),
          color: "white",
          padding: "2px 6px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {username}
      </div>
    </motion.div>
  );
};
