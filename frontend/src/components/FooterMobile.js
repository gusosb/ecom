import { contactUs, customerService, information } from '../helpers'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
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