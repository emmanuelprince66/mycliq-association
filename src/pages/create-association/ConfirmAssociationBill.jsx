import React from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import FormattedPrice from "../../components/FormattedPrice";
import { Button, Divider } from "@mui/material";
const ConfirmAssociationBill = ({ setShowScreen }) => {
  return (
    <div className=" md:w-[70%] w-full mx-auto p-3  md:p-3">
      <div className="flex items-center gap-3">
        <ArrowBackIosRoundedIcon
          sx={{ color: "#1e1e1e" }}
          onClick={() => setShowScreen("create")}
        />

        <p className="font-[500] text-[20px] text-[#1e1e1e]">
          Confirm your Details
        </p>
      </div>

      <div className="flex flex-col items-start w-full gap-3 mt-3">
        <p className="font-normal text-[16px] text-[#535353]">
          Please proceed to authorise payment only if details are correct. Tap
          “Edit Details” if otherwise.
        </p>
        <p className="font-normal text-[13px] text-[#535353]">
          Completed payments cannot be recalled.
        </p>

        <div className="w-full rounded-md p-3 border border-[#F2F2F2] bg-[#FBFBFB]">
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Institution
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">
              Federal university of technology Akure
            </p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Biller/Association
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">AESCO</p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Payment Types
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">AESCO Dues</p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Student Status
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">300L</p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Student Name
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">
              Emmanuel Ochigbo
            </p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Matric Number
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">211223344</p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Email Address
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">
              emma@gmail.com
            </p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Phone Number
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">
              081556666444
            </p>
          </div>
          <div className="w-full flex-col items-start gap-4 flex border-b pb-3 mb-2">
            <p className="font-normal text-[12px] text-[#535353 ]">
              Department
            </p>
            <p className="font-[600] text-[14px] text-[#1e1e1e]">
              Industrial Chem
            </p>
          </div>
        </div>

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
            Proceed
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
            Edit Details
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ConfirmAssociationBill;
