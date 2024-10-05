import React from "react";
import { useState, useEffect } from "react";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

import {
  Table,
  Box,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TextField,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  Typography,
  Modal,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import search from "../../src/assets/search.svg";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useQuery } from "@tanstack/react-query";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import selectIcon from "../assets/selectIcon.svg";
import downIcon from "../assets/images/arrowDown.svg";
import download from "../assets/images/download.svg";
import twoArrow from "../assets/twoArrow.svg";
import checkBlur from "../assets/checkBlur.svg";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import closeIcon from "../assets/images/closeIcon.svg";
import fdown from "../assets/fdown.svg";
import fup from "../assets/fup.svg";
import { useSelector } from "react-redux";
import fbook from "../assets/fbook.svg";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  saveTransactionData,
  fillUserDetails,
} from "../utils/store/merchantSlice";
import { useNavigate } from "react-router-dom";
import { AuthAxios } from "../helpers/axiosInstance";
import { TransactionDetails } from "./transactionDetails";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { TransactionDetailsStudents } from "./TransactionDetailsStudents";

const TableStudents = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [data, setData] = useState({});
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [paidDataState, setPaidDataState] = useState(null);
  const [verifiedDataState, setVerifiedDataState] = useState(null);

  const [status, setStatus] = useState(null);

  const { transactionDetails } = useSelector((state) => state);
  const { selectedDates } = useSelector((state) => state);

  // Update local state when Redux state changes

  const handleClose = () => {
    setOpenFilterModal(false);
    setShowStalites(false);
  };
  const dispatch = useDispatch();

  const handleClose1 = () => setOpen1(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaid, setShowPaid] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [details, setDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [studentByI, setStudentByI] = useState(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showStalites, setShowStalites] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSortByStatus = (status) => {
    setShowPaid(status);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchTrxData = async ({ queryKey }) => {
    const [_key, { page, limit, status }] = queryKey;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    if (status) {
      params.append("status", status);
    }

    try {
      const response = await AuthAxios.get(
        `/merchant/bill/association/tickets?${params.toString()}`
      );
      return response?.data?.data;
    } catch (error) {
      throw new Error("Failed to fetch customer data");
    }
  };

  const {
    data: trxData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "trxData",
      { page: currentPage, limit: rowsPerPage, status: showPaid },
    ],
    queryFn: fetchTrxData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  useEffect(() => {}, [trxData]);

  console.log("trx", trxData);

  const viewDetails = (id) => {
    const studentById = trxData?.records?.find((item) => item?.id === id);
    setStudentByI(studentById);
    setOpen1(true);
  };
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: "1rem",
        backgroundColor: "#fffcfc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      ></Box>

      <Box
        sx={{
          width: "100%",
          margin: "auto",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        {/* details box here  */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: "1.5rem",
          }}
        >
          {/* tt */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
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
              Transactions
            </Typography>
            <Typography
              sx={{
                fomtWeight: "600",
                fontSize: "12px",
                color: "#A86500",
                lineHeight: "18px",
                padding: "2px 8px 2px 8px",
                borderRadius: "8px",
                background: "#FFEFD6",
              }}
            >
              {!trxData || isLoading ? (
                <CircularProgress size="1.2rem" sx={{ color: "white" }} />
              ) : (
                trxData?.totalRecords
              )}
            </Typography>
          </Box>
          {/* tt end */}

          {/* search  */}
          <Box>
            <TextField
              sx={{
                borderRadius: "10px",
                width: "440px",
                // padding: { xs: "4px", sm: "12px 16px", md: " 12px 16px" },
                color: "#D1D1D1",
                "& .MuiOutlinedInput-root": {
                  padding: "8px", // Adjust padding to reduce height
                  height: "36px", // Set the desired height here
                  lineHeight: "36px", // Match the height to avoid overflow
                  "& fieldset": {
                    borderColor: "#D1D1D1", // Set the desired border color here
                    borderRadius: "10px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#DC0019", // Set the border color on hover here
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#DC0019", // Set the border color on focus here
                  },
                },
              }}
              placeholder="Search User, Matric No., Transaction ID"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              required
              id="firstName-input"
              InputProps={{
                style: { color: "#818181" },
                startAdornment: (
                  <InputAdornment>
                    <img src={search} alt="s-logo" />
                    &nbsp;&nbsp;&nbsp;
                  </InputAdornment>
                ),
              }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
          </Box>
          {/* search ends */}

          {/* select */}
          <Button
            onClick={() => setOpenFilterModal(true)}
            startIcon={<img src={selectIcon} alt="s-icon" />} // Icon before text
            endIcon={<img src={downIcon} alt="d-icon" />} // Icon after text
            style={{
              color: "#828282",
              border: "1px solid #828282",
              textTransform: "capitalize",
              padding: "8px 12px 8px 12px",
              width: "154px",
            }}
          >
            All levels
          </Button>

          {/* select ends */}

          {/* download */}
          <Button
            sx={{
              textTransform: "capitalize",
              fontWeight: "400",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#DC0019",
            }}
          >
            <img src={download} className="d-icon" alt="d-icon" />
            download
          </Button>
          {/* download end */}
        </Box>

        {/* details box here  end */}

        {/* Button box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            mb: "1rem",
          }}
        >
          <Button
            variant={showPaid === "transaction" ? "contained" : "outlined"}
            onClick={() => handleSortByStatus(null)}
            style={{
              marginRight: "5px",
              backgroundColor:
                showPaid === "transaction" || showPaid === ""
                  ? "#DC0019"
                  : "white",
              padding: "8px 24px 8px 24px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: "400",
              color:
                showPaid === "transaction" || showPaid === ""
                  ? "#fff"
                  : "#828282",
              border:
                showPaid === "transaction" || showPaid === ""
                  ? ""
                  : "1px solid #E0E0E0",
            }}
          >
            <SyncAltRoundedIcon
              sx={{
                color: showPaid !== null && "#828282",
                fontSize: "16px",
              }}
            />
            All Transactions
          </Button>
          <Button
            variant={showPaid === "paid" ? "contained" : "outlined"}
            onClick={() => handleSortByStatus("paid")}
            style={{
              marginRight: "5px",
              color: showPaid === "paid" ? "white" : "#828282",
              backgroundColor: showPaid === "paid" ? "#DC0019" : "white",
              border: showPaid === "paid" ? "" : "1px solid #E0E0E0",
              padding: "8px 24px 8px 24px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            <CheckCircleOutlineRoundedIcon
              sx={{
                fontSize: "16px",
              }}
            />{" "}
            Paid Only
          </Button>
          <Button
            variant={showPaid === "verified" ? "contained" : "outlined"}
            onClick={() => handleSortByStatus("verified")}
            style={{
              color: showPaid === "verified" ? "white" : "#828282",
              backgroundColor: showPaid === "verified" ? "#dc0019" : "#fff",
              border: showPaid === "verified" ? "" : "1px solid #E0E0E0",

              padding: "8px 24px 8px 24px",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textTransform: "capitalize",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            <CheckCircleOutlineRoundedIcon
              sx={{
                fontSize: "16px",
              }}
            />{" "}
            Verified Only
          </Button>
        </Box>
        {/* Button box end */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, padding: "8px" }}>
            <TableHead
              sx={{
                background: "#F8F8F8",
              }}
            >
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Payer</TableCell>
                <TableCell>Bill Type</TableCell>
                <TableCell>Amount(N)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {filteredItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.tid}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.amt}</TableCell>
                    <TableCell>
                      {" "}
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          color: "#DC0019",
                          background:
                            item.status === "paid" ? "#EBFFF3" : "#EBF3FF",
                          color: item.status === "paid" ? "#1E854A" : "#1367D8",
                          width: item.status === "paid" ? "67px" : "87px",
                          fontWeight: "500",
                          fontSize: "12px",
                          border: "none",
                          padding: "4px 8px 4px 8px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          border: "1px solid #E0E0E0",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{ fontSize: "12px" }}
                        />{" "}
                        {item.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => setOpen1(true)}
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          color: "#DC0019",
                          fontWeight: "600",
                          fontSize: "14px",
                          border: "1px solid #E0E0E0",
                          "&:hover": {
                            backgroundColor: "#fff",
                            border: "1px solid #E0E0E0",
                          },
                          // lineHeight: "26.4px",
                        }}
                      >
                        View More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))} */}
              {isLoading ? (
                <TableRow>
                  <CircularProgress
                    size="4.2rem"
                    sx={{
                      color: "#DC0019",
                      marginLeft: "auto",
                      padding: "1em",
                    }}
                  />
                </TableRow>
              ) : trxData?.records.length > 0 ? (
                trxData?.records.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {i + 1 + (currentPage - 1) * rowsPerPage}
                    </TableCell>
                    <TableCell>{item?.id}</TableCell>
                    <TableCell>{item?.origin?.accountName}</TableCell>
                    <TableCell>
                      {item?.recipientDetails?.association?.billType}
                    </TableCell>
                    <TableCell>{item?.amount} </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          background:
                            item?.status === "failed"
                              ? "#FFF0F0"
                              : item.status === "success"
                              ? "#EBFFF3"
                              : item?.status === "pending" ||
                                item?.status === "incoming"
                              ? "#FFF0F0"
                              : "",
                          color:
                            item?.status === "failed"
                              ? "#E52929"
                              : item.status === "success"
                              ? "#1E854A"
                              : item?.status === "pending" ||
                                item?.status === "incoming"
                              ? "#CDA11E"
                              : "",
                          fontWeight: "500",
                          fontSize: "12px",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                          border: "1px solid #E0E0E0",
                        }}
                      >
                        {item?.status === "failed" && (
                          <ReportOutlinedIcon sx={{ fontSize: "12px" }} />
                        )}
                        {item?.status === "success" && (
                          <CheckCircleOutlineRoundedIcon
                            sx={{ fontSize: "12px" }}
                          />
                        )}
                        {item?.status === "incoming" && (
                          <HourglassBottomOutlinedIcon
                            sx={{ fontSize: "12px" }}
                          />
                        )}
                        {item?.status === "pending" && (
                          <HourglassBottomOutlinedIcon
                            sx={{ fontSize: "12px" }}
                          />
                        )}

                        {item?.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => viewDetails(item?.id)}
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          color: "#DC0019",
                          fontWeight: "600",
                          fontSize: "14px",
                          border: "1px solid #E0E0E0",
                          "&:hover": {
                            backgroundColor: "#fff",
                            border: "1px solid #E0E0E0",
                          },
                          // lineHeight: "26.4px",
                        }}
                      >
                        View More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Typography className="flex self-center p-3  min-w-full">
                  No transactions yet.
                </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={trxData?.records?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Moda;l for detailsl */}

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          PaperProps={{
            sx: {
              border: "none", // Remove the border
              boxShadow: "none", // Remove the box shadow
            },
          }}
        >
          <TransactionDetailsStudents
            handleClose1={handleClose1}
            details={studentByI}
          />
        </Modal>
        {/* Modal ends */}

        <Modal
          open={openFilterModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          PaperProps={{
            sx: {
              border: "none", // Remove the border
              boxShadow: "none", // Remove the box shadow
            },
          }}
        >
          <Card
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
                justifyContent: "space-between",
                alignItems: "center",
                mb: "2rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "900",
                  color: "#1E1E1E",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Filter
              </Typography>

              <Box onClick={handleClose} className="cursor-pointer">
                <img src={closeIcon} alt="c-icon" />
              </Box>
            </Box>

            {/* first Tabs */}
            <Box
              sx={{
                textAlign: "left",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#1E1E1E",
                  my: "1rem",
                }}
              >
                Students Status
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                mb: "1rem",
              }}
            >
              <Button
                variant={showPaid === null ? "contained" : "outlined"}
                onClick={() => handleSortByStatus(null)}
                style={{
                  marginRight: "5px",
                  backgroundColor: showPaid === null ? "#DC0019" : "white",
                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: showPaid === null ? "#fff" : "#828282",
                  border: showPaid === null ? "" : "1px solid #E0E0E0",
                }}
              >
                Any
              </Button>
              <Button
                variant={showPaid === true ? "contained" : "outlined"}
                onClick={() => handleSortByStatus(true)}
                style={{
                  marginRight: "5px",
                  color: showPaid === true ? "white" : "#828282",
                  backgroundColor: showPaid === true ? "#DC0019" : "white",
                  border: showPaid === true ? "" : "1px solid #E0E0E0",
                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Freshers
              </Button>
              <Button
                variant={showPaid === false ? "contained" : "outlined"}
                onClick={() => setShowStalites(true)}
                style={{
                  color: showPaid === false ? "white" : "#828282",
                  backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                  border: showPaid === false ? "" : "1px solid #E0E0E0",

                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Stallites
              </Button>
            </Box>

            {/* Tabs end */}

            {/* tab for stalites */}

            {showStalites && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "start",
                }}
              >
                <Box
                  sx={{
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "20px",
                      color: "#1E1E1E",
                      my: "1rem",
                    }}
                  >
                    Level
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "1rem",
                  }}
                >
                  <Button
                    variant={showPaid === null ? "contained" : "outlined"}
                    onClick={() => handleSortByStatus(null)}
                    style={{
                      marginRight: "5px",
                      backgroundColor: showPaid === null ? "#DC0019" : "white",
                      padding: "8px 24px 8px 24px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                      color: showPaid === null ? "#fff" : "#828282",
                      border: showPaid === null ? "" : "1px solid #E0E0E0",
                    }}
                  >
                    200L
                  </Button>

                  <Button
                    variant={showPaid === false ? "contained" : "outlined"}
                    onClick={() => handleSortByStatus(false)}
                    style={{
                      color: showPaid === false ? "white" : "#828282",
                      backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                      border: showPaid === false ? "" : "1px solid #E0E0E0",

                      padding: "8px 24px 8px 24px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    300L
                  </Button>
                  <Button
                    variant={showPaid === false ? "contained" : "outlined"}
                    onClick={() => handleSortByStatus(false)}
                    style={{
                      color: showPaid === false ? "white" : "#828282",
                      backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                      border: showPaid === false ? "" : "1px solid #E0E0E0",

                      padding: "8px 24px 8px 24px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    400L
                  </Button>
                  <Button
                    variant={showPaid === false ? "contained" : "outlined"}
                    onClick={() => handleSortByStatus(false)}
                    style={{
                      color: showPaid === false ? "white" : "#828282",
                      backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                      border: showPaid === false ? "" : "1px solid #E0E0E0",

                      padding: "8px 24px 8px 24px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    500L
                  </Button>
                  <Button
                    variant={showPaid === false ? "contained" : "outlined"}
                    onClick={() => handleSortByStatus(false)}
                    style={{
                      color: showPaid === false ? "white" : "#828282",
                      backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                      border: showPaid === false ? "" : "1px solid #E0E0E0",

                      padding: "8px 24px 8px 24px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    600L
                  </Button>
                </Box>
              </Box>
            )}

            {/* tab for stalites end */}

            {/* second tabs */}
            <Box
              sx={{
                textAlign: "left",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#1E1E1E",
                  my: "1rem",
                }}
              >
                Bill Type
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  mb: "1rem",
                  width: "90%",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant={showPaid === null ? "contained" : "outlined"}
                  onClick={() => handleSortByStatus(null)}
                  style={{
                    marginRight: "5px",
                    backgroundColor: showPaid === null ? "#DC0019" : "white",
                    padding: "8px 24px 8px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: showPaid === null ? "#fff" : "#828282",
                    border: showPaid === null ? "" : "1px solid #E0E0E0",
                  }}
                >
                  Association Due
                </Button>
                <Button
                  variant={showPaid === true ? "contained" : "outlined"}
                  onClick={() => handleSortByStatus(true)}
                  style={{
                    marginRight: "5px",
                    color: showPaid === true ? "white" : "#828282",
                    backgroundColor: showPaid === true ? "#DC0019" : "white",
                    border: showPaid === true ? "" : "1px solid #E0E0E0",
                    padding: "8px 24px 8px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Excursion
                </Button>
                <Button
                  variant={showPaid === false ? "contained" : "outlined"}
                  onClick={() => handleSortByStatus(false)}
                  style={{
                    color: showPaid === false ? "white" : "#828282",
                    backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                    border: showPaid === false ? "" : "1px solid #E0E0E0",

                    padding: "8px 24px 8px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Dinner & Award Night
                </Button>
                <Button
                  variant={showPaid === false ? "contained" : "outlined"}
                  onClick={() => handleSortByStatus(false)}
                  style={{
                    color: showPaid === false ? "white" : "#828282",
                    backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                    border: showPaid === false ? "" : "1px solid #E0E0E0",

                    padding: "8px 24px 8px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Student Handbook
                </Button>
                <Button
                  variant={showPaid === false ? "contained" : "outlined"}
                  onClick={() => handleSortByStatus(false)}
                  style={{
                    color: showPaid === false ? "white" : "#828282",
                    backgroundColor: showPaid === false ? "#dc0019" : "#fff",
                    border: showPaid === false ? "" : "1px solid #E0E0E0",

                    padding: "8px 24px 8px 24px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Field Trip
                </Button>
              </Box>
            </Box>

            {/* second tabs end */}

            {/* controllers  */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "1rem",
                mt: "3rem",
              }}
            >
              <Button
                style={{
                  marginRight: "5px",
                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#DC0019",
                }}
              >
                Association Due
              </Button>
              <Button
                variant="outlined"
                style={{
                  marginRight: "5px",
                  width: "100%",

                  color: "#DC0019",
                  backgroundColor: "white",
                  border: "1px solid #E0E0E0",
                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Excursion
              </Button>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#dc0019",
                  padding: "8px 24px 8px 24px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  width: "100%",

                  fontWeight: "400",
                }}
              >
                Apply Filter
              </Button>
            </Box>
            {/* controllers end */}
          </Card>
        </Modal>
      </Box>
    </Box>
  );
};

export default TableStudents;
