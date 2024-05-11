import { Box, Button, Stack, Typography } from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";
import { getUser } from "@/firebase/config";
import { User } from "@/model/user";
import LogoutButton from "./logoutbutton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Route } from "react-router-dom";
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
        <Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor:"#94d3f4", padding:"10px", borderRadius:"30px"}}>
          <Box
            component="img"
            sx={{
              height: '50px',
              width: '50px',
              objectFit: 'cover',
              borderRadius: '50%',
              marginRight: '10px', // To create space between the image and the text
            }}
            src={"/defaultAvatar.avif"}
            alt={"none"}
          />
                      <Typography fontWeight="bold" sx={{ marginRight: '10px' }}>Username: {user?.username}</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
            <Box>
              <LogoutButton />
            </Box>
          </Box>
        </Box>


          
        
        </Stack>
        </>
        );
}

function AddAccountIcon() {
    const user_id = getCookie("user_id");
    console.log("Tai nguyen la: "+user_id as string)
    const router = useRouter();
    if(user_id == null ){
      return (<>
      <Button onClick={()=>router.push("/login")}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          Login now <AccountCircleIcon sx={{ marginLeft: '4px' }} />
        </Typography>
      </Button>
      
      </>);
    }
    return(<>
      <AccountIcon/>
      {/* <LogoutButton/> */}
    </> 
    );
  }
export default AddAccountIcon;
