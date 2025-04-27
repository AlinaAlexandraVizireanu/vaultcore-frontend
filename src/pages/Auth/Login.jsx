import { useForm } from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import SubmitButton from "../../components/Form/SubmitButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
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
    </Container>
  );
}
