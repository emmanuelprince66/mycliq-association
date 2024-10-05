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
import FormattedPrice from "./FormattedPrice";

export const TransactionDetailsStudents = ({ handleClose1, details }) => {
  console.log("details", details);
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

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fomtWeight: "900",
            color: "#1E1E1E",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Transaction Details
        </Typography>

        <Box onClick={handleClose1}>
          <img src={closeIcon} alt="c-icon" />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          border: " #E0E0E0",
          background: "#f3f3f3",
          p: "20px",
          display: "flex",
          flexDirection: "column",
          gap: ".4em",
          justifyContent: "start",
          borderRadius: "8px",
          my: "1rem",
        }}
      >
        <Typography
          sx={{
            fomtWeight: "900",
            color: "#1E1E1E",
            fontSize: "14px",
            minWidth: "130px",
          }}
        >
          ACCOUNT OWNER'S DETAILS
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Account Name:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.origin?.accountName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Account Number:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.origin?.accountNumber}
          </Typography>
        </Box>
      </Box>

      {/* es */}

      <Box
        sx={{
          width: "100%",
          background: "#fff",
          border: "1px solid #E0E0E0",
          p: "20px",
          display: "flex",
          gap: ".3em",
          flexDirection: "column",
          justifyContent: "start",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            fomtWeight: "900",
            color: "#1E1E1E",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Recipient Information
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mt: "1rem",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Biller Name:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.meta?.paymentDetails?.biller ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Matric Number:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.meta?.paymentDetails?.matricNum ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Email Address:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.meta?.paymentDetails?.email ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Phone Number:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.meta?.paymentDetails?.phoneNumber ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Level:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.meta?.paymentDetails?.level ?? "..."}
          </Typography>
        </Box>

        <Box></Box>
      </Box>

      {/* third box start */}
      <Box
        sx={{
          width: "100%",
          background: "#fff",
          border: "1px solid #E0E0E0",
          p: "20px",
          display: "flex",
          gap: ".3em",
          flexDirection: "column",
          justifyContent: "start",
          borderRadius: "8px",
          mt: "1rem",
        }}
      >
        <Typography
          sx={{
            fomtWeight: "900",
            color: "#1E1E1E",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Transaction Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mt: "1rem",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Bill Type:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.type ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Transaction ID:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.id ?? "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fomtWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Date & Time:
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {modDate(details?.createdAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Amount:
          </Typography>

          <Typography
            sx={{
              color: "#CDA11E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            <FormattedPrice amount={details?.amount} />
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            mb: "0.2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              color: "#828282",
              fontSize: "14px",
              minWidth: "130px",
            }}
          >
            Transaction Status :
          </Typography>

          <Typography
            sx={{
              color: "#1E1E1E",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {details?.status ?? "..."}
          </Typography>
        </Box>

        <Box></Box>
      </Box>

      {/* third box end */}
    </Box>
  );
};
