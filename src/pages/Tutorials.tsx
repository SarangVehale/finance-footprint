
import React from "react";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

/**
 * Tutorials Page - Redirects to the tutorials modal in settings
 * 
 * This is a redirector component that sends users to the settings page
 * with the tutorials modal open.
 */
const Tutorials: React.FC = () => {
  const navigate = useNavigate();
  
  // Immediately redirect to settings with tutorials modal open
  React.useEffect(() => {
    navigate("/settings", { state: { openModal: "tutorials" } });
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

export default Tutorials;
