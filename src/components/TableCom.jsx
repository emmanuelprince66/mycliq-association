import React from "react";
import { useState, useEffect } from "react";
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
import FormattedPrice from "./FormattedPrice";

const TableCom = () => {
  const [transactionData, setTransactionData] = useState([]);
  console.log(transactionData);
  const [open1, setOpen1] = React.useState(false);
  const [data, setData] = useState({});
  const handleClose1 = () => setOpen1(false);

  const [totalDeposits, setTotalDeposits] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaid, setShowPaid] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [details, setDetails] = useState({});
  const { selectedDates } = useSelector((state) => state);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
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

  const dispatch = useDispatch();
  const { transactionDetails } = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthAxios({
          url: "/merchant/trx",
          method: "GET",
        });

        if (response) {
          console.log(response);
          setLoading(false);

          // const paidData = response?.data?.queryResult.filter(
          //   (item) => item?.remittance?.paymentStatus === "PAID"
          // );
          // setPaidDataState(paidData.length);

          // const verifiedData = response?.data?.queryResult.filter(
          //   (item) => item?.remittance?.paymentStatus === "VERIFIED"
          // );
          // setVerifiedDataState(verifiedData.length);

          let filteredItems = response.data?.queryResult;

          // Filter by name (if searchTerm exists)
          if (searchTerm) {
            filteredItems = filteredItems.filter((item) => {
              return (
                item.transferFrom.firstName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                item.transferFrom.lastName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
            });
          }

          // Filter by date range (if selectedDates exist)
          if (selectedDates) {
            const startDate = new Date(selectedDates.startDate);
            const endDate = new Date(selectedDates.endDate);
            endDate.setDate(endDate.getDate() + 1); // Increment by 1 day to include the end date

            filteredItems = filteredItems.filter((item) => {
              const createdAt = new Date(item?.createdAt);

              return (
                createdAt >= startDate && createdAt < endDate // Inclusive of start and end dates
              );
            });
          }

          setTransactionData(filteredItems);
          dispatch(saveTransactionData(response?.data));
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          navigate("/");
          localStorage.clear();
        }
      }
    };

    fetchData();
  }, [dispatch, searchTerm, selectedDates]);

  useEffect(() => {
    const amtOfTotalDeposit = transactionData.reduce(
      (prev, curr) => prev + JSON.parse(curr.amount),
      0
    );
    setTotalDeposits(amtOfTotalDeposit);
  }, [transactionData, totalDeposits]);

  async function viewDetails(i) {
    setOpen1(true);
    setIndex(i);
  }
  return (
    <Box
      sx={{
        width: "1080px",
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
          display: "flex",
          gap: "2rem",
          mb: "1rem",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            width: "356px",
            gap: "0.8rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                width: "28px",
                height: "28px",
              }}
            >
              <img src={fdown} className="fd" alt="f-down" />
            </Box>
            <Typography
              sx={{
                fomtWeight: "500",
                fontSize: "14px",
                color: "#4F4F4F",
              }}
            >
              Total <br />
              Deposits
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fomtWeight: "600",
                fontSize: "24px",
                color: "#1E1E1E",
              }}
            >
              {totalDeposits === null ? (
                <CircularProgress size="1.2rem" sx={{ color: "#ff7f00" }} />
              ) : (
                <FormattedPrice amount={totalDeposits} />
              )}
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            width: "356px",
            gap: "0.8rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Box
                sx={{
                  width: "28px",
                  height: "28px",
                }}
              >
                <img src={fdown} className="fd" alt="f-down" />
              </Box>
              <Typography
                sx={{
                  fomtWeight: "500",
                  fontSize: "14px",
                  color: "#4F4F4F",
                }}
              >
                Total <br />
                Withdrawals
              </Typography>
            </Box>

            <Box className="flex gap-2 items-center cursor-pointer">
              <Typography
                sx={{
                  fomtWeight: "400",
                  fontSize: "13px",
                  color: "#dc0019",
                }}
              >
                History
              </Typography>
              <ArrowForwardIosRoundedIcon
                sx={{ color: "#dc0019", fontSize: "13px" }}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                fomtWeight: "600",
                fontSize: "24px",
                color: "##1E1E1E",
              }}
            >
              <FormattedPrice amount={transactionDetails.outflow} />
            </Typography>
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            width: "356px",
            gap: "0.8rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Box
              sx={{
                width: "28px",
                height: "28px",
              }}
            >
              <img src={fdown} className="fd" alt="f-down" />
            </Box>
            <Typography
              sx={{
                fomtWeight: "500",
                fontSize: "14px",
                color: "#4F4F4F",
              }}
            >
              Wallet
              <br />
              Balance
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fomtWeight: "600",
                fontSize: "24px",
                color: "##1E1E1E",
              }}
            >
              <FormattedPrice
                amount={Number(transactionDetails?.walletBalance || 0)}
              />
            </Typography>
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          width: "1080px",
          margin: "auto",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
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
                <TableCell>User</TableCell>
                <TableCell>Transaction Type</TableCell>
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
              {loading ? (
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
              ) : transactionData.length > 0 ? (
                transactionData.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{` ID:${item.id.slice(1, 12)}`}</TableCell>
                    <TableCell>
                      {item.transferFrom.firstName} {item.transferFrom.lastName}
                    </TableCell>
                    <TableCell>{item.transactionType}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {" "}
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          background:
                            item?.remittance?.paymentStatus === "PAID"
                              ? "#EBFFF3"
                              : "#EBF3FF",
                          color:
                            item?.remittance?.paymentStatus === "PAID"
                              ? "#1E854A"
                              : "#1367D8",
                          width:
                            item?.remittance?.paymentStatus === "PAID"
                              ? "67px"
                              : "87px",
                          fontWeight: "500",
                          fontSize: "12px",
                          padding: "4px 8px 4px 8px",
                          borderRadius: "8px",
                          display: "flex",
                          minWidth: "fit-content",
                          alignItems: "center",
                          gap: "5px",
                          border: "1px solid #E0E0E0",
                        }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{ fontSize: "12px" }}
                        />{" "}
                        {item?.remittance?.paymentStatus === "PAID" &&
                          "Sucessfull"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => viewDetails(i)}
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
          count={transactionData.length}
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
          <TransactionDetails
            handleClose1={handleClose1}
            details={transactionData[index]}
          />
        </Modal>
        {/* Modal ends */}
      </Box>
    </Box>
  );
};

export default TableCom;
