// src/Routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Overview } from "./pages/Overview";
import { Mainlayout } from "./layout/mainlayout";
import Students from "./pages/Students";
import Transaction from "./pages/Transaction";
import { queryClient } from "./helpers/queryClient";
import Withdrawal from "./pages/Withdrawal";
import ManageBills from "./pages/ManageBills";
import SuperAdmin from "./pages/SuperAdmin";
import Support from "./pages/Support";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import { AuthProvider } from "./utils/AuthContext";
import CreateAssociationBill from "./pages/CreateAssociationBill";
import Attendants from "./pages/Attendants";

const myRoutes = [
  { component: <Login />, path: "/", name: "Login Page" },
  // { component: <Overview />, path: "/overview", name: "Overview Page" },
  { component: <Students />, path: "/students", name: "Students" },
  { component: <ManageBills />, path: "/manage-bills", name: "Manage Bills" },
  { component: <Transaction />, path: "/transaction", name: "transaction" },
  { component: <Withdrawal />, path: "/withdrawal", name: "withdrawal" },
  { component: <SuperAdmin />, path: "/super-admin", name: "SuperAdmin" },
  { component: <Support />, path: "/support", name: "Support" },
  { component: <ResetPassword />, path: "/reset", name: "Reset" },
  {
    component: <CreateAssociationBill />,
    path: "/create-association/:id?/",
    case: "association",
    name: "Cassociation",
  },
  { component: <Attendants />, path: "/attendants", name: "Attendants" },
];

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
const RoutesContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {myRoutes.map((item) => {
              if (item.path !== "/") {
                if (item?.case === "association") {
                  return (
                    <Route
                      key={item.name}
                      path={item.path}
                      index
                      element={item.component}
                    />
                  );
                }
                const ComponentWithAuth = (
                  <AuthProvider>
                    <Mainlayout component={item.component} />
                  </AuthProvider>
                );
                return (
                  <Route
                    key={item.name}
                    path={item.path}
                    element={ComponentWithAuth}
                  />
                );
              }

              return (
                <Route
                  key={item.name}
                  path={item.path}
                  element={item.component}
                />
              );
            })}
            <Route index path="/f-password" element={<ForgetPassword />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RoutesContainer;
