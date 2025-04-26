import TextField from "@mui/material/TextField";

export default function TextInput({ label, name, register, required, error }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...register(name, { required })}
      error={!!error}
      helperText={error ? error.message : ""}
    />
  );
}