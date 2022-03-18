import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { GestionUsuarios } from '../pages/GestionUsuarios';
import { GestionProducto } from '../pages/GestionProducto';
import { GestionPedido } from '../pages/GestionPedido';

export const MenuAdministrativo = () => {
    const [value, setValue] = React.useState('1');
      
    const handleChange = (event, newValue) => {
          setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Gestion de usuarios" value="1" />
          <Tab label="Gestion de productos" value="2" />
          <Tab label="Gestion de pedidos" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
          <GestionUsuarios />
      </TabPanel>
      <TabPanel value="2">
        <GestionProducto />
      </TabPanel>
      <TabPanel value="3">
        <GestionPedido />
      </TabPanel>
    </TabContext>
  </Box>
  )
}
