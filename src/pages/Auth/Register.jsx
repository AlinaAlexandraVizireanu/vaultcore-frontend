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

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Registering...", data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      ///Storing the token
      localStorage.setItem("token", response.token);

      console.log("Registration Success:", response.data);
      showSnackbar("Registration successful!", "success");

      /// Redirect to home
      navigate("/", { replace: true });
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      showSnackbar(
        `Registration failed: ${
          error.response?.data?.message || error.message
        }`,
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
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label="Name"
          name="name"
          register={register}
          required={{ value: true, message: "Name is required" }}
          error={errors.name}
        />
        <TextInput
          type="email"
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
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          register={register}
          required={{ value: true, message: "Please confirm your password" }}
          error={errors.confirmPassword}
          validate={(value) => value === password || "Passwords do not match"}
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

export default Register;
