import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getCookie } from "cookies-next";
import { User } from "@/model/user";
import { useEffect, useState } from "react";
import { getUser } from "./firebase/config";

function AccountIcon(){
  const user_id = getCookie("user_id");
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
      });
    return (<>
      <Box>
        <Typography>Hello {user?.username} with id:{user_id}</Typography>
      </Box>
    </>)
        
}
function AddAccountIcon() {
    const user_id = getCookie("user_id");
    return <>{user_id ? <AccountIcon /> : null}</>;
}

export default AddAccountIcon;
