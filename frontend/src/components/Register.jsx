import "../App";
import { Box } from "@mui/material";
import TextField from "./tools/TextFields";
import CreateButton from "./tools/MyButtons";
import PasswordField from "./tools/MyPasswordField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./tools/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email("Field expects an email address")
      .required("Email is required"), //text inside email is shown if email is invalid
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number") //REGEX LMFAOO
      .matches(
        /[!@#$%^&*(),.?":;{}|<>+]/,
        "Password must contain at least one special character"
      ),
    password2: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) }); //handleSubmit is checked by axios and control is from text and password fields

  const submission = (data) => {
    AxiosInstance.post(`register/`, {
      email: data.email,
      password: data.password,
    })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        navigate(`/login`);
      });
  };

  return (
    <div className="user-signin-bg">
      <form onSubmit={handleSubmit(submission)}>
        <Box className="user-cards register-card">
          <Box className="item-box">
            <p className="user-title-register user-title">Register</p>
          </Box>

          <Box className="item-box">
            <TextField label="Email" name={"email"} control={control} />
          </Box>

          <Box className="item-box">
            <PasswordField
              label="Password"
              name={"password"}
              control={control}
            />
          </Box>

          <Box className="item-box">
            <PasswordField
              label="Confirm Password"
              name={"password2"}
              control={control}
            />
          </Box>

          <Box className="item-box">
            <CreateButton label="Register" type={"submit"} />
          </Box>
          <Box className="item-box account-question-link">
            <Link to="/login">Already have account? Login!</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Register;
