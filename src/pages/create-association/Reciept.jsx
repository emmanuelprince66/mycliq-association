import React from "react";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { Divider, Button } from "@mui/material";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../assets/images/admin/url/logo.svg";

import {
  Card,
  Box,
  Container,
  Typography,
  CircularProgress,
  modalClasses,
} from "@mui/material";
import FormattedPrice from "../../components/FormattedPrice";

import { useNavigate } from "react-router-dom";

const Receipt = ({
  formToSubmitData,
  formDataObj,
  realData,
  receiptData,
  setShowScreen,
}) => {
  const [pdfBlob, setPdfBlob] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const [serviceCharge, setServiceCharge] = useState(50);

  console.log("receipt recipt data is", receiptData);

  const navigate = useNavigate();

  const currentTheme = useTheme();
  const value = realData?.id;

  const generatePDF = async () => {
    const receiptContent = document.querySelector("#receipt");
    const canvas = await html2canvas(receiptContent);
    const imgData = canvas.toDataURL("image/jpeg"); // Corrected "toDataUrl" to "toDataURL"

    const blob = dataURLtoBlob(imgData);
    setPdfBlob(blob);
  };
  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(",");
    const byteString = atob(parts[1]); // Corrected "parst" to "parts"
    const mimeString = parts[0].split(":")[1]; // Corrected mimeString extraction

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeString });
  };
  // const handleDownload2 = () => {
  //   // Select the element with ID "receipt"
  //   const receipt = document.querySelector("#receipt");

  //   // Scroll the content to the bottom of the page to capture all content
  //   const scrollToBottom = () => {
  //     receipt.scrollTo({
  //       top: receipt.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   };

  //   // Wait for scrolling to complete before capturing the content
  //   const captureContent = () => {
  //     html2canvas(receipt, { useCORS: true, dpi: 150 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/jpeg", 0.8);

  //       const pdf = new jsPDF({
  //         orientation: "portrait",
  //         unit: "pt",
  //         format: [canvas.width * 0.75, canvas.height * 0.75],
  //       });

  //       pdf.addImage(
  //         imgData,
  //         "JPEG",
  //         0,
  //         0,
  //         canvas.width * 0.75,
  //         canvas.height * 0.75
  //       );

  //       pdf.save("receipt.pdf");
  //     });
  //   };

  //   // Trigger scrolling and then capture the content after a delay
  //   scrollToBottom();
  //   setTimeout(captureContent, 1000); // Adjust the delay if necessary
  // };

  // Select the element with ID "receipt"
  //   const receipt = document.querySelector("#receipt");

  //   // Calculate appropriate padding based on screen size
  //   const paddingAtTop = window.innerWidth < 600 ? 300 : 120; // Adjust as needed

  //   // Convert the element to a JPEG image using html2canvas
  //   html2canvas(receipt, { useCORS: true, dpi: 150 }).then((canvas) => {
  //     // Get the image data URL from the canvas with JPEG format and quality
  //     const imgData = canvas.toDataURL("image/jpeg", 1); // Keep maximum quality

  //     // Create a new jsPDF instance with customized page size
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "pt",
  //       format: [canvas.width * 0.75 + 80, canvas.height * 0.75 + paddingAtTop],
  //     });

  //     // Add the image to the PDF with increased padding at the top
  //     pdf.addImage(
  //       imgData,
  //       "JPEG",
  //       40, // Padding on the left side
  //       paddingAtTop, // Padding at the top (dynamically adjusted)
  //       canvas.width * 0.75,
  //       canvas.height * 0.75
  //     );

  //     // Save the PDF with the name "receipt.pdf"
  //     pdf.save("receipt.pdf");
  //   });
  // };

  const handleDownload2 = () => {
    const receipt = document.querySelector("#receipt");

    const scrollToBottom = () => {
      receipt.scrollTo({
        top: receipt.scrollHeight,
        behavior: "smooth",
      });
    };

    const captureContent = () => {
      html2canvas(receipt, { useCORS: true, dpi: 150 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: [canvas.width * 0.75, canvas.height * 0.75],
        });

        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          canvas.width * 0.75,
          canvas.height * 0.75
        );

        pdf.save("receipt.pdf");
      });
    };

    // Trigger scrolling with a longer delay and then capture the content
    setTimeout(scrollToBottom, 2000); // Adjust the delay before scrolling
    setTimeout(captureContent, 4000); // Adjust the delay before capturing the content
  };

  const formattedTime = (oldTime) => {
    const dateTimeString = oldTime;
    const dateTime = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedString = dateTime
      .toLocaleString("en-US", options)
      .replace(/, /g, " | ");

    return formattedString;
  };

  function formatTime(inputTime) {
    const date = new Date(inputTime);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours() % 12 || 12).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${month}-${day}-${year} at ${hour}:${minute} ${ampm}`;
  }

  //   const qrcodeUrl = receiptData ? receiptData : ""

  return (
    <Box
      sx={{
        maxWidth: "31%",
        mx: "auto",
        minWidth: { xs: "100%", sm: "100%", md: "31%" },
      }}
    >
      <Container
        sx={{
          padding: "1rem",
          position: "relative",
          maxHeight: "20%",
        }}
      >
        <Box
          id="receipt"
          sx={{
            p: "0.5rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img src={logo} className="w-[500px] h-[500px]" alt="l-d" />
            </Box>

            <Box
              sx={{
                position: "relative",
                zIndex: "2",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    mb: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      width: "20%",
                      height: "20%",
                      padding: "0.5rem 0.6rem",
                      border: "1px solid #E1E1E1",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <img
                      src={
                        formDataObj?.association?.toLowerCase() === "hortsso"
                          ? hortsso
                          : formDataObj?.association?.toLowerCase() ===
                            "plabsta"
                          ? plabsta
                          : formDataObj?.association === "ÀRÀ"
                          ? ara
                          : formDataObj?.association?.toLowerCase() ===
                            "croppsa"
                          ? croppsa
                          : ""
                      }
                      className="gif-img"
                      alt="schl-logo"
                    /> */}
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "20px",
                      }}
                    >
                      {realData?.bill?.association?.name}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "0.5rem 0 0.5rem 0",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "16px",
                      color: "#C57600",
                    }}
                  >
                    PAYMENT RECEIPT
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "10px",
                      color: "#000",
                      textAlign: "right",
                      flex: "1",
                    }}
                  >
                    {realData?.bill?.association?.id}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    background: "#FFEDED",
                    p: "10px",
                    mt: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "12px",
                      color: "#000",
                      textAlign: "left",
                    }}
                  >
                    PAYER INFORMATION
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                      mb: "0.2rem",
                      gap: "33px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Student's Name
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "37px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Matric Number
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.matricNum}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "52px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Department
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.department}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "33px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Student's Status
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.status}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "89px",
                      mb: "0.2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Level
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.level}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "42px",
                      mb: "0.2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Email Address
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.email}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "39px",
                      mb: "0.2rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Phone Number
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.phoneNumber}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    background: "#FFEDED",
                    p: "10px",
                    mt: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "12px",
                      color: "#000",
                      textAlign: "left",
                    }}
                  >
                    PAYMENT DETAILS
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    mt: "1rem",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "51px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Date & Time
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                      }}
                    >
                      {formatTime(receiptData?.createdAt)}
                    </Typography>
                  </Box>

                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "62px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Institution
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        width: "107px",
                        textAlign: "left",
                      }}
                    >
                      {formDataObj?.institution}
                    </Typography>
                  </Box> */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "55px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Association
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,

                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.biller}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "41px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Payment Type
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,

                        textAlign: "left",
                      }}
                    >
                      {receiptData?.recipientDetails?.association?.billType}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "0.2rem",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      className="w-[144px] md:w-[100px]"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: "#727272",
                      }}
                    >
                      Service Description
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 600,
                        textAlign: "left",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {receiptData?.description}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    mt: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      maxWidth: "50%",
                      height: "9rem",
                      flex: "1",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        background: "#FFEDED",
                        p: "10px",
                        mt: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: "12px",
                          color: "#000",
                          textAlign: "left",
                        }}
                      >
                        PAYMENT SUMMARY
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "0.2rem",
                        mt: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#727272",
                        }}
                      >
                        Amount
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 600,
                        }}
                      >
                        <FormattedPrice amount={receiptData?.amount} />
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "0.2rem",
                        pb: "0.5rem",
                        borderBottom: "1px solid grey",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 400,
                          color: "#727272",
                        }}
                      >
                        Service Charge
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontWeight: 600,
                        }}
                      >
                        <FormattedPrice amount={serviceCharge} />
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: "0.2rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#727272",
                        }}
                      >
                        Total Amount
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        <FormattedPrice
                          amount={parseInt(receiptData?.amount) + serviceCharge}
                        />
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          currentTheme.palette.type === "light"
                            ? "#000"
                            : "#fff",
                        fontWeight: "900",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    >
                      Scan to Verify
                    </Typography>

                    <Box
                      sx={{
                        background: "#fff",
                        borderRadius: "8px",
                        border: "2px solid #F8F8F8",
                        padding: "1rem",
                        borderRadius: "8px",
                      }}
                    >
                      {receiptData && (
                        <QRCode
                          size={256}
                          style={{ height: "7rem", width: "7rem" }}
                          value={receiptData?.ref}
                          viewBox={`0 0 256 256`}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    my: "2rem",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 400,
                        mb: "10px",
                      }}
                    >
                      Kindly note that the receipt is only valid upon
                      verification by association.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      background: "#f8f8f8",
                      padding: "1rem",
                      width: "100%",
                      textAlign: "center",
                      margin: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ededed",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                    >
                      Powered By
                    </Typography>

                    <Box
                      sx={{
                        ml: "1rem",
                        mb: "0.2rem",
                      }}
                    >
                      <Box
                        sx={{
                          width: "45%",
                          overflowX: "hidden",
                          margin: "auto",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        {/* <img src={checkLogo} alt="c-logo" /> */}
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#DC0019",
                        letterSpacing: "3px",
                      }}
                    >
                      MyCliq App.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: "90%",
            display: "flex",
            justifyContent: "ce2ter",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "10px",
            position: "absolute",
          }}
        >
          <Button
            onClick={handleDownload2}
            sx={{
              padding: "10px",
              borderRadius: "8px",
              color: "#fff",
              width: "100%",
              mb: "1.5rem",
              background: "#333333",
              "&:hover": {
                background: "#333333",
              },
            }}
          >
            Download receipt
          </Button>
          <Button
            onClick={() => setShowScreen("create")}
            sx={{
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              mb: "1.5rem",
              borderColor: "#333333",
              color: "#000",
              "&:hover": {},
            }}
            variant="outlined"
          >
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Receipt;
