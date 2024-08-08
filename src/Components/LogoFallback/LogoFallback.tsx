import "./LogoFallback.scss";
import React from "react";

export const LogoFallback: React.FC = () => {
  return (
    <div className="logo-fallback">
      <div className="logo-fallback__customSpinner"></div>
      <h1 className="logo-fallback__title">Loading...</h1>
    </div>
  );
};
