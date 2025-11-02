'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { FaHammer } from 'react-icons/fa';

interface LoadingProps {
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.44)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FaHammer
        style={{
          fontSize: "6rem",
          color: "#FFA500",
          animation: "hammerNail 2s infinite",
          filter: "drop-shadow(0 0 10px #000000ff)", 
        }}
      />
      <Typography
        variant="h4" 
        sx={{
          mt: 3,
          fontWeight: "bold",
          color: "#FFA500",
          textShadow: "0 0 10px #000000ff",
        }} 
      >
        {text}
      </Typography>

      <style>
        {`
          @keyframes hammerNail {
            0% { transform: rotate(-45deg) translate(0, 0); }
            20% { transform: rotate(0deg) translate(0, 5px); }   /* hits nail */
            80% { transform: rotate(-25deg) translate(0, 1px); } /* returns */
            100% { transform: rotate(-45deg) translate(0, 0); }  /* reset */
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
