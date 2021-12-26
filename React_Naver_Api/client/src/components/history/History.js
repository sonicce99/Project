import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const History = () => {

  const [value, setValue] = useState("")


  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      error={value.length > 10 ? true : false}
      helperText={value.length > 10 ? "Incorrect entry." : null}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default History;