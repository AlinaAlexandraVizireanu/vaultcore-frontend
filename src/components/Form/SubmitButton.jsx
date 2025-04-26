import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function SubmitButton({
  children,
  loading = false,
  disabled = false,
}) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={disabled || loading}
      sx={{ mt: 2 }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
