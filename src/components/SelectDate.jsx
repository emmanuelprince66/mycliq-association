import React, { useState } from "react";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { fillSelectedDates } from "../utils/store/merchantSlice";
import { Box, Button, Typography } from "@mui/material";

const SelectDate = () => {
  const dispatch = useDispatch();
  const { selectedDates } = useSelector((state) => state);

  const [dateVisible, setDateVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // This function handles date selection changes, but no time adjustments are made here
  const handleSelect = (ranges) => {
    setSelectedRange({
      startDate: new Date(ranges.selection.startDate),
      endDate: new Date(ranges.selection.endDate),
      key: "selection",
    });
  };

  // Adjust the dates' times only when dispatching them to Redux
  const handleDateChange = () => {
    // Adjust the startDate to 12:00 AM and endDate to 11:59 PM
    const adjustedStartDate = new Date(selectedRange.startDate);
    adjustedStartDate.setHours(0, 0, 0, 0);

    const adjustedEndDate = new Date(selectedRange.endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    // Dispatch the adjusted dates
    dispatch(
      fillSelectedDates({
        startDate: adjustedStartDate, // Ensure it's a Date object
        endDate: adjustedEndDate, // Ensure it's a Date object
      })
    );
    setDateVisible(false);
  };

  const openDateRange = () => {
    setDateVisible(!dateVisible);
  };

  return (
    <div>
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
            {selectedRange.startDate.toLocaleDateString()} -{" "}
            {selectedRange.endDate.toLocaleDateString()}
          </Button>
        </div>
        {dateVisible && (
          <div className="absolute flex flex-col bg-white z-[2] shadow-lg p-2 rounded-[8px] top-[140px]">
            <DateRangePicker ranges={[selectedRange]} onChange={handleSelect} />

            <button
              onClick={handleDateChange}
              className="bg-primary_red_2 hover:bg-primary_red_3 p-2 w-1/5 ml-auto rounded-[8px] text-white"
            >
              Done
            </button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SelectDate;
