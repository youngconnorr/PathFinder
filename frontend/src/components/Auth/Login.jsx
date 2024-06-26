import "../../App";
import { Box } from "@mui/material";
import { useState } from "react";
import TextField from "../Tools/TextFields";
import PasswordField from "../Tools/MyPasswordField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../Tools/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({ defaultValues });
  const [validUser, setValidUser] = useState(true);

  const submission = async (data) => {
    try {
      const response = await AxiosInstance.post(`login/`, {
        email: data.email,
        password: data.password,
      });
      setValidUser(true);
      localStorage.setItem("Token", response.data.token);
      navigate(`/`);
    } catch (error) {
      setValidUser(false);
      console.error("Wrong credentials", error);
    }
  };

  return (
    <div className="signin-bg">
      <form onSubmit={handleSubmit(submission)}>
        <Box className="user-cards">
          <Box className="item-box">
            <p className="user-title">Login</p>
            {validUser ? null : <p>Invalid credentials</p>}
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
            <button type="submit" className="login-btn">
              LOGIN
            </button>
            {/* <CreateButton label="Login" type={"submit"} /> */}
          </Box>
          <Box className="item-box">
            <Link to="/register">No Account? Register here!</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login;
