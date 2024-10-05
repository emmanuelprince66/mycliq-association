import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Box, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Button } from "@mui/material";
import { getCookie } from "../utils/cookieAuth";
import { AuthAxios, BaseAxios } from "../helpers/axiosInstance";
import { queryClient } from "../helpers/queryClient";
import passwordLogo from "../assets/passwordLogo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const ResetPassword = () => {
  const { userDetails } = useSelector((state) => state);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [textOne, setTextOne] = useState(false);
  const [textTwo, setTextTwo] = useState(false);
  const [textThree, setTextThree] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const weakPassword = new RegExp("(?=.{3,})");
  const weakPasswordIcon = new RegExp("(?=.{7,})");
  const mediumPassword = new RegExp("(?=.*[A-Z])");
  const strongPassword = new RegExp("(?=.*[^A-Za-z0-9])");

  const navigate = useNavigate();
  const handleClose = () => {
    setOpenSuccessModal(false);
  };
  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;

    setConfirmPasswordInput(value);
    if (newPasswordInput === value) {
      setConfirmError("");
      setTextThree(false);
      console.log("bey");
    } else {
      setConfirmError("Password do not match");
      setTextThree(true);
      console.log("hey");
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleCurrentPasswordChange = (event) => {
    const value = event.target.value;
    setCurrentPasswordInput(value);

    if (!value) {
      setPasswordError("Please enter your password");
      setTextOne(true);
    } else {
      setPasswordError("");
      setTextOne(false);
    }
  };
  const handleNewPasswordChange = (event) => {
    const value = event.target.value;
    setNewPasswordInput(value);

    if (!value) {
      setPasswordError2("Please enter your password");
      setTextTwo(true);
    } else {
      if (weakPasswordIcon.test(newPasswordInput)) {
        //   meduim password

        if (mediumPassword.test(value)) {
          if (strongPassword.test(value || newPasswordInput)) {
            setTextTwo(false);
            setPasswordError2("");
          } else {
            setPasswordError2("Must contain atleast one special character");
            setTextTwo(true);
          }
        } else {
          setPasswordError2("Must contain atleast one capital letter");
          setTextTwo(true);
        }
        ///  meduim password ends
      } else {
        setPasswordError2("Minimum of 8 characters");
        setTextTwo(true);
      }
    }
  };
  const handleCurrentPasswordBlur = () => {
    if (!currentPasswordInput) {
      setPasswordError("Please enter your password");
      setTextOne(true);
    } else {
      setPasswordError("");
      setTextOne(false);
    }
  };
  const handleNewPasswordBlur = () => {
    if (!newPasswordInput) {
      setPasswordError2("Please enter your password");
      setTextTwo(true);
    } else {
      setPasswordError2("");
      setTextTwo(false);
    }
  };
  const handleConfirmPasswordBlur = () => {};

  // reset password
  const mutationReset = useMutation({
    mutationFn: async (payload) => {
      try {
        const response = await AuthAxios({
          url: "/account/change-password",
          method: "POST",
          data: payload,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        setCurrentPasswordInput("");
        setConfirmPasswordInput("");
        setNewPasswordInput("");

        const err = error.response
          ? Array.isArray(error.response.data.message)
            ? "Invalid Password"
            : error.response.data.message
          : error.message;
        setDisableButton(false);
        notifyErr(err);
        throw new Error(error.response);
      }
    },
    onSuccess: (data) => {
      notify(data.message);
      setDisableButton(false);
      setOpenSuccessModal(true);

      setCurrentPasswordInput("");
      setConfirmPasswordInput("");
      setNewPasswordInput("");

      setTimeout(() => {
        navigate("/");
      }, [2000]);
      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      console.log(error);
      setButtonDisabled(false);
      //   notifyError(String(error));
    },
  });
  //   const sendResetPasswordToEndpoint = async () => {
  //     const token = getCookie("authToken");
  //     try {
  //       const response = await axios.patch(
  //         "https://check-server-api-staging.herokuapp.com/api/v1/auth/password-change",
  //         {
  //           currentPassword: currentPasswordInput,
  //           newPassword: newPasswordInput,
  //           confirmPassword: confirmPasswordInput,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       return response.data;
  //     } catch (error) {
  //       console.log(error);
  //       setCurrentPasswordInput("");
  //       setConfirmPasswordInput("");
  //       setNewPasswordInput("");

  //       const err = error.response
  //         ? Array.isArray(error.response.data.message)
  //           ? "Invalid Password"
  //           : error.response.data.message
  //         : error.message;
  //       setDisableButton(false);
  //       notifyErr(err);
  //       throw new Error(error.response);
  //     }
  //   };
  //   const mutationReset = useMutation(sendResetPasswordToEndpoint, {
  //     onSuccess: (response) => {
  //       setDisableButton(false);
  //       setOpenSuccessModal(true);
  //       setCurrentPasswordInput("");
  //       setConfirmPasswordInput("");
  //       setNewPasswordInput("");

  //       setTimeout(() => {
  //         navigate("/");
  //       }, [2000]);
  //     },
  //     onError: (response) => {
  //       setCurrentPasswordInput("");
  //       setConfirmPasswordInput("");
  //       setNewPasswordInput("");
  //       setDisableButton(false);

  //       // notifyErr(response.message);
  //     },
  //   });
  const handleResetPassword = () => {
    setDisableButton(true);

    if (!newPasswordInput || !currentPasswordInput || !confirmPasswordInput) {
      notifyErr("Please fill in all fields");
      setDisableButton(false);
      return;
    }
    if (newPasswordInput === confirmPasswordInput) {
      const payload = {
        currentPassword: currentPasswordInput,
        newPassword: newPasswordInput,
      };

      mutationReset.mutate(payload);
    } else {
      notifyErr("Password do not match");
      setDisableButton(false);
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
        height: "100%",
        width: "100%",
        mx: "auto",
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
            my: "2rem",
          }}
        >
          Verify your current password and enter new password
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form action="">
            <div>
              <FormControl
                sx={{ width: "100%", marginBottom: "1rem", mx: "auto" }}
              >
                <TextField
                  sx={{
                    width: "500px",
                    mx: "auto",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: `${textOne ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                      },
                      "&:hover fieldset": {
                        borderColor: `${textOne ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: `${textOne ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                      },
                    },
                  }}
                  required
                  onChange={handleCurrentPasswordChange}
                  value={currentPasswordInput}
                  onBlur={handleCurrentPasswordBlur}
                  helperText={
                    passwordError && <Box color="#DC0019">{passwordError}</Box>
                  }
                  placeholder="Current Password"
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={passwordLogo} alt="password-logo" />{" "}
                        &nbsp;&nbsp;
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ width: "100%", marginBottom: "1rem", mx: "auto" }}
              >
                <TextField
                  sx={{
                    width: "500px",
                    mx: "auto",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: `${textTwo ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                      },
                      "&:hover fieldset": {
                        borderColor: `${textTwo ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: `${textTwo ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                      },
                    },
                  }}
                  required
                  onChange={handleNewPasswordChange}
                  onBlur={handleNewPasswordBlur}
                  value={newPasswordInput}
                  helperText={
                    passwordError2 && (
                      <Box color="#DC0019">{passwordError2}</Box>
                    )
                  }
                  placeholder="New Password"
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={passwordLogo} alt="password-logo" />{" "}
                        &nbsp;&nbsp;
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ width: "100%", marginBottom: "0.5rem", mx: "auto" }}
              >
                <TextField
                  sx={{
                    width: "500px",
                    mx: "auto",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: `${textThree ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
                      },
                      "&:hover fieldset": {
                        borderColor: `${textThree ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: `${textThree ? "#DC0019 " : "#C57600"}`, // Set the border color on focus here
                      },
                    },
                  }}
                  required
                  name="password"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPasswordInput}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder="Verify New Password"
                  id="password-input"
                  helperText={
                    confirmError && <Box color="#DC0019">{confirmError}</Box>
                  }
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <img src={passwordLogo} alt="password-logo" />{" "}
                        &nbsp;&nbsp;
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              <Box
                sx={{
                  minWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: "1rem",
                }}
              >
                <Button
                  onClick={handleResetPassword}
                  disabled={disableButton || mutationReset.isLoading}
                  sx={{
                    width: "100%",
                    textTransform: "capitalize",
                    fontWeight: "1000",
                    background: "#dc0019",
                    padding: "10px",
                    borderRadius: "8px",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#dc0019",
                    },
                  }}
                >
                  {mutationReset.isLoading || disableButton ? (
                    <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </Box>
            </div>
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ResetPassword;
