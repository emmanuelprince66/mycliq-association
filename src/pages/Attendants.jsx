import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Modal, Grid } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { styled } from "@mui/material/styles";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import Performance from "../components/Performance";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";
import successIcon from "../assets/successIcon.svg";
import AllAttendants from "../components/AllAttendants";
import NewAttendants from "../components/NewAttendants";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
// import snakeRed from "../assets/snakeRed.svg";
// import snake from "../assets/snake.svg";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  border: "1px solid #E0E0E0",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  height: "160vh",
}));
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

const Attendants = () => {
  const [showAttendants, setShowAttendants] = useState("new");
  const [show, setShow] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose1 = () => setOpen1(false);

  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2.5}>
            <Item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  onClick={() => setShowAttendants("new")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: showAttendants === "new" && "#FFEBED",
                    width: "100%",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    mt: "1rem",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                >
                  {showAttendants === "new" && (
                    <Box
                      sx={{
                        height: "40px",
                        minWidth: "4px",
                        background: showAttendants && "#DC0019",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    ></Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      alignItems: "center",
                      gap: "12px",
                      color: showAttendants === "new" ? "#DC0019" : "#828282",
                    }}
                  >
                    <AddRoundedIcon />

                    <Typography
                      sx={{
                        fomtWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      New Attendants
                    </Typography>
                  </Box>
                </Box>

                <Box
                  onClick={() => setShowAttendants("all")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: showAttendants === "all" && "#FFEBED",
                    width: "100%",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    mt: "1rem",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                >
                  {showAttendants === "all" && (
                    <Box
                      sx={{
                        height: "40px",
                        minWidth: "4px",
                        background: !show && "#DC0019",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    ></Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      alignItems: "center",
                      gap: "16px",
                      mr: showAttendants === "all" ? "20px" : "14px",
                      color: showAttendants === "all" ? "#DC0019" : "#828282",
                    }}
                  >
                    <AccountBoxRoundedIcon />

                    <Typography
                      sx={{
                        fomtWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      All Attendants
                    </Typography>
                  </Box>
                </Box>
                <Box
                  onClick={() => setShowAttendants("per")}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: showAttendants === "per" && "#FFEBED",
                    width: "100%",
                    "&:hover": {
                      cursor: "pointer",
                    },
                    mt: "1rem",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                >
                  {showAttendants === "per" && (
                    <Box
                      sx={{
                        height: "40px",
                        minWidth: "4px",
                        background: showAttendants && "#DC0019",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    ></Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      alignItems: "center",
                      gap: "16px",
                      mr: !show ? "20px" : "14px",
                      color: showAttendants === "per" ? "#DC0019" : "#828282",
                    }}
                  >
                    {showAttendants === "per" ? (
                      <CloseFullscreenRoundedIcon />
                    ) : (
                      <CloseFullscreenRoundedIcon />
                    )}

                    <Typography
                      sx={{
                        fomtWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Performance
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={9.5}>
            <Item>
              {showAttendants === "new" ? (
                <NewAttendants />
              ) : showAttendants === "all" ? (
                <AllAttendants />
              ) : (
                <Performance />
              )}
            </Item>
          </Grid>
        </Grid>

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
                  fontWeight: "900",
                  color: "#1E1E1E",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Sure to Proceed
              </Typography>

              <Box onClick={handleClose2}>
                <CloseRoundedIcon />
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
                Are you sure you want to register a new attendant?
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
                    "Yes, Register"
                  ) : (
                    <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        {/* Modal ends */}

        {/* Modal for create bill*/}

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
                <CloseRoundedIcon />
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
      </Box>
    </div>
  );
};

export default Attendants;
