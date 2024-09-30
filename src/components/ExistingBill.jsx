import React, { useState, useEffect } from "react";
import colorContact from "../assets/colorContact.svg";
import Badge from "@mui/material/Badge";
import { Box, Typography, responsiveFontSizes } from "@mui/material";
import { Switch } from "@mui/material";
import { AuthAxios } from "../helpers/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fillBills } from "../utils/store/merchantSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const ExistingBill = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [checkedSuccess, setCheckedSuccess] = useState(false);
  const { userDetails, bills } = useSelector((state) => state);
  const rowsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchExistingData = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey;
    try {
      const response = await AuthAxios.get(
        `/merchant/bill/association?page=${page}&limit=${limit}&type=user`
      );
      return response?.data?.data;
    } catch (error) {
      throw new Error("Failed to fetch customer data");
    }
  };

  const {
    data: ExistingBills,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["AllExistingBills", { page: currentPage, limit: rowsPerPage }],
    queryFn: fetchExistingData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  const totalPages = ExistingBills?.totalPages || "";

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  function modExpiryDate(value) {
    // Check if the value is defined and is a string
    if (!value || typeof value !== "string") {
      // Return an empty string or any fallback if the value is invalid
      return "";
    }

    // Split the string and reverse the date components
    const res = value.split("-");
    const newDate = res.reverse().join("-");
    return newDate;
  }

  function checkIfLive(value) {
    let date = new Date(value);
    const currentDate = new Date();
    if (date > currentDate) {
      return "live";
    } else {
      return null;
    }
  }
  async function checkBill(e, i) {
    const disabledStatus = bills[i].isDisabled ? false : true;

    try {
      const response = await AuthAxios.patch(
        `/association-bill/${bills[i].id}`,
        { isDisabled: disabledStatus }
      );
      setCheckedSuccess(!checkedSuccess);
      console.log(response);
      if (response.status === 200) {
        setLoading(true);
        fetchBills();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "1rem",
        minHeight: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            color: "#1E1E1E",
            lineHeight: "30px",
          }}
        >
          Manage Existing Bills
        </Typography>

        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "12px",
            width: "24px",
            padding: "2px 8px 2px 8px",
            borderRadius: "8px",
            background: "#FFEFD6",
            height: "22px",
          }}
        >
          {ExistingBills?.totalRecords}
        </Typography>
      </Box>
      {isLoading ? (
        <CircularProgress
          size="5.2rem"
          sx={{ color: "#DC0019", marginLeft: "50%", marginTop: "5em" }}
        />
      ) : ExistingBills?.records?.length > 0 ? (
        ExistingBills?.records?.map((item, i) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                borderBottom: "1px solid #E0E0E0",
                pb: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  mt: "2rem",
                }}
              >
                <Box
                  sx={{
                    pb: "4px",
                  }}
                >
                  <img src={colorContact} alt="c-contact" />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "start",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.billName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        padding: "2px 8px 2px 8px",
                        background:
                          checkIfLive(item.expiryDate) === "live"
                            ? "#EBFFF3"
                            : "",
                        borderRadius: "8px",
                      }}
                    >
                      {checkIfLive(item.expiryDate)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "3px",
                    }}
                  >
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      Created {modDate(item.createdAt)} |
                    </Typography>
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      Expires {modExpiryDate(item.expiryDate)} |
                    </Typography>
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      1,090 Paid, 789 Verified
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#1E1E1E",
                  }}
                >
                  Stop Accepting Payments
                </Typography>

                <Box
                  sx={{
                    mb: "0.5rem",
                  }}
                >
                  <Switch
                    checked={item.isDisabled}
                    onChange={(e) => checkBill(e, i)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DC0019",
                          opacity: 1, // Customize track background color when checked
                        },
                      "& .MuiSwitch-switchBase.Mui-focusVisible .MuiSwitch-thumb":
                        {
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
          );
        })
      ) : (
        <Typography sx={{ paddingBlock: "1em" }} fontWeight={600}>
          {" "}
          No Bills yet!. Create a bill to see one.{" "}
        </Typography>
      )}{" "}
    </Box>
  );
};

export default ExistingBill;
