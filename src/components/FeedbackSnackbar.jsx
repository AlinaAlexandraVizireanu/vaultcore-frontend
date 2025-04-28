import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function FeedbackSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="outlined"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
