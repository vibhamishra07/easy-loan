import { TextField } from "@mui/material";
import React from "react";

const InputBox = (props) => {
  const { key, ...fields } = props;
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        variant="standard"
        {...fields}
        
        sx={{
          "& label.Mui-focused": {
            color: "#183B56",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#183B56",
          },
          input: { color: "black" },
          label: { color: "#183B56" },
        }}
      />
    </>
  );
};

export default InputBox;