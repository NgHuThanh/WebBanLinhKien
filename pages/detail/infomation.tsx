import { Box, Button, Card, CardContent, Link, Stack, Typography } from "@mui/material";

function InfomationDetail() {
  return (
    <>
      <Stack>
        <Typography>
          This is just a few infomation about product that seem not finishThis
          is just a few infomation about
        </Typography>
        <Box display="inline-flex">
          <Box>0.0 *</Box>
          <Typography>?? rating</Typography>
        </Box>
        <Box display="inline-flex">
          <Typography>999999$</Typography>
          <Button>Add to cart now</Button>
        </Box>
      </Stack>
    </>
  );
}

export default InfomationDetail;
