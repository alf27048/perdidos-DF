import React from 'react'
import { ProducList }  from '../components/ProducList'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AddIcon from '@mui/icons-material/Add';

export const GestionProducto = () => {
  return (
    <Stack spacing={2}> 
        <ProducList />
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
