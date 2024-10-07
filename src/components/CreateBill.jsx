import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import seperator from "../assets/seperator.svg";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import exLogo from "../assets/exLogo.svg";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import closeIcon from "../assets/images/closeIcon.svg";
import successIcon from "../assets/successIcon.svg";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import { AuthAxios } from "../helpers/axiosInstance";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  width: "640px",
  bgcolor: "background.paper",
  p: 3,
};
const CreateBill = () => {
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [dateToBeSent, setDateToBeSent] = useState(new Date());
  const [billName, setBillName] = useState("");
  const [billersName, setBillersName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [fresherAmount, setFresherAmount] = useState("");

  const [url, setUrl] = useState("");
  const [staylitesAmount, setStaylitesAmount] = useState("");
  const [focusBorder, setFocusBorder] = useState("");
  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formDisabled, setFormDisabled] = React.useState(true);
  const [formContent, setFormContent] = React.useState({});
  const handleClose1 = () => setOpen1(false);
  const [copySuccess, setCopySuccess] = useState("");

  function resetForm() {
    setBillName("");
    setStaylitesAmount("");
    setFresherAmount("");
    setPickedDate(new Date());
    setFormContent({});
  }

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
  const createBill = async () => {
    setLoading(true);
    try {
      const payload = {
        billName: formContent.billName,
        faculty: formContent.facultyName,
        department: formContent.departmentName,
        billerName: formContent.billersName,
        prices: [
          {
            type: "fresher",
            value: Number(formContent.fresherAmount),
          },
          {
            type: "staylite",
            value: Number(formContent.stayliteAmount),
          },
        ],
      };
      const response = await AuthAxios.post(
        "merchant/bill/association",
        payload
      );
      console.log("res", response);

      console.log(response?.data?.data);

      setLoading(false);
      setOpen1(true);
      setOpen2(false);
      reset();
    } catch (error) {
      console.log(error);
      notifyError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  useEffect(() => {
    const formFilled =
      billName !== "" && fresherAmount !== "" && staylitesAmount !== "";
    if (formFilled) {
      setFormDisabled(false);
    }
  }, [billName, fresherAmount, staylitesAmount]);

  const handleFormSubmit = (value) => {
    console.log(value);
    setFormContent(value);
    console.log(pickedDate);
    const dateForForm = new Date(pickedDate).toISOString();
    console.log(dateForForm);
    setDateToBeSent(dateForForm);
    setOpen2(true);
  };

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Typography
        sx={{
          fomtWeight: "500",
          fontSize: "20px",
          color: "#1E1E1E",
          lineHeight: "30px",
          mb: "1rem",
        }}
      >
        Create a New Bill
      </Typography>
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "16px",
          color: "#828282",
          mb: "1rem",
          lineHeight: "22.4px",
        }}
      >
        Fill in the required information to create a new bill. Bills you
        successfully create will automatically go live. You can manage them
        under “existing Bills”.
      </Typography>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=" w-full md:w-4/5 lg:w-3/5 m-auto"
      >
        <Box>
          <Stack>
            <Box
              sx={{
                textAlign: "left",
                mb: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Billers Name
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("billersName", {
                  required: "billersName is required",
                })}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                placeholder="Enter  billers name"
                variant="outlined"
                id="email-input"
                onChange={(e) => setBillersName(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <ReceiptLongRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                textAlign: "left",
                mb: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Faculty Name
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("facultyName", {
                  required: "Faculty name is required",
                })}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                placeholder="Enter faculty name"
                variant="outlined"
                id="email-input"
                onChange={(e) => setFacultyName(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <ReceiptLongRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                textAlign: "left",
                mb: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Department Name
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("departmentName", {
                  required: "Department name is required",
                })}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                placeholder="Enter department name"
                variant="outlined"
                id="email-input"
                onChange={(e) => setDepartmentName(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <ReceiptLongRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
          </Stack>
          <Stack>
            <Box
              sx={{
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Bill Name
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("billName", {
                  required: "billName is required",
                })}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                placeholder="Enter a new bill name"
                variant="outlined"
                id="email-input"
                onChange={(e) => setBillName(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <ReceiptLongRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
          </Stack>

          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="nowrap"
          >
            <Box
              sx={{
                width: "100%",
                mt: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Amount for
                </Typography>
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#C57600",
                    mb: "10px",
                  }}
                >
                  Freshers
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("fresherAmount", {
                  required: "fresherAmount is required",
                })}
                onChange={(e) => setFresherAmount(e)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                // helperText={emailError && <span>{emailError}</span>}
                placeholder="e.g 5,000"
                variant="outlined"
                id="email-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <PaymentsRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#1E1E1E",
                    mb: "10px",
                  }}
                >
                  Amount for
                </Typography>
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 600,
                    marginBottom: "1ch",
                    fontSize: "16px",
                    color: "#C57600",
                    mb: "10px",
                  }}
                >
                  Staylites
                </Typography>
                <Box
                  sx={{
                    color: "#C57600",
                    fontWeight: 600,
                    ml: "-0.2rem",
                  }}
                >
                  *
                </Box>
              </Box>

              <TextField
                {...register("stayliteAmount", {
                  required: "stayliteAmount is required",
                })}
                onChange={(e) => setStaylitesAmount(e)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#CACACA", // Set the desired border color here
                    },
                    "&:hover fieldset": {
                      borderColor: "#CACACA", // Set the border color on hover here
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#C57600", // Set the border color on focus here
                    },
                  },
                }}
                required
                // helperText={emailError && <span>{emailError}</span>}
                placeholder="e.g. 3,500"
                variant="outlined"
                id="email-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <ReceiptLongRoundedIcon /> &nbsp;&nbsp;
                      <img src={seperator} alt="s-icon" />
                      &nbsp;&nbsp;
                    </InputAdornment>
                  ),
                }}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </Box>
            {/* <Item>Item 2</Item> */}
          </Stack>
          {/* <Stack>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                mt: "1rem",
              }}
            >
              <Typography
                htmlFor="input"
                sx={{
                  fontWeight: 600,
                  marginBottom: "1ch",
                  fontSize: "16px",
                  color: "#1E1E1E",
                  mb: "10px",
                }}
              >
                Bill Expiry Date
              </Typography>
            </Box>

            <div className="flex items-center w-full border border-[#CACACA] rounded-md p-2 h-full">
              <div className="mr-2">
                <IconButton>
                  <CalendarMonthRoundedIcon className="text-gray-500" />
                </IconButton>
              </div>
              <div className="border-l w-full pl-2">
                <DatePicker
                  className="h-full w-full min-h-[40px] border-none p-0 outline-none"
                  wrapperClassName="w-full"
                  selected={pickedDate}
                  onFocus={() => setFocusBorder(true)}
                  onChange={(date) => setPickedDate(date)}
                />
              </div>
            </div>
          </Stack> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              my: "1rem",
            }}
          >
            <Box>
              <img src={exLogo} alt="ex-logo" />
            </Box>

            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "12px",
                color: "#CDA11E",
                lineHeight: "18px",
              }}
            >
              You automatically stop receiving payment when bill expires. You
              can extend expiry date under “existing Bills.
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
            }}
          ></Box>
        </Box>
        <Button
          type="submit"
          disabled={formDisabled}
          sx={{
            background: "#dc0019",
            padding: "10px",
            borderRadius: "8px",
            gap: "6px",
            textTransform: "capitalize",
            width: "100%",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#dc0019",
            },
          }}
        >
          <AddRoundedIcon /> Create a New Bill
        </Button>
      </form>

      {/* Modal for create bill*/}

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          sx: {
            border: "none", // Remove the border
            boxShadow: "none", // Remove the box shadow
          },
        }}
      >
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
              Sure to Create a New Bill
            </Typography>

            <Box onClick={handleClose2}>
              <img src={closeIcon} alt="c-icon" />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: "2rem",
              mb: "1.5rem",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "16px",
                color: "#4F4F4F",
                lineHeight: "24px",
              }}
            >
              Are you sure you want to create the new bill{" "}
              {`"${formContent.billName}"`}?
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "25px",
                mt: "2rem",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #dc0019",
                  color: "#dc0019",
                  borderColor: "#dc0019",
                  "&:hover": {
                    borderColor: "#dc0019",
                  },
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={createBill}
                sx={{
                  background: "#dc0019",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#dc0019",
                  },
                }}
              >
                {!loading ? (
                  "Yes, Create"
                ) : (
                  <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* Modal ends */}

      {/* Modal for create bill sucess*/}

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
              Successful
            </Typography>

            <Box onClick={handleClose1}>
              <img src={closeIcon} alt="c-icon" />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: "2rem",
              mb: "1.9rem",
            }}
          >
            <Box>
              <img src={successIcon} alt="success-icon" />
            </Box>

            <Typography
              sx={{
                fomtWeight: "400",
                fontSize: "16px",
                color: "#4F4F4F",
                lineHeight: "24px",
              }}
            >
              New bill created successfully and is now live!
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              mb: "-0.7rem",
            }}
          >
            <Button
              onClick={() => setOpen1(false)}
              sx={{
                background: "#dc0019",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#dc0019",
                },
              }}
            >
              Okay
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Modal ends */}

      <ToastContainer />
    </Box>
  );
};

export default CreateBill;
