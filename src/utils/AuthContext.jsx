import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { fillUserDetails } from "./store/merchantSlice";
import axios from "axios";
import { getCookie } from "./cookieAuth";
import { getUser } from "../helpers/getUser";
export function AuthProvider({ children }) {
  const refreshToken = getCookie("refreshToken");
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const token = getCookie("authToken");

  useEffect(() => {
    setShowSpinner(true); // Show spinner initially
    async function fetchUserDetails() {
      if (!refreshToken) {
        setShowSpinner(false);
        setRedirectToLogin(true);
        return;
      }

      try {
        // const user =  await getUser(token);
        if (token) {
          setShowSpinner(false);
          // dispatch(fillUserDetails(user));
        } else {
          setRedirectToLogin(true);
        }
      } catch (error) {
        setRedirectToLogin(true);
      }
    }

    fetchUserDetails();
  }, []);

  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  if (showSpinner) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20vh" }}
      >
        <CircularProgress
          size="4.2rem"
          sx={{
            color: "#DC0019",
          }}
        />
      </Box>
    );
  }

  return <>{children}</>; // Proceed to render children if authenticated
}
