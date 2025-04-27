import { useForm } from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import PasswordInput from "../../components/Form/PasswordInput";
import SubmitButton from "../../components/Form/SubmitButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // Handle login logic here
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
