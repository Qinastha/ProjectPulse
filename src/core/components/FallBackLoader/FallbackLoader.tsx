import "./FallbackLoader.scss";
import React from "react";

// FallbackLoader component with simple spinner animation
export const FallbackLoader: React.FC = () => (
  <div className="fallback">
    <div className="spinner"></div>
  </div>
);
