import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

function Login() {

    const navigate = useNavigate()

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/");
        }
    }, []);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const validate = (value, rule, message, errors) => {
        if (!rule(value)) {
            toast.error(message, toastOptions);
            errors.push(message);
        }
    }

    const handleValidation = () => {
        const {password, email} = values;
        let errors = [];

        validate(password, val => val.length > 0, "Password is required!", errors);
        validate(email, val => val.length > 0, "Email is required!", errors);

        return errors.length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const {email, password} = values;

            try {
                const {data} = await axios.post(loginRoute, {
                    email,
                    password,
                });

                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else {
                    localStorage.setItem(
                        process.env.REACT_APP_LOCALHOST_KEY,
                        JSON.stringify(data.user)
                    );
                    navigate("/")
                }

            } catch (error) {
                console.error("An error occurred while trying to send POST request: ", error);
            }
        } else {
            console.error("Validation failed");
        }

    };

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    };

    return (
        <>
            <FormContainer>
                <form autoComplete="on"
                      onSubmit={event => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo"/>
                        <h1>snappy</h1>
                    </div>
                    <input type="email"
                           placeholder="E-Mail"
                           name="email"
                           autoComplete="on"
                           max="50"
                           onChange={event => handleChange(event)}/>
                    <input type="password"
                           placeholder="Password"
                           name="password"
                           min="8"
                           onChange={event => handleChange(event)}/>
                    <button type="submit">Login User</button>
                    <span>
                        Don't have an account?
                        <Link to="/register">Register</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-out;

      &:hover {
        background-color: #4e0eff;
      }
    }

    span {
      color: white;
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 1rem;

      a {
        color: #4e0eff;
        text-transform: none;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
