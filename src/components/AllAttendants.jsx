import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
// import avatar from "../assets/avatar.svg";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AllAttendantsProfile from "./AllAttendantsProfile";
import { useQuery } from "@tanstack/react-query";
import { AuthAxios } from "../helpers/axiosInstance";
const AllAttendants = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const fetchMerchantAttendents = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey;
    try {
      const response = await AuthAxios.get(
        `/merchant/attendant?page=${page}&limit=${limit}`
      );
      return response?.data?.data;
    } catch (error) {
      throw new Error("Failed to fetch attendents data");
    }
  };

  const {
    data: allAttendants,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["attendentsSData", { page: page, limit: rowsPerPage }],
    queryFn: fetchMerchantAttendents,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });
  console.log("datatatta", allAttendants);

  const handleShowProfile = (id) => {
    const attendantById = allAttendants?.records?.find(
      (item) => item?.id === id
    );

    setProfileData(attendantById);
    setShowProfile(true);
  };

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
          {isLoading ? (
            <CircularProgress size="1.2rem" sx={{ color: "#ff7f00" }} />
          ) : (
            <>
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
                  {allAttendants?.totalRecords}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "60%",
                }}
              >
                {allAttendants?.records?.map((item, index) => (
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
                        {item?.lastName} {item?.firstName}
                      </Typography>
                    </Box>

                    <Box onClick={() => handleShowProfile(item?.id)}>
                      <ArrowForwardIosRoundedIcon />
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AllAttendants;
