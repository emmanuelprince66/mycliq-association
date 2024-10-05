import React, { useState } from "react";
import { Box, Typography, Button, Modal, Grid } from "@mui/material";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useQuery } from "@tanstack/react-query";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
// import bigAvatar from "../assets/bigAvatar.svg";
// import switchLogo from "../assets/switchLogo.svg";
import { Switch } from "@mui/material";
import { AuthAxios } from "../helpers/axiosInstance";
const AllAttendantsProfile = ({ setShowProfile, profileData }) => {
  const [delId, setDelId] = useState("");
  function modDate(value) {
    const date = new Date(value);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const period = hrs >= 12 ? "pm" : "am";
    const formattedHours = hrs % 12 || 12;

    return `${day} - ${month} - ${year} at ${formattedHours}:${mins} ${period}`;
  }

  const handleSwitchChange = (event, id) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      disableAttendantMutation.mutate({ id });
    }
  };

  const disableAttendantMutation = useMutation({
    mutationFn: async (payload) => {
      try {
        // Convert the id to a string
        const response = await AuthAxios({
          url: `/merchant/attendant/${String(payload?.id)}`,
          method: "delete",
        });

        return response.data;
      } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      notifySuccess(data?.message);
    },
    onError: (error) => {
      console.log(error);
      notifyError("Something went wrong, try again.");
      setButtonDisabled(false);
    },
  });

  return (
    <Box
      sx={{
        px: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginLeft: "auto",
          width: "100%",
          gap: "1em",
          alignItems: "center",
          mb: "1rem",
        }}
      >
        <Box className="flex justify-between w-full items-center cursor-pointer">
          <Box className="flex gap-2 items-center">
            <Typography
              onClick={() => setShowProfile((prev) => !prev)}
              sx={{
                fontWeight: "500",
                fontSize: "13px",
                color: "#dc0019",
              }}
            >
              <KeyboardBackspaceRoundedIcon sx={{ mr: "4px" }} /> Go Back &nbsp;
            </Typography>

            <Box
              sx={{
                fontWeight: "500",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              | &nbsp;
              <AccountBoxRoundedIcon sx={{ fontSize: "13px" }} /> All Attendants
              <ArrowForwardIosRoundedIcon
                sx={{
                  fontSize: "13px",
                }}
              />
            </Box>

            <Box className="flex items-center gap-2 p-2 rounded cursor-pointer">
              <AccountBoxRoundedIcon
                sx={{
                  color: "#dc0019",
                  fontSize: "13px",
                }}
              />

              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "13px",
                  pt: "2px",
                  color: "#dc0019",
                }}
              >
                {profileData?.lastName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "40%",
          flexDirection: "column",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontWeight: "500",
            mt: "0.4rem",
            fontSize: "14px",
            mb: "2rem",
          }}
        >
          Attendant Profile
        </Typography>
        <Box
          sx={{
            width: "100%",
          }}
        >
          {/* <img src={bigAvatar} className="av-img" alt="a-v" /> */}
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <PersonOutlineRoundedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Surname
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.lastName}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <PersonOutlineRoundedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                First Name
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.firstName}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <TransgenderRoundedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Gender
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.gender}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <EmailOutlinedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Email
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <LocalPhoneOutlinedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Phone Num
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.phoneNumber}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <LocalPhoneOutlinedIcon sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Alt Phone Num
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {profileData?.altPhoneNumber}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              <CalendarMonthOutlined sx={{ fontSize: "18px" }} />
              <Typography
                sx={{ color: "#828282", fontSize: "14px", my: "5px" }}
              >
                Date Registered
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ color: "#000", fontSize: "14px", my: "5px" }}>
                {modDate(profileData?.createdAt)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                minWidth: "200px",
              }}
            >
              {/* <img src={switchLogo} alt="s-w" /> */}
              <Typography
                sx={{ color: "#dc0019", fontSize: "14px", my: "5px" }}
              >
                Disable Account
              </Typography>
            </Box>

            <Box
              sx={{
                pb: "1rem",
              }}
            >
              <Switch
                checked={false} // Bind to item state (adjust according to your data)
                onChange={(event) => handleSwitchChange(event, profileData?.id)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DC0019",
                    opacity: 1, // Customize track background color when checked
                  },
                  "& .MuiSwitch-switchBase.Mui-focusVisible .MuiSwitch-thumb": {
                    color: "#52d869", // Customize thumb color when focused
                    border: "6px solid #fff",
                  },
                  "& .MuiSwitch-switchBase": {
                    padding: "1px",

                    color: "#fff",
                    "&.Mui-checked": {
                      transform: "translateX(15px)",
                      color: "#fff",
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    width: "20px",
                    height: "20px",
                    marginTop: "0.8rem",
                    marginLeft: "0.8rem",
                    backgroundColor: "#f0f0f0", // Customize thumb background color
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 26 / 2,
                    border: "1px solid #ccc",

                    height: "1.5rem",
                    backgroundColor: "#f8f8f8", // Customize track background color
                    opacity: 1,
                    transition:
                      "background-color 0.4s ease-in-out, border 0.4s ease-in-out",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllAttendantsProfile;
