import React, { useEffect, useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Modal,
  CircularProgress,
} from "@mui/material";
import FormattedPrice from "../components/FormattedPrice";
import { styled } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import ConfirmAssociationBill from "./create-association/ConfirmAssociationBill";
import Payment from "./create-association/Payment";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { AuthAxios } from "../helpers/axiosInstance";
import { common } from "@mui/material/colors";
import Receipt from "./create-association/Reciept";
const CreateAssociationBill = () => {
  const [studentName, setStudentName] = useState(null);
  const [nameError, setNameError] = useState("");
  const [departmentName, setDepartmentName] = useState(null);
  const [departmentError, setDepartmentError] = useState("");
  const [matricNo, setMatricNo] = useState(null);
  const [matricError, setMatricError] = useState("");
  const [email, setEmail] = useState(null);
  const [price, setPrice] = useState(null);
  const [comAmt, setComAmt] = useState(50);
  const [emailError, setEmailError] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [studentType, setStudentType] = useState("fresher");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [initiateBillData, setInitiateBillData] = useState(null);
  const [level, setLevel] = useState("200");
  const theme = useTheme();
  // const { id: associationBillId } = useParams();

  const location = useLocation();

  // Use URLSearchParams to parse the query string
  const params = new URLSearchParams(location.search);
  const associationBillId = params.get("id");

  const [showScreen, setShowScreen] = useState("create");
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const CustomRadio = styled(Radio)(({ theme }) => ({
    "&.Mui-checked": {
      color: "#333333",
    },
  }));

  useEffect(() => {
    console.log("CreateAssociationBill component mounted");
  }, []);

  const handleStudentTypeChange = (event) => {
    setStudentType(event.target.value);
    if (event.target.value === "fresher") {
      setLevel("");
    }
  };

  // fetch association bills data
  const fetchAssociationBillData = async ({ queryKey }) => {
    const [_key, { id }] = queryKey;
    try {
      const response = await AuthAxios.get(`/wbhk/association-payment/${id}`);
      return response?.data?.data;
    } catch (error) {
      throw new Error("Failed to fetch bill data");
    }
  };

  const {
    data: associationBillsData,
    error: assBErr,
    isLoading: assBLoading,
  } = useQuery({
    queryKey: ["fetchAssociationBillsData", { id: associationBillId }],
    queryFn: fetchAssociationBillData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  useEffect(() => {
    if (associationBillsData) {
      if (studentType === "fresher") {
        setPrice(associationBillsData?.prices[0]?.value);
      } else {
        setPrice(associationBillsData?.prices[1]?.value);
      }
    }
  }, [associationBillsData, studentType]);

  useEffect(() => {
    if (associationBillsData) {
      setDepartmentName(associationBillsData?.department);
    }
  }, [associationBillsData]);

  console.log("hello", associationBillsData);
  // fetch association bills data end
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };
  const handleNameChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setStudentName(value);

    if (!value) {
      setNameError("Please enter your first name");
    } else if (!/^[A-Za-z ]*$/i.test(value)) {
      setNameError("Please enter a valid first name");
    } else {
      setNameError("");
    }
  };
  const handleNameBlur = () => {
    if (!studentName) {
      setNameError("Please enter your first name");
    }
  };

  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setDepartmentName(value);

    if (!value) {
      setDepartmentError("Please enter your department");
    } else if (!/^[A-Za-z ]*$/i.test(value)) {
      setDepartmentError("Please enter a valid first department");
    } else {
      setDepartmentError("");
    }
  };
  const handleDepartmentChangeBlurr = () => {
    if (!departmentName) {
      setDepartmentError("Please enter your department");
    }
  };

  const handleMatricChange = (event) => {
    const value = event.target.value;
    setMatricNo(value);

    if (!value) {
      setMatricError("Please enter your matric no");
    } else {
      setMatricError("");
    }
  };

  const handleMatricBlurr = () => {
    if (!matricNo) {
      setMatricError("Please enter your matric no");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Please enter your email");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 6000, // Time in milliseconds
    });
  };

  const handleEmailBlurr = () => {
    if (!email) {
      setEmailError("Please enter email");
    }
  };

  const handlePhoneNoChangeBlurr = () => {
    if (!phoneNo) {
      setPhoneError("Please enter your phone number");
    }
  };

  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    if (!value) {
      setPhoneError("Please enter your phone number");
    } else if (!/^0([89][01]|70)\d{8}$/i.test(value)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
      a;
    }
  };

  const initatiatePaymentMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await AuthAxios({
          url: `/wbhk/association-payment/${associationBillId}`,
          method: "POST",
          data: formData,
        });

        return response.data;
      } catch (error) {
        console.log(error);
        setButtonDisabled(false);
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      console.log("data-ffr", data?.data);
      setInitiateBillData(data?.data);
      setShowScreen("confirm");
      setButtonDisabled(false);
    },
    onError: (error) => {
      console.log(error);
      setButtonDisabled(false);
    },
  });

  const handleInitiatePayment = () => {
    const payload = {
      status: studentType,
      level: studentType === "fresher" ? "100" : level,
      name: studentName,
      department: departmentName,
      matricNum: matricNo,
      phone: phoneNo,
      email: email,
    };

    if (
      studentName === null ||
      matricNo === null ||
      phoneNo === null ||
      email === null
    ) {
      notifyError("Please fill all fields.");
      return;
    }

    initatiatePaymentMutation.mutate(payload);
    setButtonDisabled(true);

    console.log("pay", payload);
  };
  const handleFormSubmit = () => {};

  return (
    <div className="w-full">
      {showScreen === "create" && (
        <div className="md:w-[70%] w-full mx-auto p-3 pr-9  md:p-3">
          {assBLoading ? (
            <CircularProgress size="1.2rem" sx={{ color: "#ff7f00" }} />
          ) : (
            <>
              <div className="flex items-center gap-3">
                <ArrowBackIosRoundedIcon sx={{ color: "#1e1e1e" }} />

                <p className="font-[600] text-[20px] text-[#1e1e1e]">
                  Association Bills
                </p>
              </div>

              <div className=" flex items-center gap-1 mt-4">
                <img src="" alt="schl-icon" />
                <p className="font-[500] text-[16px] text-[#1e1e1e]">
                  {associationBillsData?.billName}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 mt-8 w-full">
                <Grid container spacing={2} sx={{ width: "100%", mx: "auto" }}>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Student's Status
                      </Typography>
                      <RadioGroup
                        row
                        value={studentType}
                        onChange={handleStudentTypeChange}
                      >
                        <FormControlLabel
                          sx={{
                            pl: "8px",
                            pr: "16px",
                            border:
                              studentType === "fresher"
                                ? "2px solid #333333"
                                : "2px solid #d1d1d1",
                            borderRadius: "8px",
                            mr: "30px",
                          }}
                          value="fresher"
                          control={<CustomRadio />}
                          label="Fresher"
                        />
                        <FormControlLabel
                          sx={{
                            pl: "8px",
                            pr: "16px",
                            border:
                              studentType === "staylite"
                                ? "2px solid #333333"
                                : "2px solid #d1d1d1",
                            borderRadius: "8px",
                          }}
                          value="staylite"
                          control={<CustomRadio />}
                          label="Staylite"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {studentType === "staylite" && (
                    <Grid item xs={12} md={12}>
                      <FormControl
                        component="fieldset"
                        sx={{ padding: "10px", width: "100%" }}
                      >
                        <Typography
                          htmlFor="input"
                          sx={{
                            fontWeight: 400,
                            marginBottom: "2px",
                            fontSize: "16px",
                            color: "#1E1E1E",
                          }}
                        >
                          Level
                        </Typography>
                        <RadioGroup
                          row
                          value={level}
                          onChange={handleLevelChange}
                        >
                          <FormControlLabel
                            sx={{
                              pl: "8px",
                              pr: "16px",
                              border:
                                level === "200"
                                  ? "2px solid #333333"
                                  : "2px solid #d1d1d1",
                              borderRadius: "8px",
                              mb: !isTabletOrDesktop ? "10px" : "0px",
                            }}
                            value="200"
                            control={<CustomRadio />}
                            label="200 Level"
                          />
                          <FormControlLabel
                            sx={{
                              pl: "8px",
                              pr: "16px",
                              border:
                                level === "300"
                                  ? "2px solid #333333"
                                  : "2px solid #d1d1d1",
                              borderRadius: "8px",
                              mb: !isTabletOrDesktop ? "10px" : "0px",
                            }}
                            value="300"
                            control={<CustomRadio />}
                            label="300 Level"
                          />
                          <FormControlLabel
                            sx={{
                              pl: "8px",
                              pr: "16px",
                              border:
                                level === "400"
                                  ? "2px solid #333333"
                                  : "2px solid #d1d1d1",
                              borderRadius: "8px",
                              mb: !isTabletOrDesktop ? "10px" : "0px",
                            }}
                            value="400"
                            control={<CustomRadio />}
                            label="400 Level"
                          />
                          <FormControlLabel
                            sx={{
                              pl: "8px",
                              pr: "16px",
                              border:
                                level === "500"
                                  ? "2px solid #333333"
                                  : "2px solid #d1d1d1",
                              borderRadius: "8px",
                              mb: !isTabletOrDesktop ? "10px" : "0px",
                            }}
                            value="500"
                            control={<CustomRadio />}
                            label="500 Level"
                          />
                          <FormControlLabel
                            sx={{
                              pl: "8px",
                              pr: "16px",
                              border:
                                level === "600"
                                  ? "2px solid #333333"
                                  : "2px solid #d1d1d1",
                              borderRadius: "8px",
                            }}
                            value="600"
                            control={<CustomRadio />}
                            label="600 Level"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  )}
                  {/* First Column */}
                  <Grid item xs={12} md={6}>
                    <div className="flex flex-col gap-1 w-full">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Student's Name
                      </Typography>

                      <TextField
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                          },
                          mx: "auto",
                        }}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        value={studentName}
                        required
                        placeholder="Enter your full name"
                        variant="outlined"
                        InputProps={{}}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      {nameError && (
                        <span className="text-sm text-error_3">
                          {nameError}
                        </span>
                      )}
                    </div>
                  </Grid>

                  {/* Second Column */}
                  <Grid item xs={12} md={6}>
                    <div className="flex flex-col gap-1 w-full">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Department
                      </Typography>

                      <TextField
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                          },
                          mx: "auto",
                        }}
                        disabled
                        onChange={handleDepartmentChange}
                        onBlur={handleDepartmentChangeBlurr}
                        value={departmentName}
                        required
                        placeholder="Enter your department here"
                        variant="outlined"
                        InputProps={{}}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      {departmentError && (
                        <span className="text-sm text-error_3">
                          {departmentError}
                        </span>
                      )}
                    </div>
                  </Grid>
                  {/* Second Column */}
                  <Grid item xs={12} md={6}>
                    <div className="flex flex-col gap-1 w-full">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Matric Number
                      </Typography>

                      <TextField
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                          },
                          mx: "auto",
                        }}
                        onChange={handleMatricChange}
                        onBlur={handleMatricBlurr}
                        value={matricNo}
                        required
                        placeholder="Enter matric number"
                        variant="outlined"
                        InputProps={{}}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      {matricError && (
                        <span className="text-sm text-error_3">
                          {matricError}
                        </span>
                      )}
                    </div>
                  </Grid>
                  {/* Second Column */}
                  <Grid item xs={12} md={6}>
                    <div className="flex flex-col gap-1 w-full">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Email Address
                      </Typography>

                      <TextField
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                          },
                          mx: "auto",
                        }}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlurr}
                        value={email}
                        required
                        placeholder="Enter email"
                        variant="outlined"
                        InputProps={{}}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      {emailError && (
                        <span className="text-sm text-error_3">
                          {emailError}
                        </span>
                      )}
                    </div>
                  </Grid>
                  {/* Second Column */}
                  <Grid item xs={12} md={6}>
                    <div className="flex flex-col gap-1 w-full">
                      <Typography
                        htmlFor="input"
                        sx={{
                          fontWeight: 400,
                          marginBottom: "2px",
                          fontSize: "16px",
                          color: "#1E1E1E",
                        }}
                      >
                        Phone Number
                      </Typography>

                      <TextField
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                          },
                          mx: "auto",
                        }}
                        onChange={handlePhoneNoChange}
                        onBlur={handlePhoneNoChangeBlurr}
                        value={phoneNo}
                        required
                        placeholder="Enter Phone Number"
                        variant="outlined"
                        InputProps={{}}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                      {phoneError && (
                        <span className="text-sm text-error_3">
                          {phoneError}
                        </span>
                      )}
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div className="w-full border-slate-300 p-3 flex flex-col gap-3 border bg-[#FBFBFB] my-6">
                      <div className="flex justify-between items-center ">
                        <p className="text-[#535353] font-[400] text-[12px]">
                          You are Paying
                        </p>
                        <p className="text-[#1E1E1E] font-[600] text-[14px]">
                          <FormattedPrice amount={price} />
                        </p>
                      </div>
                      <div className="flex justify-between items-center ">
                        <p className="text-[#535353] font-[400] text-[12px]">
                          Service charge
                        </p>
                        <p className="text-[#1E1E1E] font-[600] text-[14px]">
                          <FormattedPrice amount={comAmt} />
                        </p>
                      </div>

                      <Divider sx={{ width: "100%" }} />

                      <div className="flex justify-between items-center ">
                        <p className="text-[#535353] font-[400] text-[16px]">
                          Total
                        </p>
                        <p className="text-[#1E1E1E] font-[600] text-[16px]">
                          <FormattedPrice
                            amount={parseInt(price) + parseInt(comAmt)}
                          />
                        </p>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <Button
                      onClick={handleInitiatePayment}
                      sx={{
                        background: "#333333",
                        width: "100%",
                        padding: "10px, 16px, 10px, 16px",
                        mb: "2rem",
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
                        <CircularProgress
                          size="1.2rem"
                          sx={{ color: "white" }}
                        />
                      ) : (
                        "Proceed"
                      )}
                    </Button>{" "}
                  </Grid>
                </Grid>
              </div>
            </>
          )}
        </div>
      )}

      {showScreen === "confirm" && (
        <ConfirmAssociationBill
          initiateBillData={initiateBillData}
          setShowScreen={setShowScreen}
        />
      )}

      {showScreen === "payment" && (
        <Payment
          initiateBillData={initiateBillData}
          setShowScreen={setShowScreen}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default CreateAssociationBill;
