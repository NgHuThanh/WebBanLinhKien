import React from "react";
import router from "next/router";
import { NextPageWithLayout } from "../_app";
import { Button, Stack } from "@mui/material";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const Manage: NextPageWithLayout = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyATnmpP4jkLiXKx1PvknQvW992tBDGD6IU",
    authDomain: "caijdodb.firebaseapp.com",
    projectId: "caijdodb",
    storageBucket: "caijdodb.appspot.com",
    messagingSenderId: "556827412764",
    appId: "1:556827412764:web:c0b1c4de752f91f9a592d9",
    measurementId: "G-3YRPCJR6LV",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <>
      
    </>
  );
};

export default Manage;
