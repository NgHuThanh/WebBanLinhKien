import { Button, Typography } from "@mui/material";

import { useRouter } from "next/router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function BackButton() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.back()}>
        <Typography sx={{ color: "black" }}>
          <ArrowBackIosNewIcon />
        </Typography>
      </Button>
    </>
  );
}

export default BackButton;
