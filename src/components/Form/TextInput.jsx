import TextField from "@mui/material/TextField";

export default function TextInput({
  type,
  label,
  name,
  register,
  required,
  error,
}) {
  return (
    <TextField
      type={type}
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
