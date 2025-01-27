import { useState, useEffect } from "react";
import axios from "axios";

const checkOutHandler = async (idToken) => {
  const res = await axios.post(
    "http://localhost:8000/user/checkout",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`, // Pass the Firebase ID token in Authorization header
      },
    }
  );
  console.log(res);
  if (res?.data?.status_code === 200) return res?.data;
  else return false;
};
export default checkOutHandler;
