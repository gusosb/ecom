import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import placeholderLogo from '../images/logoipsum-288.svg'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Link } from "react-router-dom"

import { contactUs, customerService, information } from '../helpers'

const Footer = () => {
    return (
        <>
            <Grid container sx={{ borderBottom: 1, borderColor: 'grey.300', marginTop: 5 }}>
                <Grid item xs>
                    <Box height='100%' display='flex' alignItems='center' >

                        <img style={{ maxHeight: 30 }} src={placeholderLogo} />
                    </Box>
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