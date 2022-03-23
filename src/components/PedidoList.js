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
  {field: 'producto',headerName: 'PRODUCTO', width: 180 },
  {field:'nombre', headerName: 'NOMBRE', width: 300},
  {field:'descripcion', headerName: 'DESCRIPCION', width: 350},
  {field:'fechaEntrega', headerName: 'ENTREGAR', width: 130}
]

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


export const PedidoList = () => {
  const styles= useStyles();
  const [data, setData]= useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado]=useState({
  producto: "",
  nombre:"",
  descripcion: "",
  precio:"",
  estado: "",
  fechaInicio:"",
  fechaEntrega:"",
  id:""
})
const handleChange=e=>{
  const {name, value}=e.target;
  setPedidoSeleccionado(prevState=>({
    ...prevState,
    [name]: value
  }));
}
const getAllPedido = async () => {
  try {
    const response = await axios.get("http://localhost:3002/pedido/allPedido");
    setData(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const formik = useFormik({
  initialValues: {
    producto: "",
    nombre:"",
    descripcion: "",
    precio:"",
    estado: "",
    fechaInicio:"",
    fechaEntrega:"",
    
  },
  validationSchema: Yup.object({
    producto: Yup.string("Ingrese el producto").required(
      "El producto es requerido"
    ),
    nombre: Yup.string("Ingrese el destinatario").required(
      "El destinatario es requerido"
    ),
    descripcion: Yup.string("Ingrese la descripcion").required(
      "La descripcion es requerido"
    ),
    estado: Yup.string("Elija el estado")
      .required("El estado es requerido"
      ),
    fechaInicio: Yup.date("Elija una fecha de Pedido").required(
        "El destinatario es requerido"
      ),
    fechaEntrega: Yup.date("Elija una fecha de Entrega").required(
        "El destinatario es requerido"
      ),    
  }),

  onSubmit: async (values, {resetForm}) => {
    try {
      const response = await axios.post('http://localhost:3002/pedido/regisPedido',values)  
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
  await axios.put("http://localhost:3002/pedido/updatePedido"+"/"+pedidoSeleccionado.id, pedidoSeleccionado)
  .then(response=>{
    var dataNueva= data;
    dataNueva.map(pedido=>{
      if(pedido.id===pedidoSeleccionado.id){
        pedido.producto=pedidoSeleccionado.producto;
        pedido.nombre=pedidoSeleccionado.nombre;
        pedido.descripcion=pedidoSeleccionado.descripcion;
        pedido.precio=pedidoSeleccionado.precio;
        pedido.estado=pedidoSeleccionado.estado;
        pedido.fechaInicio=pedidoSeleccionado.fechaInicio;
        pedido.fechaEntrega=pedidoSeleccionado.fechaEntrega;
      }
    });
    setData(dataNueva);
    abrirCerrarModalEditar();
  }).catch(error=>{
    console.log(error);
  })
}
const peticionDelete=async()=>{
  await axios.delete("http://localhost:3002/pedido/deletePedido"+"/"+pedidoSeleccionado.id)
  .then(response=>{
    setData(data.filter(pedido=>pedido.id!==pedidoSeleccionado.id));
    abrirCerrarModalEliminar();
  }).catch(error=>{
    console.log(error);
  })
}
const seleccionarPedido=(pedido, caso)=>{
  setPedidoSeleccionado(pedido);
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
      getAllPedido();
    }, []);
const bodyInsertar=(
      <form onSubmit={formik.handleSubmit}>
          <div className={styles.modal}>
            <h3>Agregar Nuevo Pedido</h3>
            <TextField 
              className={styles.inputMaterial} 
              id="producto"
              name="producto"
              label="Producto"
              value={formik.values.producto}
              onChange={formik.handleChange}
              error={formik.touched.producto && Boolean(formik.errors.producto)}
              helperText={formik.touched.producto && formik.errors.producto}
              
              />
            <br />
            <TextField 
              className={styles.inputMaterial} 
              id="nombre"
              name="nombre"
              label="Destinatario"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
              
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
              id="precio"
              name="precio"
              label="Precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
              error={formik.touched.precio && Boolean(formik.errors.precio)}
              helperText={formik.touched.precio && formik.errors.precio}
              
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
            <TextField 
              className={styles.inputMaterial} 
              id="fechaInicio"
              name="fechaInicio"
              label="Fecha de Inicio"
              value={formik.values.fechaInicio}
              onChange={formik.handleChange}
              error={formik.touched.fechaInicio && Boolean(formik.errors.fechaInicio)}
              helperText={formik.touched.fechaInicio && formik.errors.fechaInicio}
              
              />
            <br /> 
            <TextField 
              className={styles.inputMaterial} 
              id="fechaEntrega"
              name="fechaEntrega"
              label="Fecha de Entrega"
              value={formik.values.fechaEntrega}
              onChange={formik.handleChange}
              error={formik.touched.fechaEntrega && Boolean(formik.errors.fechaEntrega)}
              helperText={formik.touched.fechaEntrega && formik.errors.fechaEntrega}
              
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
    <h3>Editar Pedido</h3>
    <TextField 
     className={styles.inputMaterial} 
     label="Producto" 
     name="producto" 
     onChange={handleChange} 
     value={pedidoSeleccionado&&pedidoSeleccionado.producto}
     />
     
      {/* // className={styles.inputMaterial} 
      // id="producto"
      // name="producto"
      // label="Producto"
      // value={formik.values.producto}
      // onChange={formik.handleChange}
      // error={formik.touched.producto && Boolean(formik.errors.producto)}
      // helperText={formik.touched.producto && formik.errors.producto}        */}
      
            
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Destinatario" 
      name="nombre" 
      onChange={handleChange} 
      value={pedidoSeleccionado&&pedidoSeleccionado.nombre}/>          
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Descripcion" 
      name="descripcion" 
      onChange={handleChange} 
      value={pedidoSeleccionado&&pedidoSeleccionado.descripcion}/>          
    <br />
    <TextField 
    className={styles.inputMaterial} 
    label="Si" 
    name="estado" 
    onChange={handleChange} 
    value={pedidoSeleccionado&&pedidoSeleccionado.estado}/>
      <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Precio" 
      name="precio" 
      onChange={handleChange} 
      value={pedidoSeleccionado&&pedidoSeleccionado.precio}/>          
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Fecha Inicio" 
      name="fechaInicio" 
      onChange={handleChange} 
      value={pedidoSeleccionado&&pedidoSeleccionado.fechaInicio}/>          
    <br />
    <TextField 
      className={styles.inputMaterial} 
      label="Fecha de Entrega" 
      name="fechaEntrega" 
      onChange={handleChange} 
      value={pedidoSeleccionado&&pedidoSeleccionado.fechaEntrega}/>          
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
    <p>Estás seguro que deseas eliminar este pedido <b>{pedidoSeleccionado && pedidoSeleccionado.nombre}</b>? </p>
    <div align="right">
      <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
      <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

    </div>

  </div>
)
  
    // const arrayPedido = allPedido.map((e) => {
    //   return { id: e.id, producto: e.producto, nombre: e.nombre, descripcion: e.descripcion, fechaEntrega: e.fechaEntrega };
    // });
  
    return (
      <div className="App">
      <br />
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar Pedido</Button>
      <br /><br />
      <MaterialTable
            columns={columns}
            data={data}
            title="Lista de Pedidos DF"  
            actions={[
              {
                icon: EditIcon,
                tooltip: 'Editar Pedido',
                onClick: (event, rowData) => seleccionarPedido(rowData, "Editar")
              },
              {
                icon: DeleteIcon,
                tooltip: 'Eliminar Pedido',
                onClick: (event, rowData) => seleccionarPedido(rowData, "Eliminar")
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
  
