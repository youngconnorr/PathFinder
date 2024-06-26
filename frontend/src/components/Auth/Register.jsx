import "../../App";
import { Box } from "@mui/material";
import TextField from "../Tools/TextFields";
import PasswordField from "../Tools/MyPasswordField";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../Tools/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };

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

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  }); //handleSubmit is checked by axios and control is from text and password fields

  const submission = async (data) => {
    try {
      await AxiosInstance.post(`register/`, {
        email: data.email,
        password: data.password,
      });
      swal("Account created!", "", "success");
      navigate(`/login`);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="signin-bg">
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
            <button type="submit" className="register-btn">
              REGISTER
            </button>
            {/* <CreateButton label="Register" type={"submit"} /> */}
          </Box>
          <Box className="item-box account-question-link">
            <Link to="/login">Already have account? Login here!</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Register;
