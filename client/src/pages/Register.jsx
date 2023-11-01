import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";

function Register() {

    const navigate = useNavigate()

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, []);


    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validate = (value, rule, message, errors) => {
        if (!rule(value)) {
            toast.error(message, toastOptions);
            errors.push(message);
        }
    }

    const handleValidation = () => {
        const {password, confirmPassword, username, email} = values;
        let errors = [];

        validate(password, val => val === confirmPassword, "Password and confirm password must match!", errors);
        validate(username, val => val.length >= 1, "Username must have at least 3 characters!", errors);
        validate(password, val => val.length >= 0, "Password must have at least 8 characters!", errors);
        validate(email, val => val.length !== 1, "Email must not be empty!", errors);

        return errors.length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const {email, username, password} = values;

            try {
                const {data} = await axios.post(registerRoute, {
                    username,
                    email,
                    password,
                });

                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else {
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                }
                navigate("/")

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
                    <input type="text"
                           placeholder="Username"
                           name="username"
                           autoComplete="on"
                           onChange={event => handleChange(event)}/>
                    <input type="email"
                           placeholder="E-Mail"
                           name="email"
                           autoComplete="on"
                           onChange={event => handleChange(event)}/>
                    <input type="password"
                           placeholder="Password"
                           name="password"
                           onChange={event => handleChange(event)}/>
                    <input type="password"
                           placeholder="Confirm Password"
                           name="confirmPassword"
                           onChange={event => handleChange(event)}/>
                    <button type="submit">Create User</button>
                    <span>
                        Already have an Account?
                        <Link to="/login">Login</Link>
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

export default Register;
