import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";
import { getUser } from "@/pages/firebase/config";
import { User } from "@/model/user";
import LogoutButton from "./logoutbutton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function AccountIcon(){
    const [user, setUser] = useState<User | null>(null);
    async function fetchData() {
        try{
            const userData = await getUser();
            setUser(userData as User);
        }
        catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    useEffect(() => {
        fetchData();
      },[]);
    return (
        <>
        <Box>
        <Typography><AccountCircleIcon/> {user?.username}</Typography>
        </Box>
        </>
        );
}

function AddAccountIcon() {
    const user_id = getCookie("user_id");
    if(user_id ===null ){
      return (<>
      <Typography>Login now</Typography>
      </>);
    }
    return(<>
      <AccountIcon/><LogoutButton/>
    </> 
    );
  }
export default AddAccountIcon;
