import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Box, Modal, Backdrop } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Button } from "@mui/material";
import line from "../assets/line.svg";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import closeIcon from "../assets/images/closeIcon.svg";
import VerifyForgotPassword from "../components/VerifyForgotPassword";

const ForgetPassword = () => {
  const [textFour, setTextFour] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {};

  const mutationOTP = useMutation({
    mutationFn: async (phone) => {
      console.log(phoneNo);
      try {
          const response = await BaseAxios({
            url: "/auth/password-reset",
            method: "POST",
            phone: phone,
          });
        return response.data;
      } catch (error) {
        console.log(error);
        setDisableButton(false);
        notifyErr(error.response.data.message);
        throw new Error(error.response);
      }
    },
    onSuccess: (response) => {
      notify(response.message);
      setVerifyOTP(true);
      setDisableButton(false);
      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      console.log(error);
      setButtonDisabled(false);
      //   notifyError(String(error));
    },
  });

  const handleGetOTP = () => {
    setDisableButton(true);
    if (phoneNo && phoneNo.length === 11) {
      mutationOTP.mutate(phoneNo);
    } else if (phoneNo.length < 11) {
      notifyErr("Phone number is too short");
      setDisableButton(false);
    } else if (phoneNo.length > 11) {
      notifyErr("Phone number is too long");
      setDisableButton(false);
    }
  };

  const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError("Please enter your phone number");
      setTextFour(true);
    }
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    if (!value) {
      setPhoneNoError("Please enter your phone number");
      setTextFour(true);
    } else if (!/^\d+$/.test(value)) {
      setTextFour(true);
      setPhoneNoError("Invalid phone number");
    } else {
      setTextFour(false);
      setPhoneNoError("");
    }
  };

  const notifyErr = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <Box
      sx={{
        maxWidth: "31%",
        mx: "auto",
        marginTop: "1rem",
        maxWidth: { xs: "100%", sm: "100%", md: "31%" },
      }}
    >
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: " 5rem ",
          marginBottom: "2rem",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Enter your registered phone number to reset your password
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        {" "}
        <TextField
          sx={{
            mx: "auto",
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#CACACA", // Set the desired border color here
              },
              "&:hover fieldset": {
                borderColor: "#CACACA", // Set the border color on hover here
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF7F00", // Set the border color on focus here
              },
            },
          }}
          onChange={handlePhoneNoChange}
          onBlur={handlePhoneNoBlur}
          value={phoneNo}
          type="number"
          required
          helperText={
            phoneNoError && <Box sx={{ color: "#DC0019" }}>{phoneNoError}</Box>
          }
          placeholder="Phone Number"
          variant="outlined"
          id="phone-number"
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <LocalPhoneRoundedIcon />
                &nbsp;&nbsp; +234&nbsp;&nbsp;
                <img src={line} alt="line" />
                &nbsp;&nbsp;
              </InputAdornment>
            ),
          }}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
            maxLength: "10",
          }}
        />
        <Button
          disabled={disableButton || mutationOTP.isLoading}
          onClick={handleGetOTP}
          sx={{
            background: "#333333",
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#333333",
            },
            textTransform: "capitalize",
            fontWeight: "500",
          }}
        >
          {mutationOTP.isLoading || disableButton ? (
            <CircularProgress size="1.2rem" sx={{ color: "white" }} />
          ) : (
            "Forgot Password"
          )}
        </Button>
        <Box onClick={() => navigate("/")}>
          <Typography
            sx={{
              color: "#000",
            }}
          >
            Back to login
          </Typography>
        </Box>
      </Box>

      {/* verify otp page */}
      <Modal
        open={verifyOTP}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          invisible: true,
          onClick: handleClose,
        }}
        disableBackdropClick
        PaperProps={{
          sx: {
            border: "none", // Remove the border
            boxShadow: "none", // Remove the box shadow
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "12px",
            width: "745px",
            bgcolor: "background.paper",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: "2rem",
            }}
          >
            <Box onClick={() => setVerifyOTP(false)} className="cursor-pointer">
              <img src={closeIcon} alt="c-icon" />
            </Box>
          </Box>

          <VerifyForgotPassword phoneNo={phoneNo} />
        </Box>
      </Modal>
      {/* verify otp page ends */}
      <ToastContainer />
    </Box>
  );
};

export default ForgetPassword;
