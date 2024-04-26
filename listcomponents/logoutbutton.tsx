import { Button, Typography } from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OutputIcon from '@mui/icons-material/Output';
import { deleteCookie, setCookie } from "cookies-next";
function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    // Xóa cookie có tên 'user_id'
    deleteCookie("user_id");
    router.reload();
    router.push("/login");
    // Chuyển hướng đến trang đăng nhập
    
  };
  return (
    <>
      <Button onClick={logout}>
        <Typography sx={{ color: "black" }}>
          <OutputIcon />
        </Typography>
      </Button>
    </>
  );
}

export default LogoutButton;
