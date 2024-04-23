import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { User } from "@/model/user";
import { getUser } from "@/pages/firebase/config";

type Props = {};

const Address: React.FC<Props> = (props) => {
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
    <Box
      bgcolor="white"
      p={3}
      borderRadius={5}
      boxShadow={1}
      display="flex"
      alignItems="center"
    >
      <Box flexGrow={1}>
        <Typography variant="body1">Deliver to </Typography>
       
      </Box>
      <Typography variant="body1">{user?.address}</Typography>
      {/* <Button
        variant="contained"
        color="primary"
        style={{ borderRadius: "5px" }}
      >
        Changing
      </Button> */}
    </Box>
  );
};

export default Address;
