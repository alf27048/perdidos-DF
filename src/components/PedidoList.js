import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const columns = [
  {field: 'producto',headerName: 'PRODUCTO', width: 180 },
  {field:'nombre', headerName: 'NOMBRE', width: 300},
  {field:'descripcion', headerName: 'DESCRIPCION', width: 350},
  {field:'fechaEntrega', headerName: 'ENTREGAR', width: 130}
]


export const PedidoList = () => {
    const [allPedido, setAllPedido] = useState([]);

    const getAllPedido = async () => {
      try {
        const response = await axios.get("http://localhost:3002/pedido/allPedido");
        setAllPedido(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllPedido();
    }, []);
  
    const arrayPedido = allPedido.map((e) => {
      return { id: e.id, producto: e.producto, nombre: e.nombre, descripcion: e.descripcion, fechaEntrega: e.fechaEntrega };
    });
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={arrayPedido}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    )
  }
  
