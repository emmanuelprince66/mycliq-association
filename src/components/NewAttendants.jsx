import React from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  Button,
  Modal,
  Grid,
  TextField,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthAxios } from "../helpers/axiosInstance";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import IconButton from "@mui/material/IconButton";
// import rightLogo from "../assets/images/admin/rig"
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useMutation } from "@tanstack/react-query";
// import wrongLogo from "../assets/wrongLogo.svg";

const NewAttendants = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (event) => {
    setSelectGender(event.target.value);
  };
  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 6000, // Time in milliseconds
    });
  };
  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 6000, // Time in milliseconds
    });
  };

  const createAttendantMutation = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      try {
        const response = await AuthAxios({
          url: "/merchant/attendant/create",
          method: "POST",
          data: formData,
        });

        return response.data;
      } catch (error) {
        consaole.log(error);
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      setButtonDisabled(false);
      notifySuccess(data?.message);
    },
    onError: (error) => {
      console.log(error);
      notifyError("Something went wrong, try again.");
      setButtonDisabled(false);
    },
  });

  const merchantData = localStorage.getItem("merchant");
  const stringifiedData = JSON.parse(merchantData);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const handleFormSubmit = (value) => {
    const payload = {
      ...value,
      outletId: stringifiedData?.id,
    };

    setButtonDisabled(true);
    createAttendantMutation.mutate(payload);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: "1rem",
      }}
    >
      <Typography
        sx={{
          fomtWeight: "500",
          fontSize: "20px",
          color: "#1E1E1E",
          lineHeight: "30px",
          mb: "1rem",
        }}
      >
        Register a New Attendant.
      </Typography>
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#828282",
          mb: "1rem",
          lineHeight: "22.4px",
        }}
      >
        Fill in the required information to register a new attendant.
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          pl: "6rem",
        }}
      >
        <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                First Name
              </Typography>
              <TextField
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter first name"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D1D1D1", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Middle Name
              </Typography>
              <TextField
                {...register("middleName", {
                  required: "Middle name is required",
                })}
                placeholder="Enter middle name "
                error={Boolean(errors.middleName)}
                helperText={errors.middleName?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D1D1D1", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Last Name
              </Typography>
              <TextField
                {...register("lastName", {
                  required: "Last name is required",
                })}
                placeholder="Enter last name "
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D1D1D1", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Email
              </Typography>
              <TextField
                {...register("email", {
                  required: "Email  is required",
                })}
                placeholder="example@domain.com"
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#D1D1D1", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Phone Number
              </Typography>
              <TextField
                {...register("phone", {
                  required: "Phone is required",
                })}
                error={Boolean(errors?.phone)}
                helperText={errors?.phone?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#dc0019", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                placeholder="e.g 0812345678"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneOutlinedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Address
              </Typography>
              <TextField
                {...register("address", {
                  required: "Address is required",
                })}
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#dc0019", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                placeholder="Enter Address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddRoundedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography
                sx={{ color: "#344054", fontSize: "14px", my: "5px" }}
              >
                Location
              </Typography>
              <TextField
                {...register("location", {
                  required: "Location is required",
                })}
                error={Boolean(errors?.location)}
                helperText={errors?.location?.message}
                sx={{
                  width: "100%",
                  color: "#D1D1D1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#dc0019", // Set the desired border color here
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#dc0019", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#dc0019", // Set the border color on focus here
                    },
                  },
                }}
                placeholder="Enter Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddRoundedIcon />
                      &nbsp;|
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={9}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled={buttonDisabled}
                  type="submit"
                  sx={{
                    background: "#dc0019",
                    width: "95%",
                    padding: "10px",
                    borderRadius: "8px",

                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#dc0019",
                    },
                  }}
                >
                  {buttonDisabled ? (
                    <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                  ) : (
                    <>
                      <AddRoundedIcon sx={{ pb: "2px" }} />
                      Register New Attendant
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default NewAttendants;
