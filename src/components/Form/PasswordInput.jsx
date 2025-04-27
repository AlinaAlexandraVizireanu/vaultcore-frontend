import TextField from "@mui/material/TextField";

export default function PasswordInput({ label, name, register, required, validate,  error }) {
  return (
    <TextField
      label={label}
      type="password"
      variant="outlined"
      fullWidth
      margin="normal"
      {...register(name, { required, validate })}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
}