import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
// import avatar from "../assets/avatar.svg";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AllAttendantsProfile from "./AllAttendantsProfile";
const AllAttendants = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({});

  const handleShowProfile = (index) => {
    const dat = data[index];
    setProfileData(dat);
    setShowProfile(true);
  };
  const data = [
    {
      id: 1,
      nm: "Diannee Russel",
      img: "",
    },
    {
      id: 2,
      nm: "James Russel",
      img: "",
    },
    {
      id: 3,
      nm: "Elena Russel",
      img: "",
    },
    {
      id: 4,
      nm: "Jack Russel",
      img: "",
    },
    {
      id: 5,
      nm: "Esther Russel",
      img: "",
    },
    {
      id: 6,
      nm: "Diannee Russel",
      img: "",
    },
    {
      id: 7,
      nm: "Jen Russel",
      img: "",
    },
    {
      id: 8,
      nm: "Diannee Russel",
      img: "",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        p: "1rem",
      }}
    >
      {showProfile ? (
        <AllAttendantsProfile
          profileData={profileData}
          setShowProfile={setShowProfile}
        />
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              my: "1rem",
            }}
          >
            <Typography
              sx={{
                fomtWeight: "500",
                fontSize: "20px",
                color: "#1E1E1E",
              }}
            >
              All Attendants
            </Typography>
            <Typography
              sx={{
                fomtWeight: "500",
                fontSize: "20px",
                color: "#C57600",
                background: "#FFEFD6",
                px: "6px",
                borderRadius: "20px",
              }}
            >
              8
            </Typography>
          </Box>

          <Box
            sx={{
              width: "60%",
            }}
          >
            {data?.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: "1.3rem",
                  cursor: "pointer",
                }}
                key={item.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span>{index + 1}</span>
                  {/* <img src={avatar} alt="a-img" /> */}
                  <Typography
                    sx={{
                      fomtWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    {item.nm}
                  </Typography>
                </Box>

                <Box onClick={() => handleShowProfile(index)}>
                  <ArrowForwardIosRoundedIcon />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllAttendants;
