import { useQuery } from '@tanstack/react-query'
import { getAdminOrders } from '../requests'
import { Link } from "react-router-dom"
import { useState } from 'react';

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Grid from '@mui/material/Grid'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';


const AdminOrders = () => {

  const result = useQuery(['adminorders'], getAdminOrders, {
    refetchOnWindowFocus: false
  })

  const orders = result.data || [];
  console.log(orders);

  const [openRow, setOpenRow] = useState(null);

  const handleRowClick = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };


  return (
    <TableContainer sx={{ maxWidth: 1250 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client Secret</TableCell>
            <TableCell align="right">Payment ID</TableCell>
            <TableCell align="right">Order Reference</TableCell>
            <TableCell align="right">Total Order Amount</TableCell>
            <TableCell align="right">Paid</TableCell>
            <TableCell align="right">Fulfilled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) =>
            <>
              <TableRow
                key={order.externalId}
                onClick={() => handleRowClick(index)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {order.externalId}
                </TableCell>
                <TableCell align="right">{order.payment_id}</TableCell>
                <TableCell align="right">{order.order_reference}</TableCell>
                <TableCell align="right">{order.order_amount / 100}</TableCell>
                <TableCell align="right">{order.is_fulfilled ? <CheckCircleOutlineIcon sx={{ color: 'green' }} /> : <DoNotDisturbIcon sx={{ color: 'red' }} />}</TableCell>
                <TableCell align="right">{order.isPaid ? <CheckCircleOutlineIcon sx={{ color: 'green' }} /> : <DoNotDisturbIcon sx={{ color: 'red' }} />}</TableCell>
              </TableRow>
              {
                openRow === index && (
                  <TableRow>
                    <TableCell colSpan={1}>
                      <Box p={2} border={1} borderRadius={4} borderColor="grey.300">
                        <Typography variant="subtitle1">{order.email}</Typography>
                        <Typography variant="subtitle1">{order.name}</Typography>
                        <Typography variant="subtitle1">{order.address}</Typography>
                        <Typography variant="subtitle1">{order.address2}</Typography>
                        <Typography variant="subtitle1">{order.postalcode} {order.city}</Typography>
                        <Typography variant="subtitle1">{order.country}</Typography>
                        <Typography variant="subtitle1">{order.phone}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              }
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Name</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Unit Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.orderitems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name} - {item.variant}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.unit_price / 100}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminOrders