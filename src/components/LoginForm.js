import React, {  useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import { LoginContext } from "../Helpers/Context";
//import RegisterForm from "./RegisterForm";

const LoginForm = () => {
 // const history = useHistory();

  const { isLogged, setIsLogged }= useContext(LoginContext)
  // console.log('imprimiendo desde LoginForm', isLogged);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
        email: Yup.string('Ingrese su email').email('Ingrese un email válido').required('El email es requerido'),
        password: Yup.string('Ingresa tu contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida')
    }),
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await axios.post('http://localhost:3002/users/loggin',values) 
        const respuesta =response.data.status
       console.log(respuesta)     
       //setIsLogged(prevState => !prevState)
       
        if (respuesta === 'OK'){
          setIsLogged(prevState => !prevState)
        } else {
          resetForm()
        }       

        localStorage.setItem('isAuthenticated', response.data.token)
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          sx={{
            width: "25ch",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            hiddenLabel
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            size='small'
          />
          <TextField
            hiddenLabel
            id="password"
            name="password"
            label="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            size='small'
            type='password'
          />
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;