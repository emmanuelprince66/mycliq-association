import React, { useState, useEffect } from "react";
import colorContact from "../assets/colorContact.svg";
import Badge from "@mui/material/Badge";
import {
  Box,
  Button,
  Modal,
  Typography,
  responsiveFontSizes,
} from "@mui/material";
import { Switch } from "@mui/material";
import { AuthAxios } from "../helpers/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fillBills } from "../utils/store/merchantSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import closeIcon from "../assets/images/closeIcon.svg";
import { ToastContainer, toast } from "react-toastify";

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
const ExistingBill = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [checkedSuccess, setCheckedSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [url, setUrl] = useState("");

  const [copySuccess, setCopySuccess] = useState({}); // State to track copy status per item

  const { userDetails, bills } = useSelector((state) => state);
  const [urlId, setUrlId] = useState("");
  const rowsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);

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

  const fetchExistingData = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey;
    try {
      const response = await AuthAxios.get(
        `/merchant/bill/association?page=${page}&limit=${limit}&type=user`
      );
      return response?.data?.data;
    } catch (error) {
      throw new Error("Failed to fetch customer data");
    }
  };

  const {
    data: ExistingBills,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["AllExistingBills", { page: currentPage, limit: rowsPerPage }],
    queryFn: fetchExistingData,
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  console.log("eee", ExistingBills);
  const totalPages = ExistingBills?.totalPages || "";

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  function modExpiryDate(value) {
    // Check if the value is defined and is a string
    if (!value || typeof value !== "string") {
      // Return an empty string or any fallback if the value is invalid
      return "";
    }

    // Split the string and reverse the date components
    const res = value.split("-");
    const newDate = res.reverse().join("-");
    return newDate;
  }

  function checkIfLive(value) {
    let date = new Date(value);
    const currentDate = new Date();
    if (date > currentDate) {
      return "live";
    } else {
      return null;
    }
  }

  const disableBillMutatation = useMutation({
    mutationFn: async () => {
      try {
        const response = await AuthAxios({
          url: `/merchant/bill/association/${urlId}/suspend`,
          method: "PATCH",
        });

        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      notifySuccess(data?.message);
      refetch();
      setButtonDisabled(false);
      setOpen2(false);
    },
    onError: (error) => {
      console.log(error);
      setButtonDisabled(false);
      setOpen2(false);
    },
  });

  const sortedData = ExistingBills
    ? ExistingBills?.records?.filter((item) => item?.isActive === true)
    : [];

  const handleOpenIniModal = (id) => {
    setOpen2(true);
    setUrlId(id);
  };

  const handleDisable = () => {
    disableBillMutatation.mutate();
    setButtonDisabled(true);
  };
  async function checkBill(e, i) {
    const disabledStatus = bills[i].isDisabled ? false : true;

    try {
      const response = await AuthAxios.patch(
        `/association-bill/${bills[i].id}`,
        { isDisabled: disabledStatus }
      );
      setCheckedSuccess(!checkedSuccess);
      console.log(response);
      if (response.status === 200) {
        setLoading(true);
        fetchBills();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const copyToClipboard = (url, id) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopySuccess((prev) => ({
          ...prev,
          [id]: "Copied!", // Set copy success for specific item
        }));
        setTimeout(() => {
          setCopySuccess((prev) => ({
            ...prev,
            [id]: "", // Reset message for specific item after 2 seconds
          }));
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "1rem",
        minHeight: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            color: "#1E1E1E",
            lineHeight: "30px",
          }}
        >
          Manage Existing Bills
        </Typography>

        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "12px",
            width: "24px",
            padding: "2px 8px 2px 8px",
            borderRadius: "8px",
            background: "#FFEFD6",
            height: "22px",
          }}
        >
          {ExistingBills?.totalRecords}
        </Typography>
      </Box>
      {isLoading ? (
        <CircularProgress
          size="5.2rem"
          sx={{ color: "#DC0019", marginLeft: "50%", marginTop: "5em" }}
        />
      ) : sortedData?.length > 0 ? (
        sortedData?.map((item, i) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                borderBottom: "1px solid #E0E0E0",
                pb: "1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  mt: "2rem",
                }}
              >
                <Box
                  sx={{
                    pb: "4px",
                  }}
                >
                  <img src={colorContact} alt="c-contact" />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "start",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#000000",
                      }}
                    >
                      {item.billName}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "12px",
                        width: "54px",
                        padding: "2px 8px 2px 8px",
                        borderRadius: "8px",
                        background: "#FFEFD6",
                        height: "22px",
                      }}
                    >
                      {item?.isActive && "Active"}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        padding: "2px 8px 2px 8px",
                        background:
                          checkIfLive(item.expiryDate) === "live"
                            ? "#EBFFF3"
                            : "",
                        borderRadius: "8px",
                      }}
                    >
                      {checkIfLive(item.expiryDate)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "3px",
                    }}
                  >
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      Created {modDate(item.createdAt)} |
                    </Typography>
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      Expires {modExpiryDate(item.expiryDate)} |
                    </Typography>
                    <Typography
                      htmlFor="input"
                      sx={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#828282",
                        mb: "10px",
                      }}
                    >
                      1,090 Paid, 789 Verified
                    </Typography>
                  </Box>
                  <div className="w-full cursor-pointer">
                    <div className="flex items-center gap-2 ">
                      <p className="text-[#1e1e1e]">URL:</p>
                      <p className="text-[#1e1e1e]">{`https://mycliq-association-two.vercel.app/create-association/${item?.id}`}</p>{" "}
                    </div>
                    {/* Display the dynamic URL */}
                    <button
                      className="bg-blue-500 text-white p-1 text-[10px] rounded-md mt-2 hover:bg-blue-600"
                      onClick={() =>
                        copyToClipboard(
                          `https://mycliq-association-two.vercel.app/create-association/${item?.id}`,
                          item?.id
                        )
                      }
                    >
                      Copy
                    </button>
                    {copySuccess[item?.id] && <p>{copySuccess[item?.id]}</p>}
                  </div>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Typography
                  htmlFor="input"
                  sx={{
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "#1E1E1E",
                  }}
                >
                  Stop Accepting Payments
                </Typography>

                <Box sx={{}}>
                  <Button
                    onClick={() => handleOpenIniModal(item?.id)}
                    sx={{
                      background: "#dc0019",
                      fontSize: "10px",
                      borderRadius: "8px",
                      py: "3px",
                      px: "0",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#dc0019",
                      },
                    }}
                  >
                    Yes
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography sx={{ paddingBlock: "1em" }} fontWeight={600}>
          {" "}
          No Bills yet!. Create a bill to see one.{" "}
        </Typography>
      )}{" "}
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
              Disable Bill
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
              Are you sure you want to stop accepting payment?{" "}
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
                onClick={handleDisable}
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
                {buttonDisabled ? (
                  <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                ) : (
                  "Yes, Stop"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* Modal ends */}
      <ToastContainer />
    </Box>
  );
};

export default ExistingBill;
