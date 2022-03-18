import React, { useState, useEffect } from 'react'
import "../style/App.css"
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useFormik } from "formik";
import * as Yup from "yup";



const columns = [
  {field: 'name',headerName: 'NOMBRE', width: 350 },
  {field:'lastName', headerName: 'APELLIDO', width: 350},
  {field:'email', headerName: 'EMAIL', width: 600}
];

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));


export const UsersList = () => {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
  name: "",
  lastName: "",
  email: "",
  password: "",
  id:""
})

const handleChange=e=>{
  const {name, value}=e.target;
  setUsuarioSeleccionado(prevState=>({
    ...prevState,
    [name]: value
  }));
}
const getAllUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3002/users/allUser",
      {
        headers: { authorization: localStorage.getItem("isAuthenticated") },
      }
    );
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const formik = useFormik({
  initialValues: {
    name: "",
    lastName: "",
    email: "",
    password: "",
  },
  validationSchema: Yup.object({
    name: Yup.string("Ingrese su nombre").required(
      "El nombre es requerido"
    ),
    lastName: Yup.string("Ingrese su apellido").required(
      "El apellido es requerido"
    ),
    email: Yup.string("Ingrese su email")
      .email("Ingrese un email válido")
      .required("El email es requerido"),
    password: Yup.string("Ingresa tu contraseña")
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
  }),
  
  onSubmit: async (values, {resetForm}) => {
    try {
      const response = await axios.post('http://localhost:3002/users/registro',values)  
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      console.log(response)
      resetForm()
     // history.push('/')
    } catch (error) {
        console.log(error);
      // setError(error.message)
      // setOpen(prevState => !prevState)
    }
  },
});
// const peticionPost=async()=>{
//   await axios.post("http://localhost:3002/users/registro", usuarioSeleccionado)
//   .then(response=>{
//     setData(data.concat(response.data));
//     abrirCerrarModalInsertar();
//   }).catch(error=>{
//     console.log(error);
//   })
// }

const peticionPut=async()=>{
  await axios.put("http://localhost:3002/users/updateUser"+"/"+usuarioSeleccionado.id, usuarioSeleccionado)
  .then(response=>{
    var dataNueva= data;
    dataNueva.map(usuario=>{
      if(usuario.id===usuarioSeleccionado.id){
        usuario.name=usuarioSeleccionado.name;
        usuario.lastName=usuarioSeleccionado.lastName;
        usuario.email=usuarioSeleccionado.email;
        usuario.password=usuarioSeleccionado.password;
      }
    });
    setData(dataNueva);
    abrirCerrarModalEditar();
  }).catch(error=>{
    console.log(error);
  })
}
const peticionDelete=async()=>{
  await axios.delete("http://localhost:3002/users/deleteUser"+"/"+usuarioSeleccionado.id)
  .then(response=>{
    setData(data.filter(usuario=>usuario.id!==usuarioSeleccionado.id));
    abrirCerrarModalEliminar();
  }).catch(error=>{
    console.log(error);
  })
}
const seleccionarUsuario=(usuario, caso)=>{
  setUsuarioSeleccionado(usuario);
  (caso==="Editar")?abrirCerrarModalEditar()
  :
  abrirCerrarModalEliminar()
}

const abrirCerrarModalInsertar=()=>{
  setModalInsertar(!modalInsertar); 
  formik.resetForm()

}


const abrirCerrarModalEditar=()=>{
  setModalEditar(!modalEditar);
}

const abrirCerrarModalEliminar=()=>{
  setModalEliminar(!modalEliminar);
}
useEffect(() => {
  getAllUsers();
}, []);

const bodyInsertar=(
  <form onSubmit={formik.handleSubmit}>
      <div className={styles.modal}>
        <h3>Agregar Nuevo Usuario</h3>
        <TextField 
          className={styles.inputMaterial} 
          id="name"
          name="name"
          label="Nombre"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          
          />
        <br />
        <TextField 
          className={styles.inputMaterial} 
          id="lastName"
          name="lastName"
          label="Apellido"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
         
        />          
        <br />
        <TextField 
          className={styles.inputMaterial} 
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
         
          />
        <br />
    <TextField className={styles.inputMaterial} 
        label="Password" 
        type="password" 
        name="password" 
        value={formik.values.password}
        onChange={formik.handleChange} 
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        />
        <br /><br />
        <div align="right">
          <Button color="primary" type="submit">Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
  </form>
)

const bodyEditar=(
  <div className={styles.modal}>
    <h3>Editar usuario</h3>
    <TextField 
      className={styles.inputMaterial} 
      id="name"
      name="name"
      label="Nombre"
      onChange={handleChange}
      value={usuarioSeleccionado&&usuarioSeleccionado.name}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}       
      
      />
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Apellido" 
      name="lastName" 
      onChange={handleChange} 
      value={usuarioSeleccionado&&usuarioSeleccionado.lastName}/>          
<br />
<TextField className={styles.inputMaterial} label="Email" name="email" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.email}/>
    <br />
<TextField className={styles.inputMaterial} label="Password" name="password" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.password}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
      <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEliminar=(
  <div className={styles.modal}>
    <p>Estás seguro que deseas eliminar al usuario <b>{usuarioSeleccionado && usuarioSeleccionado.name}</b>? </p>
    <div align="right">
      <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
      <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

    </div>

  </div>
)

  return (
    <div className="App">
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Usuario</Button>
      <br /><br />
      <MaterialTable
            columns={columns}
            data={data}
            title="Usuarios de Pedidos DF"  
            actions={[
              {
                icon: EditIcon,
                tooltip: 'Editar usuario',
                onClick: (event, rowData) => seleccionarUsuario(rowData, "Editar")
              },
              {
                icon: DeleteIcon,
                tooltip: 'Eliminar Usuario',
                onClick: (event, rowData) => seleccionarUsuario(rowData, "Eliminar")
              }
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
            localization={{
              header:{
                actions: "Acciones"
              }
            }}
        />


      <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      
      <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
  </div>
  )
}
