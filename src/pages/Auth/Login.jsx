import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import SubmitButton from "../../components/Form/SubmitButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import FeedbackSnackbar from "../../components/FeedbackSnackbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    console.log("Logging in...", data);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("Login Success:", response.data);

      ///Storing the token
      localStorage.setItem("token", response.token);

      showSnackbar("Login successful!", "success");

      /// Redirect to home
      navigate("/", { replace: true });
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      showSnackbar(
        `Login failed: ${error.response?.data?.message || error.message}`,
        "error"
      );
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Email"
          name="email"
          register={register}
          required={{ value: true, message: "Email is required" }}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          name="password"
          register={register}
          required={{ value: true, message: "Password is required" }}
          error={errors.password}
        />
        <SubmitButton loading={isSubmitting}>Login</SubmitButton>
      </form>
      <FeedbackSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}
