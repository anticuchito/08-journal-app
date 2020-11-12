import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startRegisterWhithEmailPasswordName } from "../../actions/auth";
import { setError, removeError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

/*
  {
    name'Hernando',
    email: 'nando@gmail.com,
    password:'123456'
    password:'123456'
  }

  use Form


  const HandleRegister = (e){
    console.log(name,email,password,password2)
  }
*/

export const RegisterScreen = () => {
  const dispatch = useDispatch();

  const { msgError } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm({
    name: "Hernando",
    email: "nando@gmail.com",
    password: "123456",
    password2: "123456",
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWhithEmailPasswordName(email,password,name))
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is not valid"));
      return false;
    } else if (password !== password2 || password < 5) {
      dispatch(
        setError("password should at least 6 caracters and match each other")
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <div>
      <h3 className="auth__title">Register</h3>

      {   msgError &&
        (
          <div className="auth__alert-error">
            {msgError}
          </div>
        
        )
      }

      <form 
        onSubmit={handleRegister}
        className='animate__animated animate__fadeIn animate__faster'
        >
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link mt-1">
          Already registered?
        </Link>
      </form>
    </div>
  );
};
