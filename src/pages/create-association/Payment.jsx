import React, { useEffect } from "react";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import copy from "../../assets/images/admin/copy.svg";
import { Box, Button, Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";
import right from "../../assets/images/admin/url/right.svg";
import danger from "../../assets/images/admin/url/danger.svg";
import { useMediaQuery, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AuthAxios } from "../../helpers/axiosInstance";
import FormattedPrice from "../../components/FormattedPrice";
import { ToastContainer, toast } from "react-toastify";
import Receipt from "./Reciept";

const Payment = ({ setShowScreen, initiateBillData }) => {
  console.log("ini", initiateBillData);

  const [isCopied, setIsCopied] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openDangerModal, setOpenDangerModal] = useState(false);

  const [receiptData, setReceiptData] = useState(null);

  const [showReciept, setShowReciept] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [makePaymentData, setMakePaymentData] = useState(null);
  const [refId, setRefId] = useState(null);
  const theme = useTheme();

  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const closeOpenCirfirmedModal = () => setOpenConfirmModal(false);
  const closeOpenDangerModal = () => setOpenDangerModal(false);

  const handleCopy = () => {
    if (initiateBillData?.bankDetails?.accountNumber) {
      navigator.clipboard
        .writeText(initiateBillData?.bankDetails?.accountNumber)
        .then(() => {
          setIsCopied(true);

          // Hide "Copied" message after 1 second
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        });
    }
  };

  const expiryDate = new Date(
    initiateBillData?.bankDetails?.expiryDate
  ).getTime();
  const [timeLeft, setTimeLeft] = useState({});

  // Function to calculate the time difference
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = expiryDate - now;

    // Calculate days, hours, minutes, seconds
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup timer
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setRefId(initiateBillData?.ref);
  }, [initiateBillData]);

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

  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 6000, // Time in milliseconds
    });
  };
  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 6000, // Time in milliseconds
    });
  };

  const makePaymentMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await AuthAxios({
          url: `/wbhk/association-payment/${refId}/confirm`,
          method: "GET",
        });
        console.log("res", response);
        return response.data;
      } catch (error) {
        setOpenDangerModal(true);
        setButtonDisabled(false);
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      notifySuccess(data?.message);
      setReceiptData(data?.data);
      setButtonDisabled(false);
      setShowReciept(true);
    },
    onError: (error) => {
      console.log(error);
      notifyError();
      setButtonDisabled(false);
    },
  });
  const handleMakePayment = () => {
    setButtonDisabled(true);
    makePaymentMutation.mutate();
  };

  console.log("receiptData", receiptData);
  return (
    <>
      {showReciept && (
        <Receipt setShowScreen={setShowScreen} receiptData={receiptData} />
      )}

      {!showReciept && (
        <>
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
                <span className="text-[#FF7F00] ml-1 leading-10">
                  {timeLeft ? (
                    <div className="text-1xl  space-x-4">
                      <span>{timeLeft.minutes || 0}m</span> :
                      <span>{timeLeft.seconds || 0}s</span>
                    </div>
                  ) : (
                    <div>Time's up!</div>
                  )}
                </span>
              </p>
            </div>

            <div className="w-full rounded-md p-3 border border-[#F2F2F2] mt-4 bg-[#FBFBFB]">
              <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
                <p className="font-normal text-[12px] text-[#535353 ]">
                  Account Name
                </p>
                <p className="font-[600] text-[14px] text-[#1e1e1e]">
                  {initiateBillData?.bankDetails?.accountName}
                </p>
              </div>
              <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
                <p className="font-normal text-[12px] text-[#535353 ]">
                  Account Number
                </p>
                <div className="w-full flex items-center gap-2">
                  <p className="font-[600] text-[14px] text-[#1e1e1e]">
                    {initiateBillData?.bankDetails?.accountNumber}
                  </p>

                  <div className="cursor-pointer relative" onClick={handleCopy}>
                    <img src={copy} alt="Copy icon" />

                    {/* Show "Copied!" message if isCopied is true */}
                    {isCopied && (
                      <span className="absolute left-12 text-green-500 font-bold text-xs bottom-[1px]">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
                <p className="font-normal text-[12px] text-[#535353 ]">
                  Bank Name
                </p>
                <p className="font-[600] text-[14px] text-[#1e1e1e]">
                  {initiateBillData?.bankDetails?.bankCode}
                </p>
              </div>
            </div>

            <div className="min-h-[50vh] flex items-end">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="font-[400] text-[17px] text-[#5e5e5e]">Total</p>
                  <p className="font-[500] text-[21px] text-[#1e1e1e]">
                    <FormattedPrice
                      amount={
                        parseInt(initiateBillData?.amount) +
                        parseInt(initiateBillData?.fees)
                      }
                    />
                  </p>
                </div>

                <div className="flex flex-col md:flex-row w-full md:w-[70%] gap-0 md:gap-3">
                  <Button
                    onClick={handleMakePayment}
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
                    {buttonDisabled ? (
                      <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                    ) : (
                      "Click here after transfer"
                    )}
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
                  Payment not confirmed , Retry.
                </p>
                <div className="flex flex-col md:flex-row w-full gap-3 mt-4">
                  <Button
                    onClick={handleMakePayment}
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
                    {buttonDisabled ? (
                      <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                    ) : (
                      "Try Again"
                    )}
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
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

export default Payment;
