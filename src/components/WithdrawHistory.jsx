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
import closeIcon from "../assets/images/closeIcon.svg";
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { AuthAxios } from "../helpers/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { TransactionDetails } from "./transactionDetails";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  width: "745px",
  bgcolor: "background.paper",
  p: 3,
};

const WithdrawHistory = () => {
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => setOpen1(false);
  const [page, setPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [withData, setWithData] = useState(null);
  const [details, setDetails] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTrxData = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey;
    try {
      const response = await AuthAxios.get(
        `/merchant/trx?page=${page}&limit=${limit}&type=payment`
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
    queryKey: ["trxData", { page: currentPage, limit: rowsPerPage }],
    queryFn: fetchTrxData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  const [items, setItems] = useState([
    {
      id: 1,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "sucessfull",
    },
    {
      id: 2,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "sucessfull",
    },
    {
      id: 3,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "pending",
    },
    {
      id: 4,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "sucessfull",
    },
    {
      id: 5,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "failed",
    },
    {
      id: 6,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "sucessfull",
    },
    {
      id: 7,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "pending",
    },
    {
      id: 8,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "pending",
    },
    {
      id: 9,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "failed",
    },
    {
      id: 10,
      amt: "500,000",
      date: "11-05-2023 at 11:15am",
      status: "pending",
    },
  ]);
  const { transactionDetails } = useSelector((state) => state);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log("trx", trxData);
  const withdrawalData =
    transactionDetails?.queryResult?.filter(
      (item) => item?.transactionType === "WITHDRAWAL"
    ) || [];
  console.log(withdrawalData);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  const viewDetails = (id) => {
    const trxByIdF = withData?.find((item) => item?.id === id);

    if (trxByIdF) {
      setDetails(trxByIdF);
      setOpen1(true);
    }
  };

  useEffect(() => {
    if (trxData) {
      const debitData = trxData?.records?.filter(
        (item) => item?.entry === "debit"
      );
      setWithData(debitData);
    }
  }, [trxData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: "1rem",
        backgroundColor: "#fffcfc",
      }}
    >
      <Typography
        sx={{
          fomtWeight: "500",
          fontSize: "20px",
          color: "#1E1E1E",
          margin: "0 0 2rem 0",
        }}
      >
        Withdrawal History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: "8px" }}>
          <TableHead
            sx={{
              background: "#F8F8F8",
            }}
          >
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Amount (₦)</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withData?.length > 0 ? (
              withData?.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item?.amount}</TableCell>
                  <TableCell>{modDate(item?.createdAt)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        color: "#DC0019",
                        background:
                          item.status === "success"
                            ? "#EBFFF3"
                            : item.status === "pending"
                            ? "#FFF0F0"
                            : "#FFF0F0",
                        color:
                          item.status === "success"
                            ? "#1E854A"
                            : item.status === "pending"
                            ? "#CDA11E"
                            : "#E52929",
                        width:
                          item.status === "success"
                            ? "105px"
                            : item.status === "pending"
                            ? "90px"
                            : "90px",
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
                      {item.status === "success" ? (
                        <CheckCircleOutlineRoundedIcon
                          sx={{
                            fontSize: "12px",
                          }}
                        />
                      ) : item.status === "pending" ? (
                        <HourglassTopRoundedIcon
                          sx={{
                            fontSize: "12px",
                          }}
                        />
                      ) : (
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: "12px",
                          }}
                        />
                      )}

                      {item.status}
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
        count={items.length}
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
        <TransactionDetails handleClose1={handleClose1} details={details} />
      </Modal>
      {/* Modal ends */}
    </Box>
  );
};

export default WithdrawHistory;
