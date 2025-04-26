import TextField from "@mui/material/TextField";

export default function PasswordInput({ label, name, register, required, error }) {
  return (
    <TextField
      label={label}
      type="password"
      variant="outlined"
      fullWidth
      margin="normal"
      {...register(name, { required })}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
}