import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function BasicTextFields(prop) {
  const { label, name, control } = prop;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="outlined-basic"
          onChange={onChange} //on form change is handled by controller
          value={value}
          label={label}
          variant="outlined"
          className="login-forms"
          error={!!error}
          helperText={error?.message} //show error message
        />
      )}
    />
  );
}
