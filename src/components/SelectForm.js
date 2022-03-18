import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'

export const SelectForm = () => {

    // Listado de Productos
    const [allProduc, setAllProduc] = useState([]);
    const [allProducto, setAllProducto] = useState('');

    const getAllProduc = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3002/produc/allProduc",
            {
              headers: { authorization: localStorage.getItem("isAuthenticated") },
            }
          );
          setAllProduc(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAllProduc();
      }, []);

      const handleChange = (event) => {
        setAllProducto(event.target.value);
      };

  return (
    <div>
         <TextField
            id="producto"
            name="producto"
            select
            label="Producto"
            value={allProducto}
            onChange={handleChange}
            multiline
            // error={formik.touched.producto && Boolean(formik.errors.producto)}
            // helperText= {formik.touched.producto && formik.errors.producto}

          >
          {allProduc.map((produc) => (
            <MenuItem key={produc.id} value={produc.name}>
              {produc.name}
            </MenuItem>
          ))}
          </TextField>
    </div>
  )
}
