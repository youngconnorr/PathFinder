import "../App";
import { Box } from "@mui/material";
import { useState } from "react";
import TextField from "./tools/TextFields";
import CreateButton from "./tools/MyButtons";
import PasswordField from "./tools/MyPasswordField";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./tools/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({ defaultValues });
  const [validUser, setValidUser] = useState(true);

  const submission = (data) => {
    AxiosInstance.post(`login/`, {
      email: data.email,
      password: data.password,
    })

      .then((response) => {
        console.log(response);
        setValidUser(true);
        localStorage.setItem("Token", response.data.token);
        navigate(`/`);
      })
      .catch((error) => {
        setValidUser(false);
        console.error("wrong credentials"), error;
      });
  };

  return (
    <div className="user-signin-bg">
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
            <CreateButton label="Login" type={"submit"} />
          </Box>
          <Box className="item-box">
            <Link to="/register">No Account? Please register!</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Login;
