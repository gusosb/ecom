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
import { Link } from "react-router-dom"

import { contactUs, customerService, information } from '../helpers'

const Footer = () => {
    return (
        <>
            <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
                <Grid item xs>
                    LOGOIPSUM
                </Grid>
                <Grid item xs='auto'>
                    <IconButton aria-label="facebook" target="_blank" component={Link} to='https://www.facebook.com'>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton aria-label="instagram" target="_blank" component={Link} to='https://www.instagram.com'>
                        <InstagramIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid container marginTop={2} paddingBottom={2} sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
                <Grid item xs>
                    <List>
                        <ListItem>
                            <ListItemText primary='KONTAKTA OSS' />
                        </ListItem>
                        {contactUs.map(e =>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                                    <ListItemText primary={e.name} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Grid>

                <Grid item xs>
                    <List>
                        <ListItem>
                            <ListItemText primary='KUNDSERVICE' />
                        </ListItem>
                        {customerService.map(e =>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                                    <ListItemText primary={e.name} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Grid>

                <Grid item xs>
                    <List>
                        <ListItem>
                            <ListItemText primary='INFORMATION' />
                        </ListItem>
                        {information.map(e =>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ paddingTop: 0, paddingBottom: 0 }} component={Link} to={e.link}>
                                    <ListItemText primary={e.name} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>

            <Grid container marginTop={2}>
                © 2023 Surdgesbutiken AB, Organisationsnummer: 555555-5555
            </Grid>
        </>
    )
}

export default Footer