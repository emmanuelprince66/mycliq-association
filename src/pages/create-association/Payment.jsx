import React from "react";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import copy from "../../assets/images/admin/copy.svg";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import right from "../../assets/images/admin/url/right.svg";
import danger from "../../assets/images/admin/url/danger.svg";
import { useMediaQuery, useTheme } from "@mui/material";

const Payment = ({ setShowScreen }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openDangerModal, setOpenDangerModal] = useState(false);
  const theme = useTheme();

  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const closeOpenCirfirmedModal = () => setOpenConfirmModal(false);
  const closeOpenDangerModal = () => setOpenDangerModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "12px",
    width: !isTabletOrDesktop ? "345px" : "565px",
    bgcolor: "background.paper",
    p: 3,
  };
  return (
    <div className="md:w-[70%] w-full mx-auto p-3  md:p-3">
      <div className="flex items-center gap-3">
        <ArrowBackIosRoundedIcon
          sx={{ color: "#1e1e1e" }}
          onClick={() => setShowScreen("confirm")}
        />

        <p className="font-[500] text-[20px] text-[#1e1e1e]">
          Pay With Bank Transfer
        </p>
      </div>

      <div className="flex flex-col items-start w-full gap-3 mt-3">
        <p className="font-normal text-[16px] text-[#535353]">
          Note: Kindly transfer exact amount to the account details below.
          Account number is valid for
          <span className="text-[#FF7F00] ml-1 leading-10">59:14</span>
        </p>
      </div>

      <div className="w-full rounded-md p-3 border border-[#F2F2F2] mt-4 bg-[#FBFBFB]">
        <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
          <p className="font-normal text-[12px] text-[#535353 ]">Bank Name</p>
          <p className="font-[600] text-[14px] text-[#1e1e1e]">
            Safe Haven Microfinance Bank
          </p>
        </div>
        <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
          <p className="font-normal text-[12px] text-[#535353 ]">
            Account Number
          </p>
          <div className="w-full flex items-center gap-2">
            <p className="font-[600] text-[14px] text-[#1e1e1e]">2085209073</p>
            <img src={copy} alt="" />
          </div>
        </div>
        <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
          <p className="font-normal text-[12px] text-[#535353 ]">
            Account Name
          </p>
          <p className="font-[600] text-[14px] text-[#1e1e1e]">
            Emmanuel Ochigbo
          </p>
        </div>
      </div>

      <div className="min-h-[50vh] flex items-end">
        <div className="flex flex-col items-start gap-3 w-full">
          <div className="flex justify-between items-center w-full">
            <p className="font-[400] text-[17px] text-[#5e5e5e]">Total</p>
            <p className="font-[500] text-[21px] text-[#1e1e1e]">N22,000</p>
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-[70%] gap-0 md:gap-3">
            <Button
              onClick={() => setShowScreen("payment")}
              sx={{
                background: "#333333",
                width: "100%",
                padding: "10px, 16px, 10px, 16px",
                mb: "1rem",
                textTransform: "capitalize",
                fontWeight: "400",
                height: "48px",
                fontSize: "16px",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Click here after transfer
            </Button>{" "}
            <Button
              onClick={() => setShowScreen("create")}
              variant="outlined"
              sx={{
                width: "100%",
                padding: "10px, 16px, 10px, 16px",
                mb: "2rem",
                textTransform: "capitalize",
                fontWeight: "400",
                height: "48px",
                fontSize: "16px",
                borderRadius: "8px",
                color: "#000",
              }}
            >
              Cancel
            </Button>{" "}
          </div>
        </div>
      </div>

      {/* Moda;l for detailsl */}

      <Modal
        open={openConfirmModal}
        onClose={closeOpenCirfirmedModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          sx: {
            border: "none", // Remove the border
            boxShadow: "none", // Remove the box shadow
          },
        }}
      >
        <Box
          sx={style}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <img src={right} alt="righe" />
          <p className="texx-[#1e1e1e] text-[20px] font-[600]">
            Payment Received🎉
          </p>
          <Button
            sx={{
              background: "#333333",
              mt: "1rem",
              width: "100%",
              padding: "10px, 16px, 10px, 16px",
              mb: "1rem",
              textTransform: "capitalize",
              fontWeight: "400",
              height: "48px",
              fontSize: "16px",
              borderRadius: "8px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Okay
          </Button>{" "}
        </Box>
      </Modal>
      {/* Modal ends */}
      {/* Moda;l for detailsl */}

      <Modal
        open={openDangerModal}
        onClose={closeOpenDangerModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          sx: {
            border: "none", // Remove the border
            boxShadow: "none", // Remove the box shadow
          },
        }}
      >
        <Box
          sx={style}
          className="flex flex-col gap-4 items-center justify-center"
        >
          <img src={danger} alt="danger" />
          <p className="texx-[#1e1e1e] text-[20px] font-[600]">
            Payment Failed
          </p>
          <div className="flex flex-col md:flex-row w-full gap-3 mt-4">
            <Button
              sx={{
                background: "#333333",
                width: "100%",
                padding: "10px, 16px, 10px, 16px",
                textTransform: "capitalize",
                fontWeight: "400",
                height: "48px",
                fontSize: "16px",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Try Again
            </Button>{" "}
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                padding: "10px, 16px, 10px, 16px",
                textTransform: "capitalize",
                fontWeight: "400",
                height: "48px",
                fontSize: "16px",
                borderRadius: "8px",
                color: "#000",
              }}
            >
              Cancel
            </Button>{" "}
          </div>
        </Box>
      </Modal>
      {/* Modal ends */}
    </div>
  );
};

export default Payment;
