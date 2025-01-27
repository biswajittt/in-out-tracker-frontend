import { useState, useEffect } from "react";
import axios from "axios";

const checkInHandler = async (idToken) => {
  const res = await axios.post(
    "http://localhost:8000/user/checkin",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`, // Pass the Firebase ID token in Authorization header
      },
    }
  );
  if (res?.data) return res.data;
  else return false;
};
export default checkInHandler;
