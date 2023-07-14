import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createCategory, createItem, changeItemStatus, updateItem, getAdminOrders } from '../requests'
import {
  BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, Outlet, useOutletContext, useNavigate
} from "react-router-dom"

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

const AdminOrders = () => {

  const result = useQuery(['admincategories'], getAdminOrders, {
    refetchOnWindowFocus: false
  })

  const orders = result.data

  return (
    <>
      <Grid container>
        <Grid item xs>
          hej
        </Grid>
      </Grid>
    </>
  )
}

export default AdminOrders