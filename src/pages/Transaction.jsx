import React, { useState, useEffect } from "react";
import TableCom from "../components/TableCom";
import { AuthAxios } from "../helpers/axiosInstance";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Box, Button, Typography } from "@mui/material";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { Calendar, DateRangePicker } from "react-date-range";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { fillSelectedDates } from "../utils/store/merchantSlice";
import { fillUserDetails } from "../utils/store/merchantSlice";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookieAuth";
const Transaction = () => {
  const [dateVisible, setDateVisible] = useState(false);
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

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "80vh",
        overflowY: "scroll",
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
          mb: "1rem",
        }}
      >
        <Box
          className="flex items-center gap-2 p-2 rounded cursor-pointer"
          sx={{
            border: "1px solid #ff7f00",
          }}
        >
          <AccountCircleIcon
            sx={{
              color: "#333333",
              fontSize: "13px",
            }}
          />

          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "13px",
              pt: "2px",
              color: "#333333",
            }}
          >
            See Account & Payer Info
          </Typography>

          <ArrowForwardIosRoundedIcon
            sx={{
              color: "#333333",
              fontSize: "13px",
            }}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "16px",
            color: "#4F4F4F",
          }}
        >
          Showing results for
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
        <div className="absolute flex flex-col bg-white z-[2]  shadow-lg p-2 rounded-[8px] right-0">
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
      <TableCom />
    </Box>
  );
};

export default Transaction;
