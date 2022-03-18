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
  {field: 'name',headerName: 'PRODUCTO', width: 400 },
  {field:'descripcion', headerName: 'DESCRIPCION', width: 600}
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


export const ProducList = () => {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [productoSeleccionado, setProductoSeleccionado]=useState({
  name: "",
  descripcion: "",
  estado: "",
  id:""
})

const handleChange=e=>{
  const {name, value}=e.target;
  setProductoSeleccionado(prevState=>({
    ...prevState,
    [name]: value
  }));
}
const getAllProduct = async () => {
  try {
    const response = await axios.get("http://localhost:3002/produc/allProduc");
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const formik = useFormik({
  initialValues: {
    name: "",
    descripcion: "",
    estado: "",
    
  },
  validationSchema: Yup.object({
    name: Yup.string("Ingrese el producto").required(
      "El producto es requerido"
    ),
    descripcion: Yup.string("Ingrese la descripcion").required(
      "La descripcion es requerido"
    ),
    estado: Yup.string("Elija el estado")
      .required("El estado es requerido"),
    
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

const peticionPut=async()=>{
  await axios.put("http://localhost:3002/produc/updateProduc"+"/"+productoSeleccionado.id, productoSeleccionado)
  .then(response=>{
    var dataNueva= data;
    dataNueva.map(produc=>{
      if(produc.id===productoSeleccionado.id){
        produc.name=productoSeleccionado.name;
        produc.descripcion=productoSeleccionado.descripcion;
        produc.estado=productoSeleccionado.estado;
      }
    });
    setData(dataNueva);
    abrirCerrarModalEditar();
  }).catch(error=>{
    console.log(error);
  })
}
const peticionDelete=async()=>{
  await axios.delete("http://localhost:3002/produc/deleteProduc"+"/"+productoSeleccionado.id)
  .then(response=>{
    setData(data.filter(produc=>produc.id!==productoSeleccionado.id));
    abrirCerrarModalEliminar();
  }).catch(error=>{
    console.log(error);
  })
}
const seleccionarProducto=(produc, caso)=>{
  setProductoSeleccionado(produc);
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
  getAllProduct();
}, []);

const bodyInsertar=(
  <form onSubmit={formik.handleSubmit}>
      <div className={styles.modal}>
        <h3>Agregar Nuevo Producto</h3>
        <TextField 
          className={styles.inputMaterial} 
          id="name"
          name="name"
          label="Producto"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          
          />
        <br />
        <TextField 
          className={styles.inputMaterial} 
          id="descripcion"
          name="descripcion"
          label="Descripcion"
          value={formik.values.descripcion}
          onChange={formik.handleChange}
          error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
          helperText={formik.touched.descripcion && formik.errors.descripcion}
         
        />          
        <br />
        <TextField 
          className={styles.inputMaterial}
          select 
          id="estado"
          name="estado"
          label="si"
          value={formik.values.estado}
          onChange={formik.handleChange}
          error={formik.touched.estado && Boolean(formik.errors.estado)}
          helperText={formik.touched.estado && formik.errors.estado}
         
          />
        <br />    
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
    <h3>Editar Producto</h3>
    <TextField 
      className={styles.inputMaterial} 
      id="name"
      name="name"
      label="Nombre"
      onChange={handleChange}
      value={productoSeleccionado&&productoSeleccionado.name}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}       
      
      />
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Descripcion" 
      name="descripcion" 
      onChange={handleChange} 
      value={productoSeleccionado&&productoSeleccionado.descripcion}/>          
    <br />
    <TextField 
    className={styles.inputMaterial} 
    label="Si" 
    name="estado" 
    onChange={handleChange} 
    value={productoSeleccionado&&productoSeleccionado.estado}/>
      <br />
     <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
          <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
)
const bodyEliminar=(
  <div className={styles.modal}>
    <p>Estás seguro que deseas eliminar este producto <b>{productoSeleccionado && productoSeleccionado.name}</b>? </p>
    <div align="right">
      <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
      <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

    </div>

  </div>
)
  
  // const arrayProds = allProduc.map((e) => {
  //   return { id: e.id, name: e.name, descripcion: e.descripcion };
  // });

  return (
    <div className="App">
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Producto</Button>
      <br /><br />
      <MaterialTable
            columns={columns}
            data={data}
            title="Productos de Pedidos DF"  
            actions={[
              {
                icon: EditIcon,
                tooltip: 'Editar Producto',
                onClick: (event, rowData) => seleccionarProducto(rowData, "Editar")
              },
              {
                icon: DeleteIcon,
                tooltip: 'Eliminar Producto',
                onClick: (event, rowData) => seleccionarProducto(rowData, "Eliminar")
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
