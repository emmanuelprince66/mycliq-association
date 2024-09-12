import React, { useState } from "react";
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
} from "@mui/material";
import FormattedPrice from "../components/FormattedPrice";
import { styled } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";

const CreateAssociationBill = () => {
  const [studentName, setStudentName] = useState(null);
  const [nameError, setNameError] = useState("");
  const [departmentName, setDepartmentName] = useState(null);
  const [departmentError, setDepartmentError] = useState("");
  const [matricNo, setMatricNo] = useState(null);
  const [matricError, setMatricError] = useState("");
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [studentType, setStudentType] = useState("fresher");
  const [level, setLevel] = useState("");
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const CustomRadio = styled(Radio)(({ theme }) => ({
    "&.Mui-checked": {
      color: "#333333",
    },
  }));
  const handleStudentTypeChange = (event) => {
    setStudentType(event.target.value);
    if (event.target.value === "fresher") {
      setLevel("");
    }
  };

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
    }
  };

  const handleFormSubmit = () => {
    const payload = {
      type: studentType,
      level: level,
      studentName: studentName,
      departmentName: departmentName,
      matricNo: matricNo,
      phoneNo: phoneNo,
      email: email,
    };
  };

  return (
    <div className="w-full">
      <div className="md:w-[70%] w-full mx-auto p-3  md:p-3">
        <div className="flex items-center gap-3">
          <ArrowBackIosRoundedIcon sx={{ color: "#1e1e1e" }} />

          <p className="font-[600] text-[20px] text-[#1e1e1e]">
            Association Bills
          </p>
        </div>

        <div className=" flex items-center gap-1 mt-4">
          <img src="" alt="schl-icon" />
          <p className="font-[500] text-[16px] text-[#1e1e1e]">
            Agricultural Economics Students Association (AECOSA)
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 mt-8">
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" sx={{ padding: "10px" }}>
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
                  <RadioGroup row value={level} onChange={handleLevelChange}>
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
                  <span className="text-sm text-error_3">{nameError}</span>
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
                  <span className="text-sm text-error_3">{matricError}</span>
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
                  <span className="text-sm text-error_3">{emailError}</span>
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
                {phoneNo && (
                  <span className="text-sm text-error_3">{phoneNo}</span>
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
                    <FormattedPrice amount={20000} />
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="text-[#535353] font-[400] text-[12px]">
                    Service charge
                  </p>
                  <p className="text-[#1E1E1E] font-[600] text-[14px]">
                    <FormattedPrice amount={100} />
                  </p>
                </div>

                <Divider sx={{ width: "100%" }} />

                <div className="flex justify-between items-center ">
                  <p className="text-[#535353] font-[400] text-[16px]">Total</p>
                  <p className="text-[#1E1E1E] font-[600] text-[16px]">
                    <FormattedPrice amount={21000} />
                  </p>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Button
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
                Proceed
              </Button>{" "}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CreateAssociationBill;
