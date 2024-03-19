import React from 'react';
import { Box, Button, Typography } from '@mui/material';

type Props = {};

const Address: React.FC<Props> = (props) => {
  return (
    <Box bgcolor="white" p={3} borderRadius={5} boxShadow={1} display="flex" alignItems="center">
      <Box flexGrow={1}>
        <Typography variant="body1">Deliver to </Typography>
        <Typography variant="body1">Address</Typography>
      </Box>
      <Button variant="contained" color="primary" style={{ borderRadius: '5px' }}>Change</Button>
    </Box>
  );
};

export default Address;
