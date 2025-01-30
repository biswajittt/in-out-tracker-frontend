import React from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import Calendar from "./Calender/Calender";
import { DialogTitle, Box } from "@mui/material";
import './Calender/Calender.css'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="text-blue-500 cursor-pointer font-bold hover:underline"
        onClick={handleClickOpen}
      >
        Details
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", bgcolor: "#1F2937" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            {/* Close Button */}
            <div className="cursor-pointer" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>

            {/* <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <DialogTitle sx={{ textAlign: "center", flexGrow: 1, color: "white" }}>
                Details
              </DialogTitle>
            </Box> */}
          
          </Toolbar>
        </AppBar>
        <List className="popup-list">
          <Calendar />
        </List>
      </Dialog>
    </>
  );
}
