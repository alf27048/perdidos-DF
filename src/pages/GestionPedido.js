import React from 'react'
import { PedidoList } from '../components/PedidoList';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AddIcon from '@mui/icons-material/Add';

export const GestionPedido = () => {
  return (
    <Stack spacing={2}> 
        <PedidoList />
        <Stack direction="row" spacing={2}>            
            <Button variant="contained" endIcon={<DeleteIcon />}>
                Borrar
            </Button>
            <Button variant="contained" endIcon={<AutoFixNormalIcon />}>
                Modificar
            </Button>
            <Button variant="contained" endIcon={<AddIcon />}>
                Agregar
            </Button>
            
        </Stack>
    </Stack>
  )
}
