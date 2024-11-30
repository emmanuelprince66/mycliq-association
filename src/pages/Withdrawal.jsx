import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import CreateBill from "../components/CreateBill";
import ExistingBill from "../components/ExistingBill";
import WithdrawFunds from "../components/WithdrawFunds";
import WithdrawHistory from "../components/WithdrawHistory";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  border: "1px solid #E0E0E0",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  height: "100vh",
}));
const Withdrawal = () => {
  const [showCreateBill, setShowCreateBill] = useState(true);

  return (
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
                onClick={() => setShowCreateBill(true)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: showCreateBill && "#FFEBED",
                  width: "100%",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  mt: "1rem",
                  height: "40px",
                  borderRadius: "8px",
                }}
              >
                {showCreateBill && (
                  <Box
                    sx={{
                      height: "40px",
                      minWidth: "4px",
                      background: showCreateBill && "#333333",
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
                    color: showCreateBill ? "#333333" : "#828282",
                  }}
                >
                  <ArrowOutwardRoundedIcon />

                  <Typography
                    sx={{
                      fomtWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Withdraw Funds
                  </Typography>
                </Box>
              </Box>

              <Box
                onClick={() => setShowCreateBill(false)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: !showCreateBill && "#FFEBED",
                  width: "100%",
                  "&:hover": {
                    cursor: "pointer",
                  },
                  mt: "1rem",
                  height: "40px",
                  borderRadius: "8px",
                }}
              >
                {!showCreateBill && (
                  <Box
                    sx={{
                      height: "40px",
                      minWidth: "4px",
                      background: !showCreateBill && "#333333",
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
                    gap: "10px",
                    ml: !showCreateBill ? "15px" : "20px",
                    color: !showCreateBill ? "#333333" : "#828282",
                  }}
                >
                  <HistoryRoundedIcon />

                  <Typography
                    sx={{
                      fomtWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Withdrawal History
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={9.5}>
          <Item>
            {showCreateBill ? <WithdrawFunds /> : <WithdrawHistory />}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Withdrawal;
