import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { SelectForm } from './SelectForm';
import { DatePickerForm } from './DatePickerForm';
import { DatePickerEntrega } from './DatePickerEntrega';


export const PedidoForm = (props) => {
    
   

    //************************************************* */    
     

      const formik = useFormik({
        initialValues: {
          nombre: "",
          producto: "",
          descripcion: "",
          fechaInicio:"",
          fechaEntrega:"",

        },
        validationSchema: Yup.object({
          nombre: Yup.string("Ingrese los datos de entrega").required(
            "Estos datos son requeridos"
          ),
          producto: Yup.string("Seleccione un producto ").required(
            "Este dato es requerido"
          ),
          descripcion: Yup.string("Ingrese la descripcion del pedido").required(
            "Este dato es requerido"
          ),
        }),
        onSubmit: async (values, {resetForm}) => {
          try {
            const response = await axios.post('http://localhost:3002/pedido/regisPedido',values)  
            console.log(response)
            resetForm()
           // history.push('/')
          } catch (error) {
              console.log(error);
            // setError(error.message)
            // setOpen(prevState => !prevState)
          }
        },
      })
      

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
          <Box
          //component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          >
            
              <div>
                <TextField
                  id="nombre"
                  name= "nombre"
                  label="Entregar a: "
                  multiline
                  maxRows={4}
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText= {formik.touched.nombre && formik.errors.nombre}
                />
              {/* *************Aqui va el select******************* */}
                  <SelectForm
                    value={formik.values.producto}
                    onChange={formik.handleChange}
                    error={formik.touched.producto && Boolean(formik.errors.producto)}
                    helperText= {formik.touched.producto && formik.errors.producto
                    }
                  >

                  </SelectForm>

                <TextField
                  id="descripcion"
                  name="descripcion"
                  label="Descripción"
                  multiline
                  rows={6}
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                  helperText= {formik.touched.descripcion && formik.errors.descripcion}
                />
              {/*  Selector de fecha */ }
                <DatePickerForm  
                  value={formik.values.fechaInicio}
                  onChange={formik.handleChange}
                  error={formik.touched.fechaInicio && Boolean(formik.errors.fechaInicio)}
                  helperText= {formik.touched.fechaInicio && formik.errors.fechaInicio}        
                >
                </DatePickerForm>
                <DatePickerEntrega
                  value={formik.values.fechaEntrega}
                  onChange={formik.handleChange}
                  error={formik.touched.fechaEntrega && Boolean(formik.errors.fechaEntrega)}
                  helperText= {formik.touched.fechaEntrega && formik.errors.fechaEntrega}
                >

                </DatePickerEntrega>
                                    
                  <Button variant="contained" type="submit">
                      Guardar
                  </Button>
                
            
              </div>       
          
          
        </Box>
    </form>
  </>
);
  
}
