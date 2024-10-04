import React from "react";
import { useState, useEffect } from "react";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { Calendar, DateRangePicker } from "react-date-range";
import { fillSelectedDates } from "../utils/store/merchantSlice";
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
import { useSelector } from "react-redux";
import {
  saveTransactionData,
  fillUserDetails,
} from "../utils/store/merchantSlice";
import { AuthAxios } from "../helpers/axiosInstance";

import { useDispatch } from "react-redux";
import search from "../../src/assets/search.svg";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import selectIcon from "../assets/selectIcon.svg";
import downIcon from "../assets/images/arrowDown.svg";
import download from "../assets/images/download.svg";
import closeIcon from "../assets/images/closeIcon.svg";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
const Performance = () => {
  const [dateVisible, setDateVisible] = useState(false);
  const [page, setPage] = useState(0);

  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const dispatch = useDispatch();
  const { selectedDates } = useSelector((state) => state);
  function handleSelect(ranges) {
    const dateRange = {
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    };
    setSelectedRange(dateRange);

    console.log("Selected Date Range:", ranges);
  }
  const modStartDate = new Date(selectedDates.startDate).toLocaleDateString();
  const modEndDate = new Date(selectedDates.endDate).toLocaleDateString();

  function openDateRange() {
    setDateVisible(!dateVisible);
  }
  function showChange(data) {
    setDateVisible(!dateVisible);
  }
  function handleDateChange() {
    dispatch(
      fillSelectedDates({
        startDate: new Date(selectedRange.startDate).toLocaleDateString(),
        endDate: new Date(selectedRange.endDate).toLocaleDateString(),
      })
    );
    setDateVisible(false);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dummyData = [
    {
      id: 1,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 2,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 3,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 4,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 5,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 6,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 7,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
    {
      id: 8,
      nm: "Kelvon munach",
      success: 91,
      price: "8,000",
    },
  ];
  return (
    <Box
      sx={{
        p: "1rem",
      }}
    >
      <Box
        sx={{
          my: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            width: "fit-content",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#828282",
            }}
          >
            Showing Results for
          </Typography>
          <div className="border flex ml-auto border-grey_1 w-fit rounded-[8px] ">
            <Button
              sx={{ color: "#4F4F4F" }}
              startIcon={<CalendarMonthOutlined />}
              onClick={openDateRange}
            >
              {" "}
              {modStartDate}- {modEndDate}
            </Button>
          </div>
        </Box>
        {dateVisible && (
          <div className="absolute flex flex-col bg-white z-[2] mt-[40px] shadow-lg p-2 rounded-[8px] right-0">
            <DateRangePicker
              ranges={[selectedRange]}
              onShownDateChange={showChange}
              onChange={handleSelect}
            />

            <button
              onClick={handleDateChange}
              className="bg-primary_red_2 hover:bg-primary_red_3 p-2 w-1/5 ml-auto rounded-[8px] text-white"
            >
              {" "}
              Done{" "}
            </button>
          </div>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: "3rem",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            color: "#000",
          }}
        >
          Attendants’ Performance
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img src={download} alt="d-icon" />
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              color: "#dc0019",
            }}
          >
            Download
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          mt: "1rem",
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
                <TableCell>Name</TableCell>
                <TableCell>Total Successfull Transactions</TableCell>
                <TableCell>Value&#x20A6;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData?.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nm}</TableCell>
                  <TableCell>{item.success}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dummyData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default Performance;
