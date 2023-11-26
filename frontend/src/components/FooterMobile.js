import { contactUs, customerService, information } from '../helpers'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import placeholderLogo from '../images/logoipsum-288.svg'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp'
import CloseIcon from '@mui/icons-material/Close'
import Badge from '@mui/material/Badge'
import CardMedia from '@mui/material/CardMedia'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Collapse from '@mui/material/Collapse';
import { Link } from "react-router-dom"
import { useState } from 'react'



const FooterMobile = () => {

  const [open, setOpen] = useState([false, false, false, false, false])

  const handleClick = (i) => {
    const values = [...open]
    values[i] = !values[i]
    setOpen(values)
  }

  return (
    <>
      <List>


        <ListItemButton onClick={() => handleClick(0)}>
          {/* <InboxIcon /> */}
          <ListItemText primary="KONTAKA OSS" />
          {open[0] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open[0]} timeout="auto" unmountOnExit>
          {contactUs.map(e =>
            <ListItem disablePadding>
              <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                <ListItemText primary={e.name} />
              </ListItemButton>
            </ListItem>
          )}
        </Collapse>


        <ListItemButton onClick={() => handleClick(1)}>
          {/* <InboxIcon /> */}
          <ListItemText primary="KUNDSERVICE" />
          {open[1] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open[1]} timeout="auto" unmountOnExit>
          {customerService.map(e =>
            <ListItem disablePadding>
              <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                <ListItemText primary={e.name} />
              </ListItemButton>
            </ListItem>
          )}
        </Collapse>


        <ListItemButton onClick={() => handleClick(2)}>
          {/* <InboxIcon /> */}
          <ListItemText primary="INFORMATION" />
          {open[2] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open[2]} timeout="auto" unmountOnExit>
          {information.map(e =>
            <ListItem disablePadding>
              <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                <ListItemText primary={e.name} />
              </ListItemButton>
            </ListItem>
          )}
        </Collapse>







      </List>
    </>
  )
}

export default FooterMobile