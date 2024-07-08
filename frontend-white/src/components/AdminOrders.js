import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminOrders, updateTracking } from '../requests';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Modal from '@mui/material/Modal';

const AdminOrders = () => {
  const result = useQuery(['adminorders'], getAdminOrders, {
    refetchOnWindowFocus: false
  });

  const queryClient = useQueryClient();

  const updateTrackingMutation = useMutation(updateTracking, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admincategories'] });
    }
  });

  const orders = result.data || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [numberInput, setNumberInput] = useState('');
  const [orderID, setorderID] = useState(null);

  const [openRow, setOpenRow] = useState(null);

  const handleRowClick = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };

  const handleModalOpen = (orderID) => {
    setorderID(orderID); // Set the current item ID
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleNumberInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const sendTrackingNumber = async () => {
    updateTrackingMutation.mutate({ orderID, tracking: numberInput });
    setNumberInput('');
    setorderID(null);
    setModalOpen(false);
  };

  return (
    <TableContainer sx={{ maxWidth: 1250 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple-table">
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
          {orders.map((order, index) => (
            <>
              <TableRow key={order.externalId} onClick={() => handleRowClick(index)} sx={{ cursor: 'pointer' }}>
                <TableCell component="th" scope="row">
                  {order.externalId}
                </TableCell>
                <TableCell align="right">{order.payment_id}</TableCell>
                <TableCell align="right">{order.order_reference}</TableCell>
                <TableCell align="right">{order.order_amount / 100}</TableCell>
                <TableCell align="right">
                  {order.is_paid ? <CheckCircleOutlineIcon sx={{ color: 'green' }} /> : <DoNotDisturbIcon sx={{ color: 'red' }} />}
                </TableCell>
                <TableCell align="right">
                  {order.is_fulfilled ? <CheckCircleOutlineIcon sx={{ color: 'green' }} /> : <DoNotDisturbIcon sx={{ color: 'red' }} />}
                </TableCell>
              </TableRow>
              {openRow === index && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="subtitle1">{order.email}</Typography>
                    <Typography variant="subtitle1">{order.name}</Typography>
                    <Typography variant="subtitle1">{order.address}</Typography>
                    <Typography variant="subtitle1">{order.address2}</Typography>
                    <Typography variant="subtitle1">
                      {order.postalcode} {order.city}
                    </Typography>
                    <Typography variant="subtitle1">{order.country}</Typography>
                    <Typography variant="subtitle1">{order.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleModalOpen(order.id)} variant="contained">
                      Enter Number
                    </Button>{' '}
                    {/* Pass orderID to handleModalOpen */}
                  </TableCell>
                </TableRow>
              )}
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
                            <TableCell>
                              {item.name} - {item.variant}
                            </TableCell>
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
          ))}
        </TableBody>
      </Table>
      {/* Modal for entering a number */}
      <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <TextField
            id="tracking"
            label="Tracking Number"
            value={numberInput}
            onChange={handleNumberInputChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button sx={{ ml: 5 }} onClick={sendTrackingNumber} variant="contained">
            Submit
          </Button>{' '}
          {/* Call sendTrackingNumber function */}
          <Button sx={{ mt: 2 }} onClick={handleModalClose} variant="contained">
            Cancel
          </Button>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default AdminOrders;
